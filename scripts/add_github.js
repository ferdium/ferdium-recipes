/**
 * Add GitHub repository as recipe
 */
require('./api/require-depts')();

const fetch = require('node-fetch');
const targz = require('targz');
const fs = require('fs-extra');
const path = require('path');
const GitUrlParse = require("git-url-parse");
const packageRecipe = require('./api/package');

// Helper: Download file to filesystem
const downloadFile = (async (url, path) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", (err) => {
          reject(err);
      });
      fileStream.on("finish", function () {
          resolve();
      });
  });
});

// Helper: Decompress .tar.gz file
const decompress = (src, dest) => {
  return new Promise(resolve => {
      targz.decompress({
          src,
          dest
      }, function (err) {
          if (err) {
              console.log('⚠️ Could not add your recipe: There was an error while decompressing your GitHub repository file: ', err);
          }
          resolve();
      });
  })
}

const repo = process.argv[2];

if (!repo || !/https:\/\/github\.com\/[^\/]+\/[^\/]+\/?/gi.test(repo)) {
  console.log(`⚠️ Could not add your recipe: The GitHub URL you provided doesn't seem to be valid.
You should use this command like "yarn github https://github.com/user/repo".
Please make sure you provide a URL in the format "https://github.com/user/repo"
For more information about this script visit https://github.com/getferdi/recipes/blob/master/docs/integration.md#publishing
If you want to package a local recipe, please use "yarn package" instead.`);
  return;
}

const repoInfo = GitUrlParse(repo);
const tempDir = path.join(__dirname, 'tmp');

const recipeSrc = path.join(__dirname, 'recipe_src');
const recipeSrcTmp = path.join(__dirname, 'recipe_src_tmp');

const compressed = path.join(__dirname, 'tmp.tar.gz');

// Let us work in an async environment
(async () => {
  console.log("[Info] Creating temporary directory");

  await fs.ensureDir(tempDir);
  await fs.ensureDir(recipeSrc);
  await fs.ensureDir(recipeSrcTmp);

  console.log("[Info] Downloading " + repo);
  
  await downloadFile(
    `https://github.com/${repoInfo.owner}/${repoInfo.name}/archive/master.tar.gz`,
    compressed
  );

  console.log("[Info] Decompressing repository");

  await decompress(compressed, tempDir);

  console.log("[Info] Moving 'recipe_src' to 'recipe_src_tmp'");

  await fs.move(recipeSrc, recipeSrcTmp, {overwrite: true});
  await fs.move(
    path.join(tempDir, `${repoInfo.name}-master`),
    recipeSrc,
    {overwrite: true}
  );

  console.log("[Info] Packaging your recipe");
  try {
    await packageRecipe();
  } catch(e) {
    return;
  }

  console.log("[Info] Deleting temporarydownloaded repository");

  await fs.remove(compressed);
  await fs.remove(recipeSrc);

  console.log("[Info] Moving back 'recipe_src_tmp' to 'recipe_src'");

  await fs.move(recipeSrcTmp, recipeSrc);

  console.log(`✅ Successfully packaged the recipe from your GitHub repository`);
})();
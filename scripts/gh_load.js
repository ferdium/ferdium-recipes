/**
 * Add GitHub repository as recipe
 */
const fetch = require('node-fetch');
const targz = require('targz');
const fs = require('fs-extra');
const path = require('path');
const GitUrlParse = require("git-url-parse");

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
              console.log('Error while decompressing recipe:', err);
          }
          resolve();
      });
  })
}

const repo = process.argv[2];

if (!repo || !/https:\/\/github\.com\/[^\/]+\/[^\/]+\/?/gi.test(repo)) {
  console.log("Please provide a valid repository URL");
  return;
}

const repoInfo = GitUrlParse(repo);
const tempDir = path.join(__dirname, 'tmp');

const recipeSrc = path.join(__dirname, 'recipe_src');
const recipeSrcTmp = path.join(__dirname, 'recipe_src_tmp');

const compressed = path.join(__dirname, 'tmp.tar.gz');

// Let us work in an async environment
(async () => {
  console.log("Creating temporary directory");

  await fs.ensureDir(tempDir);
  await fs.ensureDir(recipeSrc);
  await fs.ensureDir(recipeSrcTmp);

  console.log("Downloading " + repo);
  
  await downloadFile(
    `https://github.com/${repoInfo.owner}/${repoInfo.name}/archive/master.tar.gz`,
    compressed
  );

  console.log("Decompressing tarball");

  await decompress(compressed, tempDir);

  console.log("Moving directories");

  await fs.move(recipeSrc, recipeSrcTmp, {overwrite: true});
  await fs.move(
    path.join(tempDir, `${repoInfo.name}-master`),
    recipeSrc,
    {overwrite: true}
  );

  await fs.remove(compressed);
  await fs.remove(recipeSrcTmp);
})();
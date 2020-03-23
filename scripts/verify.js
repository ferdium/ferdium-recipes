/**
 * Verify packaged recipe to match uncompressed recipe
 */
const targz = require('targz');
const fs = require('fs-extra');
const dircompare = require('dir-compare');
const path = require('path');

// Helper: Compress src folder into dest file
const decompress = (src, dest) => new Promise((resolve, reject) => {
  targz.decompress({
    src,
    dest,
    tar: {
      // Don't unpackage .DS_Store files
      ignore: function(name) {
          return path.basename(name) === '.DS_Store'
      }
    },
  }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(dest);
    }
  });
});

if (!process.argv[2]) {
  console.log('Usage: yarn verify <recipe>');
  return;
}

// Let us work in an async environment
(async () => {
  const recipe = process.argv[2];

  const compressedRecipe = path.join(__dirname, '../', 'archives', `${recipe}.tar.gz`);
  const uncompressedRecipe = path.join(__dirname, '../', 'uncompressed', recipe);
  const tempUncompressed = path.join(__dirname, `uncompressed/`);

  // Check that recipe exists
  if (!await fs.pathExists(compressedRecipe) || !await fs.pathExists(uncompressedRecipe)) {
    console.log(`Error: Recipe does not exist.`);
    return;
  }

  if (await fs.pathExists(tempUncompressed)) {
    await fs.remove(tempUncompressed);
  }
  await fs.mkdir(tempUncompressed);

  // Package to uncompressed recipe to .tar.gz
  console.log(`Decompressing...`);
  await decompress(compressedRecipe, tempUncompressed);

  // Compare directories
  const compare = dircompare.compareSync(uncompressedRecipe, tempUncompressed, {
    compareContent: true,
  });

  if (compare.same) {
    console.log('✓ Compressed and uncompressed files are equal');
  } else {
    console.log('❌ Compressed and uncompressed files are NOT equal');
  }

  // Remove temporary compressed file
  await fs.remove(tempUncompressed);
})();
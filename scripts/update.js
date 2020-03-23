/**
 * Update recipes from a Ferdi-compatible server
 */
const fetch = require('node-fetch');
const targz = require('targz');
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');

console.log("Ferdi Recipe Repository Updater v1.0.0");

// Server to update from
const server = "http://api.franzinfra.com/v1";

// Create paths to important files
const allJson = path.join('../', 'all.json');

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

// Let us work in an async environment
(async () => {
  // Get current recipes from server
  const serverRecipes = await (await fetch(server + '/recipes')).json();

  // Get current local recipes
  const localRecipes = await fs.readJson(allJson);
  
  for (const recipe of serverRecipes) {
    // Find local recipe info
    const localRecipe = localRecipes.find(e => e.id === recipe.id);

    if (!localRecipe || semver.gt(recipe.version, localRecipe.version)) {
      // Update is availible
      console.log(`Updating ${recipe.id} from ${localRecipe ? localRecipe.version : '-1'} to ${recipe.version}`);

      const compressed = path.join('../archives', `${recipe.id}.tar.gz`);
      const uncompressed = path.join('../uncompressed', recipe.id);

      // Download recipe to filesystem
      try {
        console.log("Downloading " + server + '/recipes/download/' + recipe.id);
        await downloadFile(
            server + '/recipes/download/' + recipe.id,
            compressed
        );
      } catch(e) {
          console.log(`Could not download ${recipe.id}`);
          return;
      }

      // Extract recipe
      await decompress(compressed, uncompressed)

      // Make sure we have all icons
      const iconPng = path.join(uncompressed, '/icon.png');
      const iconSvg = path.join(uncompressed, '/icon.svg');
      if (!await fs.exists(iconPng)) {
        downloadFile(recipe.icons.png, iconPng);
      }
      if (!await fs.exists(iconSvg)) {
        downloadFile(recipe.icons.svg, iconSvg);
      }

      // Update entry in all.json
      // Check if package ID already exists
      const recipeIndex = localRecipes.findIndex(e => e.id === recipe.id);

      const recipeInfo = recipe;
      recipeInfo.icons.png = recipeInfo.icons.png.replace(
        'https://cdn.franzinfra.com/recipes/dist/',
        'https://cdn.jsdelivr.net/gh/getferdi/recipes/uncompressed/'
      ).replace(
        'src/icon.png',
        'icon.png'
      );
      recipeInfo.icons.svg = recipeInfo.icons.svg.replace(
        'https://cdn.franzinfra.com/recipes/dist/',
        'https://cdn.jsdelivr.net/gh/getferdi/recipes/uncompressed/'
      ).replace(
        'src/icon.svg',
        'icon.svg'
      );

      if (recipeIndex !== -1) {
        localRecipes[recipeIndex] = recipeInfo;
      } else {
        localRecipes.push(recipeInfo);
      }
    }
  }

  // Write updated package info to all.json
  await fs.writeJson(allJson, localRecipes, {
    spaces: 2,
    EOL: '\n',
  });
})();
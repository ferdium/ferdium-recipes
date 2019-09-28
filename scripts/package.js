/**
 * Package recipe into tar.gz file
 */
const targz = require('targz');
const fs = require('fs-extra');
const path = require('path');

console.log('Ferdi Recipe Packager v1.0.0');

// Publicly availible link to this repository's uncompressed folder
// Used for generating public icon URLs
const repo = 'https://cdn.jsdelivr.net/gh/getferdi/recipes/uncompressed/';

// Helper: Compress src folder into dest file
const compress = (src, dest) => new Promise((resolve, reject) => {
  targz.compress({
    src,
    dest,
  }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(dest);
    }
  });
});

// Create paths to important files
const recipeSrc = path.join(__dirname, 'recipe_src');
const packageJson = path.join(recipeSrc, 'package.json');
const svgIcon = path.join(recipeSrc, 'icon.svg');
const pngIcon = path.join(recipeSrc, 'icon.png');
const allJson = path.join('../', 'all.json');

// Let us work in an async environment
(async () => {
  // Check that package.json exists
  if (!await fs.pathExists(packageJson)) {
    console.log(`Error: Please add your recipe to ${recipeSrc}. (package.json not found)`);
    return;
  }
  // Check that icons exist
  if (!await fs.pathExists(svgIcon) || !await fs.pathExists(pngIcon)) {
    console.log(`Error: Please make sure your recipe contains an icon.png and an icon.svg file.`);
    return;
  }

  // Read package.json
  const config = await fs.readJson(packageJson)

  // Make sure it contains all required fields
  if (!config || !config.id || !config.name || !config.config) {
    console.log(`Error: Your package.json does not contain all required fields. 
Please make sure it contains: id, name, config`);
    return;
  }

  // Move readme.txt outside of recipe_src folder
  await fs.move(path.join(recipeSrc, 'readme.txt'), './readme.txt');

  // Package to .tar.gz
  console.log(`Packaging ${config.id}...`);
  compress(recipeSrc, path.join('../', `${config.id}.tar.gz`));

  // Copy recipe src folder to /uncompressed/:id folder
  console.log('Copying to uncompressed recipes');
  await fs.copy('recipe_src', path.join('../', 'uncompressed', `${config.id}`));

  // Add recipe to all.json
  console.log('Adding to all.json');
  const packageInfo = {
    "author": config.author || '',
    "featured": false,
    "id": config.id,
    "name": config.name,
    "version": config.version || '1.0.0',
    "icons": {
      "png": `${repo}${config.id}/icon.png`,
      "svg": `${repo}${config.id}/icon.svg`,
    },
  };
  let all = await fs.readJson(allJson);
  // Check if package ID already exists
  const packageIndex = all.findIndex(e => e.id === config.id)
  if (packageIndex !== -1) {
    console.log('Package with ID already exists - overwriting');
    all[packageIndex] = packageInfo;
  } else {
    console.log('No package with ID found - creating new.');
    all.push(packageInfo);
  }
  await fs.writeJson(allJson, all, {
    spaces: 2,
    EOL: '\n',
  });

  // Move readme.txt back into recipe_src
  await fs.move('./readme.txt', path.join(recipeSrc, 'readme.txt'));

  console.log(`Successfully packaged and added new package ${config.id}`);
})();
/**
 * Package recipe into tar.gz file
 */
const targz = require('targz');
const fs = require('fs-extra');
const path = require('path');
const sizeOf = require('image-size');
const semver = require('semver');

// Publicly availible link to this repository's uncompressed folder
// Used for generating public icon URLs
const repo = 'https://cdn.jsdelivr.net/gh/getferdi/recipes/uncompressed/';

// Helper: Compress src folder into dest file
const compress = (src, dest) => new Promise((resolve, reject) => {
  targz.compress({
    src,
    dest,
    tar: {
      // Don't package .DS_Store files
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
// Let us work in an async environment
module.exports = async () => {
  // Create paths to important files
  const recipeSrc = path.join(__dirname, '../recipe_src');
  const packageJson = path.join(recipeSrc, 'package.json');
  const svgIcon = path.join(recipeSrc, 'icon.svg');
  const pngIcon = path.join(recipeSrc, 'icon.png');
  const allJson = path.join(__dirname, '../../', 'all.json');
  let all = await fs.readJson(allJson);

  let errorMessages = []

  // Check that package.json exists
  if (!await fs.pathExists(packageJson)) {
    errorMessages.push(`⚠️ It looks like your recipe is missing the "package.json" file.
    ↪ Please add your recipe to ${recipeSrc} and make sure that folder contains a "package.json".
    ℹ For more information on how to add your recipe visit: https://github.com/getferdi/recipes/blob/master/docs/integration.md`);
  }

  // Check that icons exist
  const hasSvg = await fs.pathExists(svgIcon);
  if (!hasSvg) {
    errorMessages.push(`⚠️ It looks like your recipe is missing the "icon.svg" file.
    ↪ Please make sure your recipe contains an icon.svg file.
    ℹ For more information about recipe icons visit: https://github.com/getferdi/recipes/blob/master/docs/integration.md#icons`);  
  }
  
  const hasPng = await fs.pathExists(pngIcon);
  if (!hasPng) {
    errorMessages.push(`⚠️ It looks like your recipe is missing the "icon.png" file.
    ↪ Please make sure your recipe contains an icon.png file.
    ↪ Please also make sure that your PNG icon is 1024x1024px in size.
    ℹ For more information about recipe icons visit: https://github.com/getferdi/recipes/blob/master/docs/integration.md#icons`);
  }

  // Check that icons have the right dimensions
  if (hasSvg) {
    const svgSize = sizeOf(svgIcon);
    const svgHasRightSize = svgSize.width === svgSize.height;
    if (!svgHasRightSize) {
      errorMessages.push(`⚠️ It looks like your "icon.svg" is not a square.
      ↪ Please make sure that your "icon.svg" has the right dimensions to make a square- width and height should be the same.
      ℹ You can use software like Photoshop, GIMP or Photopea (https://www.photopea.com/) to resize your icons.
      ℹ For more information about recipe icons visit: https://github.com/getferdi/recipes/blob/master/docs/integration.md#icons`);
    }
  }

  if (hasPng) {
    const pngSize = sizeOf(pngIcon);
    const pngHasRightSize = pngSize.width === 1024 && pngSize.height === 1024;
    if (hasPng && !pngHasRightSize) {
      errorMessages.push(`⚠️ it looks like your "icon.png" is not 1024x1024 in size.
      ↪ Please make sure that your "icon.png" has the right dimeensions of 1024x1024px.
      ℹ You can use software like Photoshop, GIMP or Photopea (https://www.photopea.com/) to resize your icons.
      ℹ For more information about recipe icons visit: https://github.com/getferdi/recipes/blob/master/docs/integration.md#icons`);
    }
  }

  // Read package.json
  const config = await fs.readJson(packageJson)

  // Make sure it contains all required fields
  if (!config) {
    errorMessages.push(`⚠️ It looks like your "package.json" file could not read or parsed.
    ↪ Please make sure your "package.json" contains valid JSON.
    ℹ You can use a JSON Validator like JSONLint: https://jsonlint.com/
    ℹ For more information about the package.json file visit: https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
  }
  
  if (!config.id) {
    errorMessages.push(`⚠️ It looks like your "package.json" does not contain an "id" field.
    ↪ Please make sure the "id" field contains a unique ID made of lowercase letters (a-z), numbers (0-9), hyphens (-), periods (.), and underscores (_)
    ℹ For more information about the package.json file visit: https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
  } else if (!/^[a-z._\-]+$/.test(config.id)) {
    errorMessages.push(`⚠️ It looks like your "package.json" defines an invalid recipe ID.
    ↪ Please make sure the "id" field only contains lowercase letters (a-z), numbers (0-9), hyphens (-), periods (.), and underscores (_)
    ℹ For more information about the package.json file visit: https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
  }
  if (!config.name) {
    errorMessages.push(`⚠️ It looks like your "package.json" does not contain a "name" field.
    ↪ Please make sure the "name" field contains the name of the service (e.g. "Google Keep")
    ℹ For more information about the package.json file visit: https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
  }
  if (!config.version) {
    errorMessages.push(`⚠️ It looks like your "package.json" does not contain a "version" field.
    ↪ Please make sure the "version" field contains a semver-compatible version number for your recipe (e.g. "1.0.0")
    ℹ For more information about the package.json file visit: https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
  }
  if (!config.config || typeof config.config !== "object") {
    errorMessages.push(`⚠️ It looks like your "package.json" does not contain a "config" object.
    ↪ Please make sure the "config" object contains a configuration for your service.
    ℹ For more information about the package.json file visit: https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
  } else if (!config.config.serviceURL) {
    errorMessages.push(`⚠️ It looks like your "package.json" does not contain a "config" object without a "serviceURL" field.
    ↪ Please make sure the "serviceURL" contains the URL of your service.
    ℹ For more information about the package.json file visit: https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
  }

  // Index of the current recipe in all.json
  const packageIndex = all.findIndex(e => e.id === config.id)

  if (packageIndex !== -1) {
    const currentVersion = config.version;
    const repoVersion = all[packageIndex].version;

  if (semver.gte(repoVersion, currentVersion)) {
    errorMessages.push(`⚠️ It looks like your recipe is using the same version number as the current recipe.
    ↪ Please make sure to increase the version number inside your "package.json" everytime you want to repackage (e.g. '1.0.0' to '1.0.1').
    ↪ If you don't increase your version number, Ferdi cannot detect that you have made changes to the recipe.
    ℹ For more information about versioning of recipes visit: https://github.com/getferdi/recipes/blob/master/docs/configuration.md#config-flags`);
    }
  }

  if (!await fs.exists(path.join(recipeSrc, 'webview.js'))) {
    errorMessages.push(`⚠️ It looks like your recipe doesn't contain a "webview.js" file.
    ↪ Please make sure to create that file and add your features to it.
    ℹ For more information about the webview.js file visit: https://github.com/getferdi/recipes/blob/master/docs/integration.md#webviewjs and https://github.com/getferdi/recipes/blob/master/docs/frontend_api.md`);
  }
  if (!await fs.exists(path.join(recipeSrc, 'index.js'))) {
    errorMessages.push(`⚠️ It looks like your recipe doesn't contain a "index.js" file.
    ↪ Please make sure to create that file and add your features to it. For most recipes it is enough to simply add the basic template found at https://github.com/getferdi/recipes/blob/master/docs/integration.md#indexjs
    ℹ For more information about the webview.js file visit: https://github.com/getferdi/recipes/blob/master/docs/integration.md#indexjs and https://github.com/getferdi/recipes/blob/master/docs/backend_api.md`);
  }

  if (errorMessages.length > 0) {
    console.log(`❌ Could not add your recipe, the following ${errorMessages.length} error(s) were found:
${errorMessages.reduce((str, err) => `${str}\n${err}`)}
ℹ For more information, visit: https://github.com/getferdi/recipes/tree/master/docs`);
    return;
  }

  // Package to .tar.gz
  console.log(`[Info] Packaging ${config.id}...`);
  compress(recipeSrc, path.join(__dirname, '../../', 'archives', `${config.id}.tar.gz`));

  // Copy recipe src folder to /uncompressed/:id folder
  console.log('[Info] Copying to uncompressed recipes');
  await fs.copy('recipe_src', path.join(__dirname, '../../', 'uncompressed', `${config.id}`));

  // Add recipe to all.json
  console.log('[Info] Adding to all.json');
  const isFeatured = packageIndex !== -1 ? all[packageIndex].featured : false;
  const packageInfo = {
    "author": config.author || '',
    "featured": isFeatured,
    "id": config.id,
    "name": config.name,
    "version": config.version || '1.0.0',
    "icons": {
      "png": `${repo}${config.id}/icon.png`,
      "svg": `${repo}${config.id}/icon.svg`,
    },
  };
  // Check if package ID already exists
  if (packageIndex !== -1) {
    console.log('[Info] Recipe with ID already exists - overwriting');
    all[packageIndex] = packageInfo;
  } else {
    console.log('[Info] No recipe with ID found - creating new.');
    all.push(packageInfo);
  }

  // Sort package list alphabetically
  all = all.sort((a, b) => {
    var textA = a.id.toLowerCase();
    var textB = b.id.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  await fs.writeJson(allJson, all, {
    spaces: 2,
    EOL: '\n',
  });

  console.log(`✅ Successfully packaged and added new recipe "${config.id}"`);
};

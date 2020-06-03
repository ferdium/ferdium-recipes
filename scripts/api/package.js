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

  // Check that package.json exists
  if (!await fs.pathExists(packageJson)) {
    console.log(`⚠️ Could not add your recipe: Please add your recipe to ${recipeSrc} and make sure that folder contains a "package.json".
For more information on how to add your recipe visit https://github.com/getferdi/recipes/blob/master/docs/integration.md`);
    return;
  }

  // Check that icons exist
  const hasSvg = await fs.pathExists(svgIcon);
  const hasPng = await fs.pathExists(pngIcon);
  if (!hasSvg && !hasPng) {
    console.log(`⚠️ Could not add your recipe: Please make sure your recipe contains an icon.png and an icon.svg file.
Those icons should be the logo of the recipe you are trying to add.
Please also make sure that your icons are 1024x1024px in size.
For more information about recipe icons visit https://github.com/getferdi/recipes/blob/master/docs/integration.md#icons`);
    return;
  } else if (!hasSvg) {
    console.log(`⚠️ Could not add your recipe: Please make sure your recipe contains an icon.svg file.
Your recipe already contains an "icon.png" but it also requires an "icon.svg" to display properly.
Please also make sure that your icons are 1024x1024px in size.
For more information about recipe icons visit https://github.com/getferdi/recipes/blob/master/docs/integration.md#icons`);
    return;
  } else if (!hasPng) {
    console.log(`⚠️ Could not add your recipe: Please make sure your recipe contains an icon.png file.
Your recipe already contains an "icon.svg" but it also requires an "icon.png" to display properly.
Please also make sure that your icons are 1024x1024px in size.
For more information about recipe icons visit https://github.com/getferdi/recipes/blob/master/docs/integration.md#icons`);
    return;
  }

  // Check that icons have the right dimensions
  const pngSize = sizeOf(pngIcon);
  const pngHasRightSize = pngSize.width === 1024 && pngSize.height === 1024;
  if (!pngHasRightSize) {
    console.log(`⚠️ Could not add your recipe: "icon.png" should be to be 1024x1024px in size.
Please make sure that your "icon.png" has the right size of 1024x1024px in size.
You can use software like Photoshop, GIMP or Photopea (https://www.photopea.com/) to resize your icons.
For more information about recipe icons visit https://github.com/getferdi/recipes/blob/master/docs/integration.md#icons`);
    return;
  }

  // Read package.json
  const config = await fs.readJson(packageJson)

  // Make sure it contains all required fields
  if (!config) {
    console.log(`⚠️ Could not add your recipe: We could not read or parse your "package.json" configuration.
Please make sure your "package.json" contains valid JSON.
For more information about the package.json file visit https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
    return;
  }
  let configErrors = [];
  if (!config.id) {
    configErrors.push("Your package.json contains no 'id' field. This field should contain a unique ID made of lowercase letters (a-z), numbers (0-9), hyphens (-), periods (.), and underscores (_)");
  } else if (!/^[a-z0-9._\-]+$/.test(config.id)) {
    configErrors.push("Your package.json defines an invalid recipe ID. Please make sure the 'id' field only contains lowercase letters (a-z), numbers (0-9), hyphens (-), periods (.), and underscores (_)");
  }
  if (!config.name) {
    configErrors.push("Your package.json contains no 'name' field. This field should contain the name of the service (e.g. 'Google Keep')");
  }
  if (!config.version) {
    configErrors.push("Your package.json contains no 'version' field. This field should contain the a semver-compatible version number for your recipe (e.g. '1.0.0')");
  }
  if (!config.config || typeof config.config !== "object") {
    configErrors.push("Your package.json contains no 'config' object. This field should contain a configuration for your service.");
  } else if (!config.config.serviceURL) {
    configErrors.push("Your package.json contains a 'config' object with no 'serviceURL' field. This field should contain the URL of your service.");
  }

  if (configErrors.length > 0) {
    console.log(`⚠️ Could not add your recipe: There were errors in your package.json:
${configErrors.reduce((str, err) => `${str}\n${err}`)}
For more information about the package.json file visit https://github.com/getferdi/recipes/blob/master/docs/configuration.md`);
    return;
  }

  // Index of the current recipe in all.json
  const packageIndex = all.findIndex(e => e.id === config.id)

  if (packageIndex !== -1) {
    const currentVersion = config.version;
    const repoVersion = all[packageIndex].version;

    if (semver.gte(repoVersion, currentVersion)) {
      console.log(`⚠️ Could not add your recipe: It looks like your recipe is using the same version number as the current recipe.
Please make sure to increase the version number inside your "package.json" everytime you want to repackage (e.g. '1.0.0' to '1.0.1').
If you don't increase your version number, Ferdi cannot detect that you have made changes to the recipe.
For more information about versioning of recipes visit https://github.com/getferdi/recipes/blob/master/docs/configuration.md#config-flags`);
      return;
    }
  }

  if (!await fs.exists(path.join(recipeSrc, 'webview.js'))) {
    console.log(`⚠️ Could not add your recipe: It looks like your recipe doesn't contain a "webview.js" file.
Please make sure to create that file and add your features to it.
For more information about the webview.js file visit https://github.com/getferdi/recipes/blob/master/docs/integration.md#webviewjs and https://github.com/getferdi/recipes/blob/master/docs/frontend_api.md`);
    return;
  }
  if (!await fs.exists(path.join(recipeSrc, 'index.js'))) {
    console.log(`⚠️ Could not add your recipe: It looks like your recipe doesn't contain a "index.js" file.
Please make sure to create that file and add your features to it. For most recipes it is enough to simply add the basic template found at https://github.com/getferdi/recipes/blob/master/docs/integration.md#indexjs
For more information about the webview.js file visit https://github.com/getferdi/recipes/blob/master/docs/integration.md#indexjs and https://github.com/getferdi/recipes/blob/master/docs/backend_api.md`);
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

/**
 * Create a new recipe for your service
 */
const fs = require('fs-extra');
const path = require('path');
const open = require('open');

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
const recipe = recipeName.toLowerCase().replace(/\s/g, '-');
const folderName = process.argv[3] || 'Ferdium';
const filesThatNeedTextReplace = [
  'package.json',
  'index.js',
  'webview.js',
];

const toPascalCase = (str) => {
  const words = str
    .replace(/[^a-z]/g, '')
    .split(/\W/)
    .map((word) => {
      if (word.length === 0) {
        return word;
      }
      // Capitalize the first letter, lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  return words.join('');
}
const pascalCasedName = toPascalCase(recipe); // PascalCased recipe ID only containing a-z, for usage as the JavaScript class name

(async () => {
  // Folder paths
  const userData =
    process.env.APPDATA ||
    (process.platform == 'darwin'
      ? process.env.HOME + '/Library/Application Support'
      : process.env.HOME + '/.config');
  const recipesFolder = path.join(userData, folderName, 'recipes');
  const devRecipeFolder = path.join(recipesFolder, 'dev');
  const newRecipeFolder = path.join(devRecipeFolder, recipe);
  const sampleRecipe = path.join(__dirname, 'sample_recipe');

  // Make sure dev recipe folder exists
  if (!fs.existsSync(recipesFolder)) {
    console.log(
      `Couldn't find your recipe folder (${recipesFolder}). Is Ferdium installed?`,
    );
    return;
  }
  await fs.ensureDir(devRecipeFolder);

  if (fs.existsSync(newRecipeFolder)) {
    console.log('⚠️ Recipe already exists');
    return;
  }

  console.log('[Info] Passed pre-checks');

  // Copy sample recipe to recipe folder
  await fs.copy(sampleRecipe, newRecipeFolder);
  console.log('[Info] Copied recipe');

  // Replace placeholders with the recipe-specific values
  for (const file of filesThatNeedTextReplace) {
    const filePath = path.join(newRecipeFolder, file);
    let contents = await fs.readFile(filePath, 'utf-8');
    contents = contents.replace(/SERVICE/g, recipe);
    contents = contents.replace(/SNAME/g, recipeName);
    contents = contents.replace(/SPASCAL/g, pascalCasedName);
    await fs.writeFile(filePath, contents);
  }
  console.log('[Info] Prepared new recipe');

  open(newRecipeFolder);
  console.log(`✅ Successfully created your recipe.

What's next?
- Make sure you restart Ferdium in order for the recipe to show up
- Customise "webview.js", "package.json" and "icon.svg" (see https://github.com/ferdium/ferdium-recipes/blob/main/docs/integration.md#recipe-structure)
- Publish your recipe (see https://github.com/ferdium/ferdium-recipes/blob/main/docs/integration.md#publishing)`);
})();

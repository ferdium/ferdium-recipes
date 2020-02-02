/**
 * Load recipe into development folder
 */
const fs = require('fs-extra');
const path = require('path');

console.log('load: Load recipe into development folder');
console.log('This command will empty the recipe_src folder. Please make sure that there are no important files in that directory.');

const recipe = process.argv[2];
if (!recipe) {
  console.log('Usage: yarn load [recipe]');
  return;
}

console.log(`Loading ${recipe}`);

// Create paths to important files
const recipeSrc = path.join(__dirname, 'recipe_src');
const recipePkg = path.join(__dirname, '../', 'uncompressed', recipe);

// Let us work in an async environment
(async () => {
  // Check that recipe folder exists
  if (!await fs.pathExists(recipePkg)) {
    console.log(`Error: Recipe ${recipe} does not exist.`);
    return;
  }

  console.log('Emptying directory...');
  
  await fs.emptyDir(recipeSrc);

  console.log('Copying data...');
  
  await fs.copy(recipePkg, recipeSrc);

  console.log('Done');
})();
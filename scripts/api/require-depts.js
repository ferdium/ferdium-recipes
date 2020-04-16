/**
 * Require the dependencies to be installed or fail otherwise
 */
module.exports = () => {
  try {
    // Try to include some package to see if it throws an error
    require('targz');
    require('fs-extra');
    require('git-url-parse');
    require('image-size');
    require('semver');
  } catch (e) {
    console.log(`⚠️ Could not add your recipe: Please make sure to install the dependencies first!
It looks like you havn't run "npm install" yet. Please run that command in order to install all the dependencies required to run the scripts.
If you get an error similar to "command not found: npm" while installing the dependencies, make sure to install npm first using the guide at https://www.npmjs.com/get-npm.
If you've already installed the dependencies before, please re-run "npm install" again as the dependencies might have changed.
For more information about installing this script visit https://github.com/getferdi/recipes/blob/master/docs/integration.md#publishing`);
    process.exit(0);
  }
}
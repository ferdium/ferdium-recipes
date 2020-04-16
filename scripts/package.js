/**
 * Package recipe into tar.gz file
 */
require('./api/require-depts')();

const packageRecipe = require('./api/package');

packageRecipe();
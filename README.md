# recipes
Recipes for Ferdi.

Copyright on these recipes is on their original creators.

## Adding your own recipes
After creating your own recipe using [Franz's guide](https://github.com/meetfranz/plugins/blob/master/docs/integration.md) you can add them to this repository.

1. Copy your recipe files into `scripts/recipe_src`
2. Open a terminal at `scripts/`
3. Run `yarn install` to install all dependencies
4. Run `yarn package` to package your new recipe
5. Create a PR to <https://github.com/getferdi/recipes> with your new changes

## Importing recipes from GitHub
If you've uploaded your recipe to GitHub, you can easily import it into the Ferdi recipe repository using the `add_github` script:

1. Open a terminal at `scripts/`
2. Run `yarn install` to install all dependencies
3. Run `yarn github [GitHub URL]`, e.g. `yarn github https://github.com/vantezzen/franz-recipe-standardnotes`, to add your new recipe
4. Create a PR to <https://github.com/getferdi/recipes> with your new changes
# How to update/change recipes

If you want to improve or update an existing recipe, please follow this guide.

Please **do not** simply change files inside `uncompressed` - Ferdi only uses the packaged archives, the uncompressed files are only to improve accessibility of the repository.

## 0. Find the recipe ID of the recipe you want to update

Before you can start updating the recipe, you'll need to know its internal ID. The ID is a string of lowercase letters and hyphens that Ferdi uses to store and manage them.

To find the recipe ID, you can search <https://github.com/getferdi/recipes/blob/master/all.json> for the recipe you want to edit.

In the rest of this guide, always replace "&lt;recipe id>" with the ID of the recipe you want to edit.

## 1. Implement your updates

We highly suggest that you implement and test your updates to the recipe inside Ferdi before implementing them into the recipe repository. This will save you time on debugging and repackaging the recipe later.

You can find the recipe source Ferdi uses at:
  * Mac: `~/Library/Application Support/Ferdi/recipes/<recipe id>/`
  * Windows: `%appdata%/Ferdi/recipes/<recipe id>/`
  * Linux: `~/.config/Ferdi/recipes/<recipe id>`

After changing the files in that folder, you can reload the service inside Ferdi using `CTRL/CMD + R`.

## 2. Setting up the recipe repository

- Fork https://github.com/getferdi/recipes and clone it to your computer
- Open a terminal in the `scripts/` folder of that repository
- Run `npm install` to install all dependencies

This will setup the repository so that you can work on updating it.

## 3. Loading and updating the recipe

Again, please **do not** edit any of the files located inside the `uncompressed` folder! Before editing, you'll need to "load" the recipe you want to edit using
```JavaScript
npm run load <recipe id>
```
(e.g. `npm run load gmail`)

Your recipe is now loaded into `scripts/recipe_src`. You can now make changes to the files **in that folder*.

## 4. Updating the version number

In order for Ferdi to update its recipe, you'll need to bump its version number. Increase the `version` inside `scripts/recipe_src/package.json`.

## 5. Re-packaging the recipe

You can now run `npm run package` to repackage your updated files. Your changes will be automatically copied into the recipe source at `uncompressed` and compressed into `archives/<recipe id>.tar.gz` - no need to update anything manually!

## 6. Commit your changes and create a PR to <https://github.com/getferdi/recipes>

# EpicMail Ferdium Recipe

This folder contains a Ferdium recipe for EpicMail that can be added as a local dev recipe or submitted upstream to the Ferdium recipes catalog.

## Important note about local installs

A locally installed Ferdium dev recipe shows up under the `Custom Services` tab, not the main `All services` catalog. To have EpicMail appear in the normal searchable catalog for everyone, it must be submitted upstream to Ferdium.

## Files

- `package.json`: Ferdium recipe metadata and default service URL
- `index.js`: minimal recipe bootstrap
- `webview.js`: unread badge integration using EpicMail's sidebar badges
- `icon.png`: EpicMail service icon
- `icon.svg`: EpicMail catalog icon
- `..\install-dev-recipe.ps1`: installs the recipe into Ferdium's Windows dev-recipes folder

## Quick install on Windows

1. Close Ferdium completely.
2. From the repo root, run:

```powershell
.\integrations\ferdium\install-dev-recipe.ps1
```

3. Restart Ferdium.
4. Click `+` or `Add service`.
5. Open the `Custom Services` tab.
6. Search for `EpicMail`.
7. Select `EpicMail`.
8. Choose a name/color if you want, then save.

## If EpicMail does not show up

- Make sure Ferdium was fully closed before running the install script.
- Restart Ferdium after the script finishes.
- Confirm the recipe exists under `%APPDATA%\Ferdium\recipes\dev\epicmail`.
- Make sure you are looking in the `Custom Services` tab, not only `All services`.
- If needed, delete that `epicmail` folder, rerun the install script, and restart Ferdium again.

## Manual local install

Copy this folder to Ferdium's dev recipes directory as `epicmail`.

Typical dev recipe locations:

- Windows: `%APPDATA%\\Ferdium\\recipes\\dev\\epicmail`
- Linux: `~/.config/Ferdium/recipes/dev/epicmail`
- macOS: `~/Library/Application Support/Ferdium/recipes/dev/epicmail`

After restarting Ferdium, open the `Custom Services` tab, search for `EpicMail`, and add it like a native service.

## Upstreaming

To make EpicMail available in the official searchable catalog for everyone, submit the recipe files in this folder to the Ferdium recipes ecosystem.

### Suggested PR flow

1. Fork the official Ferdium recipes repository on GitHub.
2. Create a branch such as `add-epicmail-service`.
3. Add a new `epicmail` recipe folder following the repo's existing structure.
4. Copy in:
   - `package.json`
   - `index.js`
   - `webview.js`
   - `icon.png`
   - `icon.svg`
5. Compare against a few existing first-party recipe folders to match formatting and conventions.
6. Run whatever validation or lint checks the Ferdium repo requires.
7. Commit with a clear message such as `Add EpicMail service recipe`.
8. Open the PR and include:
   - EpicMail app URL
   - short service description
   - a screenshot of the service in Ferdium
   - a note that unread badge support is handled in `webview.js`

### Pre-PR checklist

- EpicMail shows up in local Ferdium `Custom Services`
- login works inside Ferdium
- unread badge count updates correctly
- service icon looks clean in light and dark themes
- recipe metadata uses the production EpicMail URL

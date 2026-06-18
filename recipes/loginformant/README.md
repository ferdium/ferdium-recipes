# LogInformant Ferdium Recipe

This folder contains a Ferdium recipe for LogInformant that can be added as a local dev recipe or submitted upstream to the Ferdium recipes catalog.

## Important Note About Local Installs

A locally installed Ferdium dev recipe shows up under the `Custom Services` tab, not the main `All services` catalog. To have LogInformant appear in the normal searchable catalog for everyone, it must be submitted upstream to Ferdium.

## Files

- `package.json`: Ferdium recipe metadata and default service URL
- `index.js`: minimal recipe bootstrap
- `webview.js`: badge integration using an optional `[data-ferdium-badge]` element
- `icon.png`: LogInformant service icon
- `icon.svg`: LogInformant catalog icon
- `..\install-dev-recipe.ps1`: installs the recipe into Ferdium's Windows dev-recipes folder

## Quick Install On Windows

1. Close Ferdium completely.
2. From the repo root, run:

```powershell
.\Integrations\ferdium\install-dev-recipe.ps1
```

3. Restart Ferdium.
4. Click `+` or `Add service`.
5. Open the `Custom Services` tab.
6. Search for `LogInformant`.
7. Select `LogInformant`.
8. Choose a name/color if you want, then save.

## If LogInformant Does Not Show Up

- Make sure Ferdium was fully closed before running the install script.
- Restart Ferdium after the script finishes.
- Confirm the recipe exists under `%APPDATA%\Ferdium\recipes\dev\loginformant`.
- Make sure you are looking in the `Custom Services` tab, not only `All services`.
- If needed, delete that `loginformant` folder, rerun the install script, and restart Ferdium again.

## Manual Local Install

Copy this folder to Ferdium's dev recipes directory as `loginformant`.

Typical dev recipe locations:

- Windows: `%APPDATA%\\Ferdium\\recipes\\dev\\loginformant`
- Linux: `~/.config/Ferdium/recipes/dev/loginformant`
- macOS: `~/Library/Application Support/Ferdium/recipes/dev/loginformant`

After restarting Ferdium, open the `Custom Services` tab, search for `LogInformant`, and add it like a native service.

## Upstreaming

To make LogInformant available in the official searchable catalog for everyone, submit the recipe files in this folder to the Ferdium recipes ecosystem.

### Suggested PR Flow

1. Fork the official Ferdium recipes repository on GitHub.
2. Create a branch such as `add-loginformant-service`.
3. Add a new `loginformant` recipe folder following the repo's existing structure.
4. Copy in:
   - `package.json`
   - `index.js`
   - `webview.js`
   - `icon.png`
   - `icon.svg`
5. Compare against a few existing first-party recipe folders to match formatting and conventions.
6. Run whatever validation or lint checks the Ferdium repo requires.
7. Commit with a clear message such as `Add LogInformant service recipe`.
8. Open the PR and include:
   - LogInformant app URL
   - short service description
   - a screenshot of the service in Ferdium
   - a note that badge support is handled through an optional `[data-ferdium-badge]` element in `webview.js`

### Pre-PR Checklist

- LogInformant shows up in local Ferdium `Custom Services`
- Login works inside Ferdium
- Service icon looks clean in light and dark themes
- Recipe metadata uses the production LogInformant app URL

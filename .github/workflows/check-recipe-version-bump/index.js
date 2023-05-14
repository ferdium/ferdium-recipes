import core from '@actions/core';
import exec from '@actions/exec';

function isSemverGreater(a, b) {
  console.log(
    'comparing ',
    a,
    'and',
    b,
    ': ',
    a.localeCompare(b, undefined, { numeric: true }),
  );
  return a.localeCompare(b, undefined, { numeric: true }) === 1;
}

async function readFileFromGitBranch(branch, filename) {
  let output = '';

  const options = {
    silent: true,
    listeners: {
      stdout: data => {
        output += data.toString();
      },
    },
  };

  await exec.exec('git', ['show', `${branch}:${filename}`], options);

  return output;
}

try {
  const changedFilesString = core.getInput('changed-files');
  const changedFiles = changedFilesString.split(' ');

  const changedFilesInRecipes = changedFiles
    .filter(filename => filename.startsWith('recipes/'))
    .map(filename => filename.slice('recipes/'.length));

  const changedRecipes = [
    ...new Set(
      changedFilesInRecipes
        .map(filename => filename.replace(/\/(.*)$/, ''))
        .sort(),
    ),
  ];

  const notBumpedUpRecipes = {};
  for (const recipe of changedRecipes) {
    const packageJsonPath = `recipes/${recipe}/package.json`;

    if (!changedFiles.includes(packageJsonPath)) {
      notBumpedUpRecipes[recipe] = 'package.json not updated';
      continue;
    }

    // Check differences
    const packageMain = JSON.parse(
      await readFileFromGitBranch('origin/main', packageJsonPath),
    );
    const packageCurrent = JSON.parse(
      await readFileFromGitBranch('HEAD', packageJsonPath),
    );

    if (!isSemverGreater(packageCurrent.version, packageMain.version)) {
      notBumpedUpRecipes[
        recipe
      ] = `${packageCurrent.version} is not greater than ${packageMain.version}`;
      continue;
    }
  }

  if (Object.keys(notBumpedUpRecipes).length !== 0) {
    core.setFailed(
      'The following recipes should have their version bumped: ' +
      Object.keys(notBumpedUpRecipes).join(', ') +
        '. Please check the contributing guide: https://github.com/ferdium/ferdium-recipes/blob/main/docs/updating.md' +
        '\n' +
        JSON.stringify(notBumpedUpRecipes, undefined, 2),
    );
  }
} catch (error) {
  core.setFailed(error.message);
}

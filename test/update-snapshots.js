import { join } from 'path';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

import { createTypes, stripUserDir } from './generate-command.js';

// Remove the snapshots directory
const snapshotPath = join(__dirname, './snapshots');
execSync(`rm -rf ${snapshotPath}/*`);

/**
 * Returns the path to the snapshots directory
 * @param  {string} suffix
 * @return {string}
 * @example
 * destinationPath('fully-loaded-app')
 * // => '/path/to/interzero/create/test/snapshots/fully-loaded-app'
 * destinationPath('web-component')
 * // => '/path/to/interzero/create/test/snapshots/web-component'
 */
function destinationPath(suffix) {
  return join(snapshotPath, `./${suffix}`);
}

/**
 * Writes the output of the command to a file
 * @param  {string} output
 * @param  {string} suffix
 * @example
 * writeCommandOutputToFile('some output', 'fully-loaded-app')
 * // => writes 'some output' to '/path/to/interzero/create/test/snapshots/fully-loaded-app.output.txt'
 * writeCommandOutputToFile('some output', 'web-component')
 * // => writes 'some output' to '/path/to/interzero/create/test/snapshots/web-component.output.txt'
 */
function writeCommandOutputToFile(output, suffix) {
  const snapshotOutputPath = join(snapshotPath, `./${suffix}.output.txt`);
  const content = stripUserDir(output, suffix).split('snapshots/').join('output/');
  writeFileSync(snapshotOutputPath, content);
}

function generateSnapshot(type, { organization = '', tagPrefix = '' } = {}) {
  const { suffixPath, generateFn } = createTypes.get(type);
  let finalSuffixPath = organization ? `${suffixPath}-org` : suffixPath;
  finalSuffixPath = tagPrefix ? `${tagPrefix}-${finalSuffixPath}` : finalSuffixPath;

  const params = { destinationPath: destinationPath(finalSuffixPath) };

  if (organization) {
    params.organization = organization;
  }

  if (tagPrefix) {
    params.tagPrefix = tagPrefix;
  }

  const command = generateFn(params);
  const output = execSync(command);
  writeCommandOutputToFile(output.toString(), finalSuffixPath);
}

// Generate snapshots by looping through the createTypes map
for (const [type] of createTypes) {
  generateSnapshot(type);
}

// Generates snapshots for wc-ts using an orgaization name
generateSnapshot('wc-ts', { organization: '@interzero-test' });

// Generates snapshots for wc using a tag prefix
generateSnapshot('wc', { tagPrefix: 'interzero-test' });

// Generates snapshots for wc-ts using an orgaization name and a tag prefix
generateSnapshot('wc-ts', { organization: '@interzero-test', tagPrefix: 'interzero-test' });

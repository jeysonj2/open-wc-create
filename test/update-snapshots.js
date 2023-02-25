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
 * // => '/path/to/izwc/create/test/snapshots/fully-loaded-app'
 * destinationPath('web-component')
 * // => '/path/to/izwc/create/test/snapshots/web-component'
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
 * // => writes 'some output' to '/path/to/izwc/create/test/snapshots/fully-loaded-app.output.txt'
 * writeCommandOutputToFile('some output', 'web-component')
 * // => writes 'some output' to '/path/to/izwc/create/test/snapshots/web-component.output.txt'
 */
function writeCommandOutputToFile(output, suffix) {
  const snapshotOutputPath = join(snapshotPath, `./${suffix}.output.txt`);
  const content = stripUserDir(output, suffix).split('snapshots/').join('output/');
  writeFileSync(snapshotOutputPath, content);
}

function generateSnapshot(type) {
  const { suffixPath, generateFn } = createTypes.get(type);
  const command = generateFn({ destinationPath: destinationPath(suffixPath) });
  const output = execSync(command);
  writeCommandOutputToFile(output.toString(), suffixPath);
}

// Generate snapshots by looping through the createTypes map
for (const [type] of createTypes) {
  generateSnapshot(type);
}

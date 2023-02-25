import { join } from 'path';

const COMMAND_PATH = join(__dirname, '../src/create.js');

export function generateCommand({ destinationPath = '.' } = {}) {
  return `node -r @babel/register ${COMMAND_PATH} \
      --destinationPath ${destinationPath} \
      --type scaffold \
      --scaffoldType app \
      --features linting testing demoing building \
      --typescript false \
      --tagName scaffold-app \
      --writeToDisk true \
      --installDependencies false \
      --overwriteFile always
  `;
}

export function generateCommandWc({ destinationPath = '.' } = {}) {
  return `node -r @babel/register ${COMMAND_PATH} \
      --destinationPath ${destinationPath} \
      --type scaffold \
      --scaffoldType wc \
      --features linting testing demoing \
      --typescript false \
      --tagName scaffold-wc \
      --writeToDisk true \
      --installDependencies false \
      --overwriteFile always
  `;
}

export function generateCommandWcTs({ destinationPath = '.' } = {}) {
  return `node -r @babel/register ${COMMAND_PATH} \
      --destinationPath ${destinationPath} \
      --type scaffold \
      --scaffoldType wc \
      --features linting testing demoing \
      --typescript true \
      --tagName scaffold-wc \
      --writeToDisk true \
      --installDependencies false \
      --overwriteFile always
  `;
}

export const createTypes = new Map([
  [
    'app',
    {
      suffixPath: 'fully-loaded-app',
      generateFn: generateCommand,
    },
  ],
  [
    'wc',
    {
      suffixPath: 'web-component',
      generateFn: generateCommandWc,
    },
  ],
  [
    'wc-ts',
    {
      suffixPath: 'web-component-ts',
      generateFn: generateCommandWcTs,
    },
  ],
]);

/**
 * Removes text from the cli output which is specific to the local environment, i.e. the full path to the output dir.
 * @param  {string} output raw output
 * @return {string}        cleaned output
 */
export function stripUserDir(output, suffix = 'fully-loaded-app') {
  const toStrip = new RegExp(`destinationPath.*${suffix}`, 'gm');
  const toKeep = `destinationPath /path/to/izwc/create/test/output/${suffix}`;

  return output.replace(toStrip, toKeep);
}

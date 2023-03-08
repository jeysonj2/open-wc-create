import { join } from 'path';

const COMMAND_PATH = join(__dirname, '../src/create.js');

function getExtraOptions({ destinationPath = '.', organization = '', tagPrefix = '' } = {}) {
  let extraOptions = '';

  if (destinationPath) {
    extraOptions = `${extraOptions} \
      --destinationPath ${destinationPath}`;
  }

  if (organization) {
    extraOptions = `${extraOptions} \
      --organization ${organization}`;
  }

  extraOptions = `${extraOptions} \
      --tagPrefix ${tagPrefix || ''}`;

  return extraOptions;
}

export function generateCommand(extraOptions = {}) {
  return `node -r @babel/register ${COMMAND_PATH}${getExtraOptions(extraOptions)} \
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

export function generateCommandWc(extraOptions = {}) {
  return `node -r @babel/register ${COMMAND_PATH}${getExtraOptions(extraOptions)} \
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

export function generateCommandWcTs(extraOptions = {}) {
  return `node -r @babel/register ${COMMAND_PATH}${getExtraOptions(extraOptions)} \
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
  let result = output;

  // destinationPath
  let toStrip = new RegExp(`destinationPath.*${suffix}`, 'gm');
  let toKeep = `destinationPath /path/to/izwc/create/test/output/${suffix}`;
  result = result.replace(toStrip, toKeep);

  // cd
  toStrip = new RegExp(`cd.*${suffix}`, 'gm');
  toKeep = `cd /path/to/izwc/create/test/output/${suffix}`;
  result = result.replace(toStrip, toKeep);

  return result;
}

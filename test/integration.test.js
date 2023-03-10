// @ts-check
import _rimraf from 'rimraf';
import chai from 'chai';
import chaiFs from 'chai-fs';
import { exec as _exec, execSync } from 'child_process';
import { promisify } from 'util';
import { lstatSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { ESLint } from 'eslint';
import { stripUserDir, createTypes } from './generate-command.js';

const exec = promisify(_exec);

const rimraf = promisify(_rimraf);

const { expect } = chai;

chai.use(chaiFs);

/** @param {ESLint.LintResult} result */
const getFileMessages = ({ messages, filePath }) =>
  !messages.length
    ? ''
    : messages
        .map(
          ({ ruleId, line, column, message }) =>
            `${filePath} ${line}:${column}\n${message} (${ruleId})`,
        )
        .join('\n\n')
        .trimEnd();

const OUTPUT_PATH = join(__dirname, './output/');
execSync(`rm -rf ${OUTPUT_PATH}*`);

/**
 * Deletes the test files
 */
async function deleteGenerated(actualPath) {
  await rimraf(actualPath);
}

/**
 * Asserts that the contents of a file at a path equal the contents of a file at another path
 * @param  {string} expectedPath path to expected output
 * @param  {string} actualPath   path to actual output
 */
function assertFile(expectedPath, actualPath) {
  expect(actualPath).to.be.a.file().and.equal(expectedPath);
}

/**
 * Recursively checks a directory's contents, asserting each file's contents
 * matches it's counterpart in a snapshot directory
 * @param  {string} expectedPath snapshot directory path
 * @param  {string} actualPath   output directory path
 */
function checkSnapshotContents(expectedPath, actualPath) {
  readdirSync(actualPath).forEach(filename => {
    const actualFilePath = join(actualPath, filename);
    const expectedFilePath = join(expectedPath, filename);
    return lstatSync(actualFilePath).isDirectory()
      ? checkSnapshotContents(expectedFilePath, actualFilePath)
      : assertFile(expectedFilePath, actualFilePath);
  });
}

function create(typeOfCreate = 'app', { organization = '', tagPrefix = '' } = {}) {
  const createType = createTypes.has(typeOfCreate) ? typeOfCreate : 'app';

  let stdout;
  let stderr;
  let EXPECTED_OUTPUT = '';

  const generate = ({ command, expectedPath, suffixPath }) =>
    async function generateTestProject() {
      ({ stdout, stderr } = await exec(command));
      const EXPECTED_PATH = join(expectedPath, `../${suffixPath}.output.txt`);
      EXPECTED_OUTPUT = readFileSync(EXPECTED_PATH, 'utf-8');
    };

  return function createTest() {
    this.timeout(10000);

    let suffixPath = createTypes.get(createType)?.suffixPath || 'fully-loaded-app';
    suffixPath = organization ? `${suffixPath}-org` : suffixPath;
    suffixPath = tagPrefix ? `${tagPrefix}-${suffixPath}` : suffixPath;

    const generateCommand =
      createTypes.get(createType)?.generateFn ||
      (() => {
        throw new Error('No generate function found');
      });

    const destinationPath = join(OUTPUT_PATH, suffixPath);
    const expectedPath = join(__dirname, `./snapshots/${suffixPath}`);
    const command = generateCommand({ destinationPath, organization, tagPrefix });

    before(generate({ command, expectedPath, suffixPath }));

    after(async () => deleteGenerated(destinationPath));

    it('scaffolds the project', async () => {
      // Check that all files exist, without checking their contents
      expect(destinationPath).to.be.a.directory().and.deep.equal(expectedPath);
    });

    it('generates expected file contents', () => {
      // Check recursively all file contents
      checkSnapshotContents(expectedPath, destinationPath);
    });

    it('outputs expected message', () => {
      expect(stripUserDir(stdout, suffixPath)).to.equal(stripUserDir(EXPECTED_OUTPUT, suffixPath));
    });

    it('does not exit with an error', () => {
      expect(stderr).to.not.be.ok;
    });

    it('generates a project which passes linting', async () => {
      const linter = new ESLint({ useEslintrc: true });
      const results = await linter.lintFiles([destinationPath]);
      const errorCountTotal = results.reduce((sum, r) => sum + r.errorCount, 0);
      const warningCountTotal = results.reduce((sum, r) => sum + r.warningCount, 0);
      const prettyOutput = `\n\n${results.map(getFileMessages).join('\n')}\n\n`;
      expect(errorCountTotal, 'error count').to.equal(0, prettyOutput);
      expect(warningCountTotal, 'warning count').to.equal(0, prettyOutput);
    });

    // if type is app, run the following tests
    if (typeOfCreate === 'app') {
      it('generates a project with a custom-elements manifest', async () => {
        const { customElements } = JSON.parse(
          readFileSync(join(destinationPath, 'package.json'), 'utf8'),
        );
        expect(customElements).to.equal('custom-elements.json');
        const e = await exec('npm run analyze', { cwd: destinationPath });
        expect(e.stderr, stderr).to.not.be.ok;
        const manifest = JSON.parse(
          readFileSync(join(destinationPath, 'custom-elements.json'), 'utf8'),
        );
        expect(manifest.modules.length).to.equal(2);
      });
    }
  };
}

// Generate snapshots by looping through the createTypes map
for (const [type] of createTypes) {
  describe(`create ${type}`, create(type));
}

// Generates snapshots for wc-ts using an orgaization name
describe(`create wc-ts-org`, create('wc-ts', { organization: '@interzero-test' }));

// Generates snapshots for wc using a tag prefix
describe(`create wc-prefix`, create('wc', { tagPrefix: 'interzero-test' }));

// Generates snapshots for wc-ts using an orgaization name and a tag prefix
describe(
  `create wc-ts-org-prefix`,
  create('wc-ts', { organization: '@interzero-test', tagPrefix: 'interzero-test' }),
);

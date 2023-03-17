import { ScaffoldWc } from './src/ScaffoldWcExports.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('scaffold-wc')) {
  cElements.define('scaffold-wc', ScaffoldWc);
}

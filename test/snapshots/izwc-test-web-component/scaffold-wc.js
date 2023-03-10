import { ScaffoldWc } from './src/ScaffoldWc.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('interzero-test-scaffold-wc')) {
  cElements.define('interzero-test-scaffold-wc', ScaffoldWc);
}

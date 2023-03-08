import { ScaffoldWc } from './src/ScaffoldWc.js';

// Register the element with the browser
const cElementsDefineFn = customElements?.define || window?.customElements?.define;
const cElementsGetFn = customElements?.get || window?.customElements?.get;

if (!cElementsDefineFn || !cElementsGetFn) {
  throw new Error('Custom Elements not supported');
}

if (!cElementsGetFn('scaffold-wc')) {
  cElementsDefineFn('scaffold-wc', ScaffoldWc);
}

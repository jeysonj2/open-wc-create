import { ScaffoldWc } from './ScaffoldWc.js';

// Register the element with the browser
const cElementsDefineFn = customElements?.define || window?.customElements?.define;
const cElementsGetFn = customElements?.get || window?.customElements?.get;

if (!cElementsDefineFn || !cElementsGetFn) {
  throw new Error('Custom Elements not supported');
}

if (!cElementsGetFn('izwc-test-scaffold-wc')) {
  cElementsDefineFn('izwc-test-scaffold-wc', ScaffoldWc);
}

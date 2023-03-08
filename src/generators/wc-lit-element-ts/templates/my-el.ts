import { <%= className %> } from './<%= className %>.js';

// Register the element with the browser
const cElementsDefineFn = customElements?.define || window?.customElements?.define;
const cElementsGetFn = customElements?.get || window?.customElements?.get;

if (!cElementsDefineFn || !cElementsGetFn) {
  throw new Error('Custom Elements not supported');
}

if (!cElementsGetFn('<%= tagPrefix %><%= tagName %>')) {
  cElementsDefineFn('<%= tagPrefix %><%= tagName %>', <%= className %>);
}

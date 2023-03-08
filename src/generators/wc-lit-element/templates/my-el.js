import { <%= className %> } from './src/<%= className %>.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('<%= tagPrefix %><%= tagName %>')) {
  cElements.define('<%= tagPrefix %><%= tagName %>', <%= className %>);
}

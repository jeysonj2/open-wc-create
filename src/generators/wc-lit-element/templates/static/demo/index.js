import { html, render } from 'lit';
import '../<%= tagName %>.js';

const header = '@interzero Hello World!';
render(
  html`
    <<%= tagPrefix %><%= tagName %> .header=${header}>
      some light-dom
    </<%= tagPrefix %><%= tagName %>>
  `,
  document.querySelector('#demo')
);

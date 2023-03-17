import { html, render } from 'lit';
import '../scaffold-wc.js';

const header = '@interzero Hello World!';
render(
  html`
    <scaffold-wc .header=${header}>
      some light-dom
    </scaffold-wc>
  `,
  document.querySelector('#demo')
);
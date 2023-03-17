import { html, render } from 'lit';
import '../dist/src/scaffold-wc.js';

const header = '@interzero Hello World!';

render(
  html`
    <interzero-test-scaffold-wc .header=${header}>
      some light-dom
    </interzero-test-scaffold-wc>
  `,
  document.querySelector('#demo')
);

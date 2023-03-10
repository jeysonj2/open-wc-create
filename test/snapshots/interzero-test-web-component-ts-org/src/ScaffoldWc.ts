import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class ScaffoldWc extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--scaffold-wc-text-color, #000);
    }
  `;

  @property({ type: String }) header = 'Hey there';

  @property({ type: Number }) counter = 1;

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}

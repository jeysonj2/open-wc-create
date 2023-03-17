import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

// style import
import { style } from './style.css';

export class ScaffoldWc extends LitElement {
  static styles = style;

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

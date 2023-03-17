import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { ScaffoldWc } from '../src/ScaffoldWcExports.js';
import '../src/scaffold-wc.js';

describe('ScaffoldWc', () => {
  it('has a default header "Hey there" and counter 1', async () => {
    const el = await fixture<ScaffoldWc>(html`<interzero-test-scaffold-wc></interzero-test-scaffold-wc>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(1);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<ScaffoldWc>(html`<interzero-test-scaffold-wc></interzero-test-scaffold-wc>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(2);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<ScaffoldWc>(html`<interzero-test-scaffold-wc header="attribute header"></interzero-test-scaffold-wc>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<ScaffoldWc>(html`<interzero-test-scaffold-wc></interzero-test-scaffold-wc>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});

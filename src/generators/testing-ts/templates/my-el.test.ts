import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { <%= className %> } from '../src/<%= className %>Exports.js';
import '../src/<%= tagName %>.js';

describe('<%= className %>', () => {
  it('has a default header "Hey there" and counter 1', async () => {
    const el = await fixture<<%= className %>>(html`<<%= tagPrefix %><%= tagName %>></<%= tagPrefix %><%= tagName %>>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(1);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<<%= className %>>(html`<<%= tagPrefix %><%= tagName %>></<%= tagPrefix %><%= tagName %>>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(2);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<<%= className %>>(html`<<%= tagPrefix %><%= tagName %> header="attribute header"></<%= tagPrefix %><%= tagName %>>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<<%= className %>>(html`<<%= tagPrefix %><%= tagName %>></<%= tagPrefix %><%= tagName %>>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});

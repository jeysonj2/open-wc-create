import { html, TemplateResult } from 'lit';
import '../src/<%= tagName %>.js';

export default {
  title: '<%= className %>',
  component: '<%= tagName %>',
  argTypes: {
    header: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  counter?: number;
  textColor?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  header = 'Hello world',
  counter = 1,
  textColor,
  slot,
}: ArgTypes) => html`
  <<%= tagName %>
    style="--<%= tagName %>-text-color: ${textColor || 'black'}"
    .header=${header}
    .counter=${counter}
  >
    ${slot}
  </<%= tagName %>>
`;

export const Regular = Template.bind({});

export const CustomHeader = Template.bind({});
CustomHeader.args = {
  header: 'My header',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 3105,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};

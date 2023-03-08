import { html, TemplateResult } from 'lit';
import '../src/<%= tagName %>.js';

export default {
  title: '<%= className %>',
  component: '<%= tagPrefix %><%= tagName %>',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ title, backgroundColor = 'white' }: ArgTypes) => html`
  <<%= tagPrefix %><%= tagName %> style="--<%= tagName %>-background-color: ${backgroundColor}" .title=${title}></<%= tagPrefix %><%= tagName %>>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};

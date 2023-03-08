import { html } from 'lit';
import '../src/<%= tagName %>.js';

export default {
  title: '<%= className %>',
  component: '<%= tagPrefix %><%= tagName %>',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <<%= tagPrefix %><%= tagName %>
      style="--<%= tagName %>-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </<%= tagPrefix %><%= tagName %>>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};

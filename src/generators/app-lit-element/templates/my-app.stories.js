import { html } from 'lit';
import '../src/<%= tagName %>.js';

export default {
  title: '<%= className %>',
  component: '<%= tagPrefix %><%= tagName %>',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <<%= tagPrefix %><%= tagName %>
      style="--<%= tagName %>-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </<%= tagPrefix %><%= tagName %>>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};

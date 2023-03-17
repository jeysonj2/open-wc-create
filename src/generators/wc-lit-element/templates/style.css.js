import { css } from 'lit';

export const style = css`
:host {
  display: block;
  padding: 25px;
  color: var(--<%= tagName %>-text-color, #000);
}
`;

import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

const globalStyle = createGlobalStyle`
  /* Injecting normalize.css */
  ${styledNormalize}

  /* Adding fonts */

  /* Common & global styles */
  * {
    box-sizing: border-box;
  }
 
  body,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  input,
  textarea,
  select,
  button {
    font-family: 'Roboto', sans-serif;
    font-synthesis: none;
    -moz-font-feature-settings: 'kern';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000000;
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: none;
    }
  }

  textarea, select, input, button { outline: none; }

`

export default globalStyle

import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    color: inherit;
    margin: 0;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    overflow-wrap: break-word;
  }
  a {
    transition: 0.2s;
  }
  ::selection {
    background: var(--primary-color);
    color: var(--gray-extra-light);
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #191f45;
  }
  ul, ol {
    padding-inline-start: 1.5rem;
  }
  body {
    color: var(--text-color);
  }
  strong {
    font-weight: bold;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }

  body {
    background: var(--body-bg);
    font-weight: 400;
    font-family: var(--primary-font);
    font-size: 1.5rem;
    font-display: block !important;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }



  :root { 
    --gray-extra-light: #fafafa; 
    --gray-light: #c9d1d9;  
    --gray: #4b4c4c;
    --gray-dark: #3a3d4d;
    --primary-color: #111936;
    --secondary-color: #191f45;
    --thirdy-color: #c85517;
    --body-bg: #fff; 
    --bg-light: var(--gray-light);
    --bg-dark: var(--secondary-color);
    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);
    --primary-font: 'Open Sans', sans-serif;
    --secondary-font: 'Tinos', serif;
    --thirdy-font: 'Cousine', sans-serif;
    --link-color: var(--thirdy-color);
    --link-color-hover: var(--gray-dark);
    --text-color: var(--primary-color);
    --text-light: var(--gray-light);
    --text-dark: var(--gray-dark);
    --width-container: 1200px;
    --content-width: 680px;
    --space: 1em;
    --space-sm: 0.5em;
    --space-lg: 1.5em;
  }
`

export default GlobalStyle
  

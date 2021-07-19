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
  ::selection {
    background: var(--primary-color);
    color: var(--gray-extra-light);
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
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
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    font-family: var(--primary-font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    word-break: break-word;
    letter-spacing: normal;
    hyphens: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: none;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  :root { 
    --primary-color: #051129;
    --secondary-color: #A1B4EC;
    --thirdy-color: #c2c7c1;
    --body-bg: #0d1117; 
    --content-bg: #1b2026;
    --box-shadow: 0 6px 40px -6px rgb(79 86 91 / 29%);
    --gap: var(--space-sm);
    --border: var(--thirdy-coor);
    --border-radius: 4px;
    --primary-font: 'Inter', sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --secondary-font: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --thirdy-font: Cormorant Garamond, serif;
    --link-color-hover: var(--primary-color);
    --text-color: rgb(201, 209, 217);
    --width-container: 1200px;
    --content-width: 720px;
    --space: 2rem;
    --space-sm: 1rem;
    --space-lg: 3rem;
  }
`

export default GlobalStyle

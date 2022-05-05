import { createGlobalStyle, ThemeProvider } from "styled-components"

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
  }
  ::selection {
    background: var(--text-color);
    color: var(--body-bg);
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    color: var(--text-color);
  }
  a:focus-visible {  
    background-color: yellow;
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
    line-height: 1.5;
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
  body { 
    --primary-color: ${(props) => props.theme.primaryColor};
    --secondary-color: ${(props) => props.theme.secondaryColor};
    --thirdy-color: ${(props) => props.theme.thirdyColor};
    --body-bg: ${(props) => props.theme.bodyBg};
    --content-bg: ${(props) => props.theme.contentBg};
    --gray: #c9d1d9;
    --gap: var(--space-sm);
    --border: var(--thirdy-color);
    --border-radius: 4px;
    --primary-font: sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --secondary-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --thirdy-font: Cormorant Garamond, serif;
    --link-color-hover: ${(props) => props.theme.primaryColor};
    --text-color: ${(props) => props.theme.textColor};
    --width-container: 1200px;
    --content-width: 670px;
    --space: 2rem;
    --space-sm: 1rem;
    --space-lg: 4rem;
    --box-shadow: rgba(0, 0, 0, 0.13) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px;
  }

`

export default GlobalStyle

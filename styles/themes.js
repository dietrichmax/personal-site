import styled from "styled-components"

const Themes = createGlobalStyle`
default-theme {
    --gray-extra-light: #fafafa; 
    --gray-light: #eaeaea;  
    --gray: #a8bfce;
    --gray-dark: #3f3f40;
    --primary-color: #0a1924;
    --secondary-color: #c85517;
    --thirdy-color: #889baa;
    --body-bg: var(--primary-color); 
    --bg-light: var(--gray-light);
    --bg-dark: var(--gray-dark);
    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);
    --secondary-font: open sans,sans-serif;
    --link-color: var(--text-dark);
    --link-color-hover: var(--secondary-color);
    --text-color: var(--primary-color);
    --text-light: var(--gray-light);
    --text-dark: var(--gray-dark);
}

theme-winterfell {
    --gray-extra-light: #fafafa; 
    --gray-light: #eaeaea;  
    --gray: #a8bfce;
    --gray-dark: #3f3f40;
    --primary-color: #0a1924;
    --secondary-color: #c85517;
    --thirdy-color: #889baa;
    --body-bg: var(--primary-color); 
    --bg-light: var(--gray-light);
    --bg-dark: var(--gray-dark);
    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);
    --secondary-font: open sans,sans-serif;
    --link-color: var(--text-dark);
    --link-color-hover: var(--secondary-color);
    --text-color: var(--primary-color);
    --text-light: var(--gray-light);
    --text-dark: var(--gray-dark);

}`


export default Themes
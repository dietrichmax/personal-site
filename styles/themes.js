import styled from "styled-components"

const Themes = createGlobalStyle`
.default-theme {
    --gray-extra-light: #f4f6f9; 
    --gray-light: #c9d1d9;  
    --gray: #485055;
    --gray-dark: #3a3d4d;
    --primary-color: #111936;
    --secondary-color: #191f45;
    --thirdy-color: #c85517;
    --body-bg: #fff; 
    --bg-light: var(--gray-light);
    --bg-dark: var(--secondary-color);
    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);
    --thirdy-font: 'Cousine', sans-serif;
    --link-color: var(--thirdy-color);
    --link-color-hover: var(--gray);
    --text-color: var(--primary-color);
    --text-light: var(--gray-light);
    --text-dark: var(--gray-dark);
}

.theme-space {
    --gray-extra-light: #fafafa; 
    --gray-light: #eaeaea;  
    --gray: #a8bfce;
    --gray-dark: #3f3f40;
    --primary-color: #020720;
    --secondary-color: #c85517;
    --thirdy-color: #889baa;
    --body-bg: var(--primary-color); 
    --bg-light: var(--gray-light);
    --bg-dark: var(--gray-dark);
    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);
    --link-color: var(--text-dark);
    --link-color-hover: var(--secondary-color);
    --text-color: var(--primary-color);
    --text-light: var(--gray-light);
    --text-dark: var(--gray-dark);

}`


export default Themes
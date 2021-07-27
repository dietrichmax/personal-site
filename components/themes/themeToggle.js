import { useState, useEffect } from "react";
import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button`
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
  background-color: transparent;
`;

const Toggle = styled.span`
  color: var(--secondary-color);
  font-size: 1rem;
`

const ThemeToggle = () => {  

  //const darkMode = useDarkMode(false);

  const [activeTheme, setActiveTheme] = useState("light");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    savedTheme && setActiveTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme]);


  return (
    <ToggleButton   
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      <Toggle>{activeTheme === "light" ? <FaMoon/> : <FaSun/>}</Toggle>
    </ToggleButton>
  );
};

export default ThemeToggle;
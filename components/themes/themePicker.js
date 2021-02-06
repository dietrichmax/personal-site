import React from "react";
import ReactTooltip from "react-tooltip";
const lightThemes = new Set(["Blue", "Rhubarb and Custard"]);
const darkThemes = new Set(["Midnight Dreams", "Apocalypse"]);
const unlockables = new Set(["Fall Guys", "Matrix"]);
const themes = new Set([...darkThemes, ...lightThemes]);
const allThemes = [...lightThemes, ...darkThemes, ...unlockables];

const ThemePicker = ({ theme, setTheme, unlockedThemes, small }) => {
  const unlocked = new Set(unlockedThemes);
  console.log(theme)
  return (
    <div>
      <ReactTooltip />
      {allThemes.map((item, index) => {
        const themeVal = item.toLowerCase().replace(/ /g, '');
        if (themes.has(item) || (unlockables.has(item) && unlocked.has(item))) {
          return (
            <div key={item} className={`theme-${themeVal}`}>
              <button
                aria-label={`Theme ${item}`}
                onClick={() => setTheme(`theme-${themeVal}`)}
              >
                <div
                  data-tip={`${item}`}
                 >
                  {lightThemes.has(item) && (
                    <i></i>
                  )}
                  {darkThemes.has(item) && (
                    <i ></i>
                  )}
                  {unlockables.has(item) && (
                    <i></i>
                  )}
                </div>
              </button>
            </div>
          );
        } else {
          return (
            <div className={``}>
              <button
                disabled={true}
                aria-label={`Theme Locked`}
                >
                <div>
                  <i></i>
                </div>
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ThemePicker;
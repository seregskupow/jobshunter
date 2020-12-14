import { FunctionComponent, useState, useEffect } from "react";
import "./style.scss";
import { FaMoon, FaSun } from "react-icons/fa";
import Switch from "../Buttons/Switch";

const ThemeToggle: FunctionComponent<any> = () => {
  const [isDark, setDark] = useState(null);

  useEffect(() => {
    const theme: string = localStorage.getItem("theme");
    setDark(!!theme);
  }, []);
  const setDarkTheme = () => {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setDark(true);
  };
  const setLightTheme = () => {
    document.body.classList.remove("dark");
    localStorage.removeItem("theme");
    setDark(false);
  };
  const themeToggle = () => {
    if (document.body.classList.contains("dark")) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  };

  return (
    <div className="theme__toggle">
      <span>Тема </span>
      <button
        type="button"
        className="theme__btn dark__toggle btn__click"
        onClick={setDarkTheme}
      >
        <i>
          <FaMoon />
        </i>
      </button>
      {isDark !== null && (
        <Switch checked={isDark} callback={() => themeToggle()} />
      )}
      <button
        type="button"
        className="theme__btn light__toggle btn__click"
        onClick={setLightTheme}
      >
        <i>
          <FaSun />
        </i>
      </button>
    </div>
  );
};

export default ThemeToggle;

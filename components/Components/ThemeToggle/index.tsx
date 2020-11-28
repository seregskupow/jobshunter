import { FunctionComponent } from "react";
import "./style.scss";

const ThemeToggle: FunctionComponent<any> = () => {
  const themeToggle = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={themeToggle}
        className="theme-toggle__button"
      >
        Toggle theme
      </button>
    </>
  );
};

export default ThemeToggle;

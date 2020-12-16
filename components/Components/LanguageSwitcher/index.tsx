import { I18nContext } from "next-i18next";
import { useContext } from "react";
import { i18n } from "../../../i18n";
import Switch from "../Buttons/Switch";
import "./style.scss";

function LanguageSwitcher() {
  const {
    i18n: { language },
  } = useContext(I18nContext);
  const toggleLang = () => {
    if (language === "ua") i18n.changeLanguage("ru");
    else if (language === "ru") i18n.changeLanguage("ua");
  };
  return (
    <div className="language__switcher">
      <button
        type="button"
        className="language__btn btn__click"
        onClick={() => i18n.changeLanguage("ua")}
      >
        UA
      </button>
      <Switch checked={language === "ua"} callback={() => toggleLang()} />
      <button
        type="button"
        className="language__btn btn__click"
        onClick={() => i18n.changeLanguage("ru")}
      >
        RU
      </button>
    </div>
  );
}

export default LanguageSwitcher;

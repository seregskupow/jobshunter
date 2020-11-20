import { I18nContext } from "next-i18next";
import { useContext } from "react";
import { i18n } from "../../../i18n";
import "./style.scss";

function LanguageSwitcher() {
  const {
    i18n: { language },
  } = useContext(I18nContext);
  return (
    <div className="language-switcher">
      <fieldset>
        <input
          type="radio"
          checked={language === "ua" && true}
          id="lang-ukr"
          onChange={() => i18n.changeLanguage("ua")}
        />
        <label
          htmlFor="lang-ukr"
          className={`${language === "ua" ? "lang-toggled" : ""}`}
        >
          УКР
        </label>
        <input
          type="radio"
          checked={language === "ru" && true}
          id="lang-rus"
          onChange={() => i18n.changeLanguage("ru")}
        />
        <label
          htmlFor="lang-rus"
          className={`${language === "ru" ? "lang-toggled" : ""}`}
        >
          РУС
        </label>
        <span className="switch" />
      </fieldset>
    </div>
  );
}

export default LanguageSwitcher;

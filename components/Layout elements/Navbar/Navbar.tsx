import "./style.scss";

import { Link, withTranslation } from "../../../i18n";
import LanguageSwitcher from "../../Components/LanguageSwitcher";
import Logo from "../../Components/Logo";
import Search from "../../Components/Search";
import AccountBtn from "../../Components/AccountBtn";
import ThemeToggle from "../../Components/ThemeToggle";
import FormikSubmitButton from "../../Components/FormsComponents/FormikSubmitButton";

function Navbar({ t }) {
  return (
    <header>
      <div className="header__top">
        <div className="header__inner header__inner__top__inner">
          <ThemeToggle />
          <LanguageSwitcher />
          <ul className="hot-links">
            <li className="hot-links__item">
              <Link href="/blog/blog2">
                <a className="hot-links__item__link">🔥{t("navBar:hotLink")}</a>
              </Link>
            </li>
            <li className="hot-links__item">
              <Link href="/blog/bloggg">
                <a className="hot-links__item__link">
                  {t("navBar:placeResume")}
                </a>
              </Link>
            </li>
            <li className="hot-links__item">
              <AccountBtn />
            </li>
          </ul>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__inner header__inner__bottom__inner">
          <div className="bottom__inner__item">
            <Logo color="black" />
          </div>
          <div className="bottom__inner__item">
            <Search />
            <Search />
            <FormikSubmitButton isSubmitting={false} margin={0} text="Пошук" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default withTranslation("navBar")(Navbar);

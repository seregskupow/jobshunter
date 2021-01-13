import "./style.scss";

import { TFunction } from "next-i18next";
import { Link, withTranslation } from "../../../i18n";
import LanguageSwitcher from "../../Components/LanguageSwitcher";
import Logo from "../../Components/Logo";
import Search from "../../Components/Search";
import AccountBtn from "../../Components/AccountBtn";
import ThemeToggle from "../../Components/ThemeToggle";
import FormikSubmitButton from "../../Components/FormsComponents/FormikSubmitButton";

interface NavbarTypes {
  readonly t: TFunction;
}
const Navbar: React.FC<NavbarTypes> = ({ t }) => {
  return (
    <header>
      <div className="header__inner">
        <div className="header__left">
          <Logo color="white" />
          {/* <Search /> */}
        </div>
        <div className="header__right">
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
          </ul>
          <AccountBtn />
        </div>
      </div>
    </header>
  );
};

export default withTranslation("navBar")(Navbar);

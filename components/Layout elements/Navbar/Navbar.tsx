import "./style.scss";
import { useState } from "react";
import {Link, withTranslation} from '../../../i18n';
import { useRouter } from 'next/router'
import Router from 'next/router';
import LanguageSwitcher from "../../Components/LanguageSwitcher";
import SquareLink from "../../Components/SquareLink";
import Logo from "../../Components/Logo";
import Search from "../../Components/Search";
import AccountBtn from "../../Components/AccountBtn";
function Navbar({ t }) {
  const router = useRouter()
  const searchParam = router.query.search === undefined ? "Type search..." :router.query.search;
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearch] = useState(searchParam);
  let links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Vacancies",
      link: "/vacancylist",
    },
  ];
  const toggleOpen = () => setOpen(!isOpen);
  const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;
  const onInputChange = (value:string) =>{
    setSearch(value);
  }
  const onSearchSubmit = (e) =>{
    if (e.key === 'Enter') {
      Router.push({
        pathname: '/vacancylist',
        query: { limit:10,search: searchValue },
    })
    }
  }

  return (
    <header>
        <div className="header__top">
          <div className="header__inner header__inner__top__inner">
          <LanguageSwitcher/>
          <ul className="hot-links">
            <li className="hot-links__item"><Link href="/blog/blog2"><a className="hot-links__item__link">🔥{t("navBar:hotLink")}</a></Link></li>
            <li className="hot-links__item"><Link href="/blog/bloggg"><a className="hot-links__item__link">{t("navBar:placeResume")}</a></Link></li>
          <li className="hot-links__item"><AccountBtn/></li>
          </ul>
          </div>
        </div>
        <div className="header__bottom">
          <div className="header__inner header__inner__bottom__inner">
            <div className="bottom__inner__item">
            <Logo color={"white"}/>
            </div>
            <div className="bottom__inner__item">
            <Search />
            </div>
          </div>
        </div>
    </header>
  );
}

export default withTranslation('navBar')(Navbar);
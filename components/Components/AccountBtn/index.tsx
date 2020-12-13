/* eslint-disable no-use-before-define */
import "./style.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaMoon } from "react-icons/fa";
import { CgChevronDown } from "react-icons/cg";
import { RiAccountBoxLine, RiLogoutCircleRLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Link, withTranslation } from "../../../i18n";
import ThemeToggle from "../ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";

function AccountBtn({ t }) {
  const isAuth: boolean = useSelector((state) => state.user.isAuthenticated);
  const userName: string = useSelector((state) => state.user.userName);
  const userAvatar: string = useSelector((state) => state.user.userAvatar);
  const [imgError, setImgError] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onerror = () => {
      setImgError(true);
    };
    img.src = userAvatar;
  }, [userAvatar, setImgError]);

  const UserBtn = () => {
    return (
      <div className="user__logged">
        {userAvatar === "" || imgError === true ? (
          <ShortLogo userName={userName} />
        ) : (
          <img src={userAvatar} alt="" />
        )}
        <span>{userName}</span>
      </div>
    );
  };

  return (
    <div className="user__acount">
      <button
        type="button"
        className="user__acount__btn"
        onClick={() => setOpen(!open)}
      >
        {isAuth ? (
          <UserBtn />
        ) : (
          <i>
            <FaUser />
          </i>
        )}
        <i>
          <CgChevronDown />
        </i>
      </button>
      <AnimatePresence exitBeforeEnter>
        {open && <DropdownMenu isAuth={isAuth} />}
      </AnimatePresence>
    </div>
  );
}
export default withTranslation()(AccountBtn);
interface DropdownItemProps {
  link: string;
  icon: any;
  children: React.ReactNode;
}
function DropdownMenu({ isAuth }: { isAuth: boolean }) {
  function DropdownItem({ link, icon, children }: DropdownItemProps) {
    return (
      <Link href={link}>
        <a className="dropdown__item">
          {icon}
          <span>{children}</span>
        </a>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.1 }}
      className="user__dropdown"
    >
      {isAuth && (
        <DropdownItem link="/account" icon={<RiAccountBoxLine />}>
          Account
        </DropdownItem>
      )}
      <DropdownItem link="#" icon={<FaMoon />}>
        <ThemeToggle />
      </DropdownItem>
      <div className="dropdown__item">
        <MdLanguage /> Укр <LanguageSwitcher /> Ру
      </div>
      {isAuth ? (
        <DropdownItem link="#" icon={<RiLogoutCircleRLine />}>
          Logout
        </DropdownItem>
      ) : (
        <DropdownItem link="/auth/login" icon={<RiLogoutCircleRLine />}>
          Login/Register
        </DropdownItem>
      )}
    </motion.div>
  );
}

type shortLogo = {
  userName: string;
};
function ShortLogo({ userName }: shortLogo) {
  // Получение первых букв юзернейма
  const wordsFromUsername: Array<string> = userName
    .split(" ")
    .map((item) => item.charAt(0));
  return (
    <p>
      {wordsFromUsername[0]}
      {wordsFromUsername[1]}
    </p>
  );
}

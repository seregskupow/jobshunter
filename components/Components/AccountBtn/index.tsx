/* eslint-disable no-use-before-define */
import "./style.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { CgChevronDown } from "react-icons/cg";
import { RiAccountBoxLine, RiLogoutCircleRLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillFormatPainter } from "react-icons/ai";
import { Link, withTranslation } from "../../../i18n";
import ThemeToggle from "../ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";

function AccountBtn({ t }) {
  const isAuth: boolean = useSelector((state) => state.user.isAuthenticated);
  const userName: string = useSelector((state) => state.user.userName);
  const userAvatar: string = useSelector((state) => state.user.userAvatar);

  const [imgError, setImgError] = useState(false);
  const [open, setOpen] = useState(false);

  const accBtn = useRef<HTMLDivElement>(null);
  const dropdown = useRef();
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  useEffect(() => {
    const img = new Image();
    img.onerror = () => {
      setImgError(true);
    };
    img.src = userAvatar;
  }, [userAvatar, setImgError]);

  const handleClick = (e) => {
    if (accBtn.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

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
    <div className="user__acount" ref={accBtn}>
      <button
        type="button"
        className="user__acount__btn btn__click"
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
          <CgChevronDown data-open={open} />
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
  link?: string;
  icon: any;
  children: React.ReactNode;
}
const DropdownMenu = ({ isAuth }: { isAuth: boolean }) => {
  const DropdownItem: React.FC<DropdownItemProps> = ({
    link,
    icon,
    children,
  }) => {
    if (link) {
      return (
        <Link href={link}>
          <a className="dropdown__item">
            <span className="item__left__icon">{icon}</span>
            <span>{children}</span>
          </a>
        </Link>
      );
    }
    return (
      <div className="dropdown__item">
        <span className="item__left__icon">{icon}</span>
        {children}  
      </div>
    );
  };

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
      <DropdownItem icon={<AiFillFormatPainter />}>
        <ThemeToggle />
      </DropdownItem>
      <DropdownItem icon={<MdLanguage />}>
        <span>Мова</span> <LanguageSwitcher />
      </DropdownItem>
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
};

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

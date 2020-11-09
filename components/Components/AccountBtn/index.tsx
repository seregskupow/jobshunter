import "./style.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "../../../i18n";
import { FaUser } from "react-icons/fa";
import { CgChevronDown } from "react-icons/cg";
export default function AccountBtn() {
  const isAuth: boolean = useSelector((state) => state.user.isAuthenticated);
  const userName: string = useSelector((state) => state.user.userName);
  const userAvatar: string = useSelector((state) => state.user.userAvatar);
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onerror = () => {
      setImgError(true);
      return;
    };
    img.src = userAvatar;
  }, [userAvatar, setImgError]);
  const onImageError = () => {
    setImgError(true);
    console.log("img eror");
  };
  if (!isAuth) {
    return (
      <Link href="/auth">
        <a>
          <div className="user__not-auth">
            <FaUser />
          </div>
        </a>
      </Link>
    );
  } else {
    return (
      <div className="user__acount__dropdown">
        <div className="user__profile__logo">
          {userAvatar === "" || imgError === true ? (
            <ShortLogo userName={userName} />
          ) : (
            <img src={userAvatar} alt="" />
          )}
        </div>
        <div className="user__account__btn">
          <span>
            <CgChevronDown />
          </span>
        </div>
      </div>
    );
  }
}
type shortLogo = {
  userName: string;
};
function ShortLogo({ userName }: shortLogo) {
  //Получение первых букв юзернейма
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

import "./style.scss";
import { signIn, signOut, useSession } from "next-auth/client";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaTwitter } from "react-icons/fa";

type AuthButtonProps = {
  provider: "google" | "facebook" | "twitter";
};
const AuthButton = ({ provider }: AuthButtonProps) => {
  let icon: any;
  switch (provider) {
    case "google":
      icon = <FcGoogle />;
      break;
    case "facebook":
      icon = <FaFacebookSquare />;
      break;
    case "twitter":
      icon = <FaTwitter />;
    default:
      break;
  }
  return (
    <button onClick={() => signIn(provider)} className="auth-button">
      <span className="auth-button__icon">{icon}</span>
      <span className="auth-button__text">Sign in with {provider}</span>
    </button>
  );
};

export default AuthButton;

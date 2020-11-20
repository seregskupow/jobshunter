import "./style.scss";
import { FunctionComponent } from "react";
import { Link } from "../../../i18n";

type linkType = {
  // eslint-disable-next-line react/require-default-props
  color?: "black" | "white";
};

const Logo: FunctionComponent<any> = ({ color = "white" }: linkType) => {
  return (
    <Link href="/">
      <a className={`logo logo_${color}`}>
        <span>H</span>iгer
      </a>
    </Link>
  );
};
export default Logo;

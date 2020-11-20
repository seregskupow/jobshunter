import "./style.scss";
import { FunctionComponent } from "react";
import { Link } from "../../../i18n";

type MyLink = {
  href: string;
  color: "blue" | "black" | "white";
  text: string;
};
const MyLink: FunctionComponent<any> = ({ href, color, text }: MyLink) => {
  return (
    <Link href={href}>
      <a className={`underline__link underline__link_${color}`}>{text}</a>
    </Link>
  );
};
export default MyLink;

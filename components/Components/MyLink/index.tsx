import './style.scss';
import {Link} from '../../../i18n';

type MyLink = {
    href:string,
    color:"blue" | "black" | "white",
    text:string
}
export default function MyLink({href,color,text}:MyLink){
    return (
        <Link href = {href}>
            <a className = {`underline__link underline__link_${color}`}>
                {text}
            </a>
        </Link>
    )
}
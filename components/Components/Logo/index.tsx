import './style.scss'
import {Link} from '../../../i18n';
type linkType ={
    color?:"black" | "white",
}

export default function Logo({color = "white"}:linkType) {
    return (
        <Link href="/">
            <a className={`logo logo_${color}`}>
                <span>H</span>irer
            </a>
        </Link>
    )
}

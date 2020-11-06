import './style.scss'
import {Link} from '../../../i18n';
type linkType ={
    to:string,
    color?:"black" | "white",
    title:string
}
export default function SquareLink({to="#",color="white",title="link"}:linkType){
    return(
        <Link href={to}>
            <a href={to} className={`square-link square-link_${color}`}>
                {title}
            </a>
        </Link>
    )
}
import { ReactNode } from 'react';
import './style.scss';
type Props = {
    children: ReactNode,
    width?:number | "auto" | "100%",
    height?:number | "auto" | "100%",
    align?:"flex-start" | "flex-end" | "center" | "baseline" | "stretch" | "unset"

}
export default function CenteredContainer({children,width = "100%",height = "auto", align = "unset"}:Props){
    return(
        <div className="centered__container" style={{width:'100%',maxWidth:width.toString()+"px",height:height.toString()+"%",alignItems:align}}>
            {children}
        </div>
    )
}
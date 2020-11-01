import { ReactChildren, ReactChild } from 'react';
import './style.scss';
type Props = {
    children: ReactChild | ReactChildren,
    width:number | "100%"

}
export default function CenteredContainer({children,width = "100%"}){
    return(
        <div className="centered__container" style={{width:'100%',maxWidth:width}}>
            {children}
        </div>
    )
}
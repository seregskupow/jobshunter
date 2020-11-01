import './style.scss';
export default function GridColumn(props){
    return(
        <div className="grid__container__column">
            {props.children}
        </div>
    )
}
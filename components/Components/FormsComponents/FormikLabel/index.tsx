import './style.scss'
type Label = {
    text:string,
    fontSize:number
}
export default function FormikLabel({text,fontSize}:Label){
    return (
        <span className="formik__label" style = {{fontSize:fontSize.toString() + "rem"}}>
            {text}
        </span>
    )
}
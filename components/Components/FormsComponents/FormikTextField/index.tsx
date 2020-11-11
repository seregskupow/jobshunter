import './style.scss';
import {Field,ErrorMessage} from 'formik';
type fieldInputs = {
    type:string,
    name:string,
    margin?:number
}
export default function FormikTextField({type,name,margin = 6}:fieldInputs){
    return (
        <div className="formik__text__field" style={{margin:`${margin.toString() + "px"} 0px`}}>
            <Field className = "form__field" type={type} name={name} />
            <ErrorMessage className = "form__input__error" name={name} component="div" />
        </div>
        
    )
}
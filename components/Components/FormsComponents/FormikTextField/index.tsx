import "./style.scss";
import { Field, ErrorMessage, useField } from "formik";

type fieldInputs = {
  type: string;
  name: string;
  margin?: number;
};
const FormikTextField: React.FC<fieldInputs> = ({ type, name, margin = 6 }) => {
  const [field, meta] = useField(name);
  const errorClass = meta.error && meta.touched ? "field__error" : "";
  return (
    <div
      className="formik__text__field"
      style={{ margin: `${`${margin.toString()}px`} 0px` }}
    >
      <div className={`form__field__wrapper ${errorClass}`}>
        <Field className="form__field" type={type} name={name} />
      </div>
      <ErrorMessage
        className="form__input__error"
        name={name}
        component="div"
      />
    </div>
  );
};
export default FormikTextField;

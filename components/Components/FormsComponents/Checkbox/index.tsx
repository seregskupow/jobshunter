/* eslint-disable react/jsx-props-no-spreading */
import "./style.scss";
import { Field, FieldProps } from "formik";

interface Props {
  name: string;
  value: string | number;
  label: string;
}

const Checkbox: React.FC<Props> = ({ value, name, label, ...props }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <label className="checkbox btn__click">
          {label}
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(value)}
            onChange={() => {
              if (field.value.includes(value)) {
                const nextValue = field.value.filter((val) => val !== value);
                form.setFieldValue(name, nextValue);
              } else {
                const nextValue = field.value.concat(value);
                form.setFieldValue(name, nextValue);
              }
            }}
          />
          <span className="checkmark"></span>
        </label>
      )}
    </Field>
  );
};

export default Checkbox;

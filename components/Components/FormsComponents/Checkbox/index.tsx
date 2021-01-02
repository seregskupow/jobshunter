/* eslint-disable react/jsx-props-no-spreading */
import "./style.scss";
import { Field, FieldProps, useFormikContext } from "formik";

interface Props {
  name: string;
  value: string | number;
  label: string;
  delay: number;
}

const Checkbox: React.FC<Props> = ({ value, name, delay, label, ...props }) => {
  const { submitForm } = useFormikContext();
  const submitOnChange = () => {
    setTimeout(submitForm, delay);
  };
  return (
    <Field name={name}>
      {({ field, form }) => (
        <label className="checkbox">
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
              submitOnChange();
            }}
          />
          <span className="checkmark"></span>
        </label>
      )}
    </Field>
  );
};

export default Checkbox;

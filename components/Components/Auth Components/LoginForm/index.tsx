import "./style.scss";
import '../inputs.scss';
import { useDispatch } from "react-redux";
import { signIn } from "../../../../redux/actions/authAction";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import ProviderButtons from "../ProvidersButtons";
export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="login__form">
      <div className="login__form__left">
        <div>
          <h1>HIRER</h1>
          <h2>Найди работу мечты</h2>
        </div>
      </div>
      <div className="login__form__right">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {email:""};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="auth__form"> 
              <Field className = "form__input" type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Field className = "form__input" type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <ProviderButtons />
      </div>
    </div>
  );
}

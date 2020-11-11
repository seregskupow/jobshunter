import "./style.scss";
import '../inputs.scss';
import { useDispatch } from "react-redux";
import { signIn } from "../../../../redux/actions/authAction";
import { useRouter } from "next/router";
import { Formik, Form} from "formik";
import { TFunction } from 'next-i18next';
import * as Yup from 'yup';
import ProviderButtons from "../ProvidersButtons";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikSubmitButton from "../../FormsComponents/FormikSubmitButton";
import LanguageSwitcher from "../../LanguageSwitcher";
import Logo from "../../Logo";
import FormikLabel from "../../FormsComponents/FormikLabel";
import MyLink from "../../MyLink";
export default function LoginForm({t}: { readonly t: TFunction }) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="login__form">
      <div className="login__form__left">
        <div>
          <Logo />
          <h2>{t("auth:leftSlogan")}</h2>
        </div>
      </div>
      <div className="login__form__right">
        <h1 className="login__title">{t("auth:loginTitle")}</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={() => ({})}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete={"off"}  className="auth__form">
              <FormikLabel text={t("auth:emailLabel")} fontSize={2}/> 
              <FormikTextField type={"text"} name = {"email"} />
              <FormikLabel text={t("auth:passwordLabel")} fontSize={2}/> 
              <FormikTextField type={"password"} name = {"password"} />
              <FormikSubmitButton text={t("auth:loginButton")} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
        <ProviderButtons />
        <div>
          <FormikLabel text={t("auth:noAccount")} fontSize={2}/>
          <MyLink href={"/auth/register"} color={"blue"} text={t("auth:registerLink")}/>
          </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

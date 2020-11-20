import "./style.scss";
import "../inputs.scss";
import {useEffect} from 'react'
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import axios from 'axios';
import { TFunction } from "next-i18next";
import * as yup from "yup";
import ProviderButtons from "../ProvidersButtons";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikSubmitButton from "../../FormsComponents/FormikSubmitButton";
import LanguageSwitcher from "../../LanguageSwitcher";
import Logo from "../../Logo";
import FormikLabel from "../../FormsComponents/FormikLabel";
import MyLink from "../../MyLink";
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../../../redux/actions/authAction';
export default function LoginForm({ t }: { readonly t: TFunction }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(state=>state.user.isLoading);
  const error = useSelector(state => state.user.errorMessage)
  useEffect(() => {
   
  }, [isLoading])
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t("auth:invalidEmail"))
      .required(t("auth:invalidEmail")),
    password: yup
      .string()
      .min(8, t("auth:invalidPassword"))
      .max(20, t("auth:invalidPassword"))
      // .matches(
      //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      //   t("auth:invalidPassword")
      // )
      .required(t("auth:invalidPassword")),
  });
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
          initialValues={{ email: "sejiso8040@septicvernon.com", password: "saddsadsadsaddds" }}
          validationSchema = {validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            dispatch(signIn(values))
            isLoading === false && setSubmitting(false)
            //cookie test request
            const testResponse = await fetch('http://localhost:5000/test');
            console.log(await testResponse.json())
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete={"off"} className="auth__form">
              {error && <h2 style={{color:'red'}}>{error}</h2>}
              <FormikLabel text={t("auth:enterEmail")} fontSize={2} />
              <FormikTextField type={"text"} name={"email"} />
              <FormikLabel text={t("auth:enterPassword")} fontSize={2} />
              <FormikTextField type={"password"} name={"password"} />
              <FormikSubmitButton
                text={t("auth:loginButton")}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
        <ProviderButtons />
          <FormikLabel text={t("auth:noAccount")} fontSize={2} />
          <MyLink
            href={"/auth/register"}
            color={"blue"}
            text={t("auth:registerLink")}
          />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

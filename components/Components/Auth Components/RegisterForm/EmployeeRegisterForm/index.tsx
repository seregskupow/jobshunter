import "./style.scss";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import CenteredContainer from "../../../../Layout elements/CenteredContainer";
import ProviderButtons from "../../ProvidersButtons";
import FormikTextField from "../../../FormsComponents/FormikTextField";
import FormikSubmitButton from "../../../FormsComponents/FormikSubmitButton";
import LanguageSwitcher from "../../../LanguageSwitcher";
import FormikLabel from "../../../FormsComponents/FormikLabel";
import MyLink from "../../../MyLink";
import { TFunction } from "next-i18next";
import * as yup from "yup";

export default function EmployeeRegisterForm({ t }: { readonly t: TFunction }) {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t("auth:invalidEmail"))
      .required(t("auth:invalidEmail")),
    password: yup
      .string()    
      .min(8, t("auth:invalidPassword"))
      .max(15, t("auth:invalidPassword"))
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,t("auth:invalidPassword"))
      .required(t("auth:invalidPassword")),
    passwordConfirmation: yup
      .string()
      .min(8, t("auth:invalidPassword"))
      .max(15, t("auth:invalidPassword"))
      .oneOf([yup.ref("password"), null], t("auth:invalidPassword"))
      .required(t("auth:invalidPassword"))
  });
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.3 }}
    >
      <CenteredContainer direction={"column"} align={"center"}>
        <Formik
          validateOnChange={true}
          initialValues={{ email: "", password: "",passwordConfirmation:"" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 3000);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form autoComplete={"off"} className="auth__form">
              <FormikLabel text={t("auth:enterEmail")} fontSize={2} />
              <FormikTextField type={"text"} name={"email"} />
              <FormikLabel text={t("auth:enterPassword")} fontSize={2} />
              <FormikTextField type={"password"} name={"password"} />
              <FormikLabel text={t("auth:repeatPassword")} fontSize={2} />
              <FormikTextField
                type={"password"}
                name={"passwordConfirmation"}
              />
              <FormikSubmitButton
                text={t("auth:registerLink")}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
        <ProviderButtons />
        <LanguageSwitcher />
      </CenteredContainer>
    </motion.div>
  );
}

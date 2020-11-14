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

export default function EmployerRegisterForm({ t }: { readonly t: TFunction }) {
  return (
      <motion.div
        initial={{ x:"-100%" }}
        animate={{x:"0%" }}
        transition={{ duration: 0.3 }}
      >
        <CenteredContainer direction={"column"} align={"center"}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={() => ({})}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 3000);
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete={"off"} className="auth__form">
                <FormikLabel text={t("auth:enterFIO")} fontSize={2} />
                <FormikTextField type={"text"} name={"email"} />
                
                <FormikLabel text={t("auth:enterCompanyName")} fontSize={2} />
                <FormikTextField type={"text"} name={"email"} />

                <FormikLabel text={t("auth:enterCompanyWebsite")} fontSize={2} />
                <FormikTextField type={"text"} name={"email"} />
                
                <FormikLabel text={t("auth:enterEmail")} fontSize={2} />
                <FormikTextField type={"email"} name={"email"} />
                
                <FormikLabel text={t("auth:enterPassword")} fontSize={2} />
                <FormikTextField type={"password"} name={"password"} />
                
                <FormikLabel text={t("auth:repeatPassword")} fontSize={2} />
                <FormikTextField type={"password"} name={"password"} />
                
                <FormikSubmitButton
                  text={t("auth:registerLink")}
                  isSubmitting={isSubmitting}
                />
              </Form>
            )}
          </Formik>
          <LanguageSwitcher />
        </CenteredContainer>
      </motion.div>

  );
}

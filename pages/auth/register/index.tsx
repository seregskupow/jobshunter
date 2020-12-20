import { TFunction } from "next-i18next";
import { motion } from "framer-motion";
import { withTranslation } from "../../../i18n";
import CenteredContainer from "../../../components/Layout elements/CenteredContainer";
import AuthLayout, {
  variants,
} from "../../../components/Layout elements/AuthLayout";
import RegisterForm from "../../../components/Components By Page/Auth Components/RegisterForm";

function Register({ t }: { readonly t: TFunction }) {
  return (
    <motion.div
      key="register"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <CenteredContainer align="center" height={100}>
        <RegisterForm t={t} />
      </CenteredContainer>
    </motion.div>
  );
}
Register.Layout = AuthLayout;
Register.getInitialProps = async () => {
  return {
    namespacesRequired: ["auth"],
  };
};
export default withTranslation()(Register);

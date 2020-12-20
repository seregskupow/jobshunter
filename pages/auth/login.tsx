import { TFunction } from "next-i18next";
import { motion } from "framer-motion";
import { withTranslation } from "../../i18n";
import CenteredContainer from "../../components/Layout elements/CenteredContainer";
import WhitePanel from "../../components/Layout elements/WhitePanel";
import AuthLayout, {
  variants,
} from "../../components/Layout elements/AuthLayout";
import LoginForm from "../../components/Components By Page/Auth Components/LoginForm";

const Login = ({ t }: { readonly t: TFunction }) => {
  return (
    <motion.div
      key="login"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <CenteredContainer align="center" height={100}>
        <WhitePanel width={100} padding={0}>
          <LoginForm t={t} />
        </WhitePanel>
      </CenteredContainer>
    </motion.div>
  );
};
Login.Layout = AuthLayout;
Login.getInitialProps = async () => {
  return {
    namespacesRequired: ["auth"],
  };
};
export default withTranslation()(Login);

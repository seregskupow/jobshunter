import {withTranslation} from '../../i18n';
import { TFunction } from 'next-i18next';
import CenteredContainer from "../../components/Layout elements/CenteredContainer";
import WhitePanel from "../../components/Layout elements/WhitePanel";
import AuthLayout from "../../components/Layout elements/AuthLayout";
import LoginForm from "../../components/Components/Auth Components/LoginForm";
const Login = ({t}: { readonly t: TFunction }) => {
  return (
    <>
      <CenteredContainer align={"center"} height={100}>    
        <WhitePanel width={100} padding={0}>
            <LoginForm t={t}/>
        </WhitePanel>
      </CenteredContainer>
    </>
  );
};
Login.Layout = AuthLayout;
Login.getInitialProps = async () =>{
  return{
    namespacesRequired:['auth']
  }
}
export default withTranslation()(Login);

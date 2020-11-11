import {withTranslation} from '../../../i18n';
import { TFunction } from 'next-i18next';
import CenteredContainer from "../../../components/Layout elements/CenteredContainer";
import WhitePanel from "../../../components/Layout elements/WhitePanel";
import AuthLayout from "../../../components/Layout elements/AuthLayout";
function Register(){
    return (
        <>
      <CenteredContainer align={"center"} height={100}>    
        <WhitePanel width={100} padding={0}>
           а
        </WhitePanel>
      </CenteredContainer>
    </>
    )
}
Register.Layout = AuthLayout;
Register.getInitialProps = async () =>{
  return{
    namespacesRequired:['auth']
  }
}
export default withTranslation()(Register);
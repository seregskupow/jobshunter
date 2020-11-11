import CenteredContainer from "../../components/Layout elements/CenteredContainer";
import WhitePanel from "../../components/Layout elements/WhitePanel";
import AuthLayout from "../../components/Layout elements/AuthLayout";
import LoginForm from "../../components/Components/Auth Components/LoginForm";
const Login = () => {
  return (
    <>
      <CenteredContainer align={"center"} height={100}>    
        <WhitePanel width={100} padding={0}>
            <LoginForm />
        </WhitePanel>
      </CenteredContainer>
    </>
  );
};
Login.Layout = AuthLayout;
export default Login;

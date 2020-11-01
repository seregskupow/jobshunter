import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import MainContainer from "../components/Layout elements/MainContainer";
import GridContainer from "../components/Layout elements/GridContainer/GridContainer";
import GridColumn from "../components/Layout elements/GridContainer/GridColumn";
import CenteredContainer from "../components/Layout elements/CenteredContainer";
const auth = () => {
  const router = useRouter();
  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <MainContainer>
      <h1>sign in/sign up</h1>

      <CenteredContainer>
        <div className="card bg-dark">
          <div
            className="card-body d-flex flex-column justify-content-around"
            style={{ height: "15rem" }}
          >
            <GoogleLogin
              clientId={process.env.GOOGLE_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId={process.env.FACEBOOK_ID}
              fields="name,email,picture"
              callback={responseFacebook}
            />
          </div>
        </div>
      </CenteredContainer>
    </MainContainer>
  );
};

export default auth;

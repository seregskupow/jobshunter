import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
const auth = () => {
  const router = useRouter();
  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col col-sm-10 col-md-6">
            <>
              Not signed in <br />
              <div className="card bg-dark">
                <div
                  className="card-body d-flex flex-column justify-content-around"
                  style={{ height: "15rem" }}
                >
                  <GoogleLogin
                    clientId="476408107864-3v07qteuc3rb9io07i2k4e74g8snt38c.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <FacebookLogin
                    appId="1507715582745149y"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                  />
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default auth;

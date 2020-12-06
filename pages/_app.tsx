import "../styles/main.scss";
// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react";
import { Provider } from "react-redux";
// eslint-disable-next-line no-use-before-define
import { useStore, initializeStore } from "../redux/store";
import { appWithTranslation } from "../i18n";
import myGet from "./api/myGet";
import { loginUser } from "../redux/actions/authAction";

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  useEffect(() => {
    const theme: string = localStorage.getItem("theme");
    document.body.classList.add(theme);
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} key={Math.random()} />
      </Layout>
    </Provider>
  );
};
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  try {
    const user = await myGet("http://localhost:5000/checkauth", ctx);
    if (user && user.isAuth) {
      dispatch(loginUser(user));
    }
  } catch (error) {}
  return {
    pageProps: { initialReduxState: reduxStore.getState() },
  };
};
export default appWithTranslation(MyApp);

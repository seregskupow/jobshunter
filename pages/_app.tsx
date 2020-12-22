import "../styles/main.scss";
// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react";
import { Provider } from "react-redux";
// eslint-disable-next-line no-use-before-define
import { SWRConfig } from "swr";
import axios from "axios";
import { useStore, initializeStore } from "../redux/store";
import { appWithTranslation } from "../i18n";
import myGet from "./api/myGet";
import { loginUser } from "../redux/actions/authAction";

axios.defaults.baseURL = "http://localhost:5000";

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  console.log("_ap");

  console.log(store.getState());

  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  useEffect(() => {
    const theme: string = localStorage.getItem("theme");
    document.body.classList.add(theme);
  }, []);
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          axios(url, {
            withCredentials: true,
          }).then((r) => r.data),
      }}
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} key={Math.random()} />
        </Layout>
      </Provider>
    </SWRConfig>
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
    const resp = await fetch(`http://localhost:5000/checkauth`, {
      headers: {
        cookie: ctx.req?.headers.cookie,
      },
      credentials: "include",
    });
    const user = await resp.json();
    if (user && user.isAuth) {
      dispatch(loginUser(user));
    }
  } catch (error) {}
  return {
    pageProps: { initialReduxState: reduxStore.getState() },
  };
};
export default appWithTranslation(MyApp);

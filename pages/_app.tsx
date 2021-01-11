import "../styles/main.scss";
// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react";
import { Provider } from "react-redux";
// eslint-disable-next-line no-use-before-define
import { SWRConfig } from "swr";
import axios from "axios";
import { useStore, initializeStore } from "../redux/store";
import { appWithTranslation, Router } from "../i18n";
import { loginUser } from "../redux/actions/authAction";
import checkAuth from "../helpers/checkAuth";

axios.defaults.baseURL = "http://localhost:5000";

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const { dispatch } = store;
  const { isAuthenticated } = store.getState().user;
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  useEffect(() => {
    if (!isAuthenticated) checkAuth(dispatch);
    const theme: string = localStorage.getItem("theme");
    document.body.classList.add(theme);
  }, []);
  const customFetcher = (url: string) => {
    return axios(url, {
      withCredentials: true,
    })
      .then((r) => r.data)
      .catch((error) => {
        if (error.response.status === 401) {
          Router.push({
            pathname: "/auth/login",
          });
        }
      });
  };
  return (
    <SWRConfig
      value={{
        fetcher: customFetcher,
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
    // const resp = await fetch(`http://localhost:5000/checkauth`, {
    //   headers: {
    //     cookie: ctx.req?.headers.cookie,
    //   },
    //   credentials: "include",
    // });
    const { data } = await axios(`http://localhost:5000/checkauth`, {
      headers: {
        cookie: ctx.req?.headers.cookie,
      },
      withCredentials: true,
    });
    if (data && data.isAuth) {
      dispatch(loginUser(data));
    }
  } catch (error) {}
  return {
    pageProps: {
      initialReduxState: reduxStore.getState(),
    },
  };
};
export default appWithTranslation(MyApp);

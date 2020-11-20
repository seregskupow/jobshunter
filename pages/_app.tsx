import "../styles/main.scss";
import { Provider } from "react-redux";
// eslint-disable-next-line no-use-before-define
import React from "react";
import { useStore, initializeStore } from "../redux/store";
import { appWithTranslation } from "../i18n";

import { loginUser } from "../redux/actions/authAction";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=1`
  );
  const { email } = await res.json();
  dispatch(
    loginUser({
      userName: email,
      userAvatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQANrTXnjdRhO_W-elE9zX1R2bTzC6rVMeQBw&usqp=CAU",
    })
  );
  //  await dispatch({
  //     type:"AUTH_SIGN_IN",
  //     payload:{userName:"serega Kovalev", isAuthenticated: !!res,userAvatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQANrTXnjdRhO_W-elE9zX1R2bTzC6rVMeQBw&usqp=CAU'}
  //   })

  return {
    pageProps: { initialReduxState: reduxStore.getState() },
  };
};
export default appWithTranslation(MyApp);

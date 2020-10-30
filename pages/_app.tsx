import "../styles/main.scss";
import { Provider } from "react-redux";
import React from "react";
import { useStore } from '../redux/store';
import Layout from "../components/Layout elements/Layout/Layout";

export default function MyApp({ Component, pageProps}) {
  const store = useStore(pageProps.initialReduxState)
  return(
  <Provider  store = {store}>
    <Layout>
    <Component {...pageProps} />
    </Layout>
  </Provider>
  );
}


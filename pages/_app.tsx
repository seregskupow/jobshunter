import "../styles/main.scss";
import { Provider } from "react-redux";
import React from "react";
import { useStore } from '../redux/store';
import Layout from "../components/Layout elements/Layout/Layout";
import { appWithTranslation } from '../i18n'

function MyApp({ Component, pageProps}) {
  const store = useStore(pageProps.initialReduxState)
  return(
  <Provider  store = {store}>
    <Layout>
    <Component {...pageProps} />
    </Layout>
  </Provider>
  );
}
MyApp.getInitialProps  = async ({Component,ctx})=>{
  let pageProps = {}
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx)
  }
  return{
    pageProps
  }
}
export default appWithTranslation(MyApp);
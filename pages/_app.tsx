import "../styles/main.scss";
import { Provider } from "react-redux";
import React from "react";
import { useStore } from '../redux/store';
import Layout from "../components/Layout elements/Layout/Layout";
import { appWithTranslation } from '../i18n'
import {initializeStore} from '../redux/store';

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
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore
   await dispatch({
    type:"AUTH_SIGN_IN",
    payload:{userName:"serega Kovalev", isAuthenticated: true,userAvatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQANrTXnjdRhO_W-elE9zX1R2bTzC6rVMeQBw&usqp=CAU'}
  })
  return{
    pageProps: { initialReduxState: reduxStore.getState()}
  }
}
export default appWithTranslation(MyApp);
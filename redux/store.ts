import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { useMemo } from 'react'
import rootReducer from './reducers/rootReducer';
import {DEFAULT_STATE} from './reducers/authReducer';

const INITIAL_STATE = {
  user:DEFAULT_STATE
}
function initStore(initialState = INITIAL_STATE) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
  }
  let store;
  export const initializeStore = (preloadedState = INITIAL_STATE) => {
    let _store = store ?? initStore(preloadedState)
  
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
      _store = initStore({
        ...store.getState(),
        ...preloadedState,
      })
      // Reset the current store
      store = undefined
    }
  
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
  
    return _store
  }
  
  export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
  }
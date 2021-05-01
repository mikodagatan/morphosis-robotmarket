import React, {createContext, useReducer} from 'react';
import AppReducer from './reducers/AppReducer';

export const AppContext = createContext();

const initialState = {
  productsInList: [],
  productsInCart: [],
  totalPrice: 0
};

export const AppContextProvider = ( { children } ) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  return (
    <AppContext.Provider value={[ state, dispatch ]}>
      {children}
    </AppContext.Provider>
  );
};
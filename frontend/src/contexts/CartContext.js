import React, {createContext, useReducer} from 'react';
import CartReducer from './reducers/CartReducer';

export const CartContext = createContext();

const initialState = {
  products: [],
  total: 0
};

export const CartContextProvider = ( { children } ) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)
  return (
    <CartContext.Provider value={[ state, dispatch ]}>
      {children}
    </CartContext.Provider>
  );
};
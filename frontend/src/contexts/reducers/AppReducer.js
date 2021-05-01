const CartReducer = (state, action) => {

  switch(action.type) {
    case 'list/getProducts':
      return {
        ...state,
        productsInList: action.payload
      }
    case 'list/postProducts':
      return {
        ...state,
        productsinList: action.payload
      }
    case 'cart/addProduct':
      return {
        ...state,   
        productsInCart: state.productsInCart.concat(action.payload),
        totalPrice: state.total + action.payload.price
      };
    case 'cart/removeProduct':
      return {
        ...state,
        productsInCart: state.productsInCart.filter(
          product => product !== action.payload
        ),
        totalPrice: state.total - action.payload.price
      }
    default:
      return state;
  };
};

export default CartReducer;
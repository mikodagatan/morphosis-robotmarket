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
        productsInList: action.productsInList,
        productsInCart: action.productsInCart,
        totalPrice: action.totalPrice
      };
    case 'cart/decrementProduct':
      return {
        ...state,
        productsInList: action.productsInList,
        productsInCart: action.productsInCart,
        totalPrice: action.totalPrice
      }
    case 'cart/removeProduct':
      return {
        ...state,
        productsInList: action.productsInList,
        productsInCart: action.productsInCart,
        totalPrice: action.totalPrice
      }
    case 'filter/addMaterial':
      return {
        ...state,
        removedProducts: action.removedProducts,
        productsInList: action.productsInList
      }
    case 'filter/removeMaterial':
      return {
        ...state,
        removedProducts: action.removedProducts,
        productsInList: action.productsInList
      }
    case 'snackbar/error':
      return {
        ...state,
        error: action.payload,
        openNotification: true
      }
    case 'snackbar/close':
      return {
        ...state,
        openNotification: false
      }
    default:
      console.log(action.type, 'not defined')
      return state;
  };

  
};

export default CartReducer;
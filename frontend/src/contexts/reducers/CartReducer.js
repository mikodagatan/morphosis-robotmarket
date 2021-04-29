const ProductReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,   
        products: state.products.concat(action.payload),
        totalPrice: state.total + action.payload.price
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          product => product !== action.payload
        ),
        totalPrice: state.total - action.payload.price
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  };
};

export default ProductReducer;
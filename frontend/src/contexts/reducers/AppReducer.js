const CartReducer = (state, action) => {

  const createNewProduct = (product, action, newStock = null) => {
    const newProduct = {
      createdAt: product.createdAt,
      image: product.image,
      material: product.material,
      name: product.name,
      price: product.price,
      stock: 0
    }
    if (action == 'increment') {
      newProduct.stock = product.stock + 1;
    } else if (action == 'decrement') {
      newProduct.stock = product.stock - 1;
    } else if (action == 'replacement') {
      newProduct.stock = newStock;
    }
    return newProduct
  }

  const objectInArray = (array, product) => {
    return array.filter( (item) => product.name == item.name)
  }

  const replaceObjectInArray = (array, product) => {
    const index = array.findIndex((item) => product.name == item.name);
    array[index] = product
    return array
  }

  const formatCartProduct = (product) => {
    var productInCart = objectInArray(state.productsInCart, product);
    const productIsInCart = productInCart.length >= 1;

    if (productIsInCart) {
      productInCart = productInCart[0]
      // WHY: using productInCart.stock += 1 results to a different number.
      const newProduct = createNewProduct(productInCart, 'increment');
      
      return replaceObjectInArray(state.productsInCart, newProduct);
    } else {
      product.stock = 1;
      return state.productsInCart.concat(product);
    }
  }

  const formatListProduct = (product) => {
    const productInList = objectInArray(state.productsInList, product)[0];
    
    // WHY: using productInList.stock -= 1 always results to 1.
    const newProduct = createNewProduct(productInList, 'decrement');

    return replaceObjectInArray(state.productsInList, newProduct);
  }

  const returnProductToList = (product) => {
    const productInList = objectInArray(state.productsInList, product)[0];
    const productInCart = objectInArray(state.productsInCart, product)[0];
    const newProduct = createNewProduct(
      product, 
      'replacement',
      productInList.stock + productInCart.stock 
    );
    const priceToDeduct = productInCart.stock * productInCart.price;
    return {
      newList: replaceObjectInArray(state.productsInList, newProduct),
      priceToDeduct: priceToDeduct
    }
  }

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
        productsInList: formatListProduct(action.payload),
        productsInCart: formatCartProduct(action.payload),
        totalPrice: state.totalPrice + parseFloat(action.payload.price)
      };
    case 'cart/incrementProduct':
      return {
        ...state,
        totalPrice: 0
      }
    case 'cart/removeProduct':
      const { newList, priceToDeduct } = returnProductToList(action.payload)
      return {
        ...state,
        productsInList: newList,
        productsInCart: state.productsInCart.filter(
          product => product !== action.payload
        ),
        totalPrice: state.totalPrice - priceToDeduct
      }
    default:
      return state;
  };

  
};

export default CartReducer;
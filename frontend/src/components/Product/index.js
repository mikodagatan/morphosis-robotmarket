import { useContext, useState } from 'react';
import moment from 'moment';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core';
import {
  Box,
  Button,
  Typography
} from '@material-ui/core';
import Currency from '../Currency';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useStyles, iconStyle } from './styles';

import { AppContext } from '../../contexts/AppContext';

export default function Product(props) {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const maximumProductsInCart = 5;

  const validateMaxProducts = (product) => {
    const productIsInCart = state.productsInCart
      .filter((item) => product.name == item.name).length > 0;

    const maximumProductsInCartReached =  (
      state.productsInCart.length == maximumProductsInCart);

    if (maximumProductsInCartReached && !productIsInCart) {
      dispatch({
        type: 'snackbar/error',
        payload: `You cannot have more than 
          ${maximumProductsInCart} different robots.`
      })
      return false
    }
    return true
  }

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

  const handleAddProduct = (product) => {
    if (!validateMaxProducts(product)) return false
    const productsInList = formatListProduct(product);
    const productsInCart = formatCartProduct(product);

    dispatch({
      type: 'cart/addProduct',
      productsInList: productsInList,
      productsInCart: productsInCart,
      totalPrice: state.totalPrice + parseFloat(product.price)
    })
  }

  const handleRemoveProduct = (product) => {
    const { newList, priceToDeduct } = returnProductToList(product)

    dispatch({
      type: 'cart/removeProduct',
      productsInList: newList,
      productsInCart: state.productsInCart.filter(
        (item) => product.name !== item.name
      ),
      totalPrice: state.totalPrice - priceToDeduct
    })
  }
  
  
  return (
    <Card 
      className={classes.root}
      variant="outlined"
      key={props.product.name}
    >
      <CardMedia 
        className={classes.media}
        image={props.product.image}
        title={props.product.name}
      />
      <CardContent>
        <Box
          height={50}
          textAlign="center">
          <Typography 
            gutterBottom 
            variant="h4"
          >
            {props.product.name}
          </Typography>
        </Box>
        <Box textAlign="center"> 
          <Typography variant="button">
            {props.product.material}
          </Typography>
          <Typography variant="subtitle1" >
            <Currency value={props.product.price}/>
          </Typography>
          <Typography variant="caption">
            {props.product.stock} 
            {props.isCartProduct ? ' pcs' : ' on stock'}
          </Typography>
        </Box>
        <Box textAlign="center">
          
        </Box>
      </CardContent>
      <CardActions>
        {
          props.isCartProduct &&
          <Button 
            variant="outlined" 
            color="primary" 
            disableElevation
            className={classes.button}
            onClick={() => handleRemoveProduct(props.product)}
          >
            <FontAwesomeIcon 
              icon={faCartPlus}
              style={iconStyle}
              />
            Remove
          </Button>
        }
        {
          !props.isCartProduct &&
          <Button 
            variant="outlined" 
            color="primary" 
            disableElevation
            className={classes.button}
            disabled={props.product.stock == 0}
            onClick={() => handleAddProduct(props.product)}
          >
            <FontAwesomeIcon 
              icon={faCartPlus}
              style={iconStyle}
              />
            Add to cart
          </Button>
        }
        
        
      </CardActions>
      <Box textAlign="right" pb={1} pr={1}>
        <Typography variant="caption">
          created {moment(props.product.createdAt).format('DD-MM-YYYY')}
        </Typography>
      </Box>
    </Card>
  )
}
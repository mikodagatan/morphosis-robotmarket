import { useState, useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import {
  Box,
  Fab,
  Drawer,
  Typography
} from '@material-ui/core';

import { useStyles  } from './styles';
import Product from '../Product';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { AppContext } from '../../contexts/AppContext';

export default function Cart() {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [state, _dispatch] = useContext(AppContext);
  const maximumProducts = 5;

  return (
    <>
      <Fab
        id="cart-button"
        className={classes.cartButton}
        color="primary"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="cart"
      >
        <FontAwesomeIcon icon={faShoppingCart}/>
      </Fab>
      <Drawer 
        className={classes.modal}
        anchor="right"
        open={isVisible}
        onClose={() => setIsVisible(!isVisible)}
      >
        <Box 
          minWidth={800}
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={4}
        >
          <Typography variant="h3">My Shopping Cart</Typography>
          <Box
            id="cart-products-container"
            width={700}
            mt={6}
            py={2}
            px={6}
            display="flex"
            flexWrap="wrap"
          >
            {
              state.productsInCart.length == 0 &&
              <Box padding={6}>
                <Typography variant="h4">
                  No robots in your shopping cart, yet. ;)
                </Typography>
              </Box>
            }
            { 
              state.productsInCart.length > 0 &&
              state.productsInCart.map( (product, index) => 
                <Product 
                  product={product} 
                  isCartProduct={true}
                  key={index} 
                />
              )
            }

            
          </Box>
        </Box>
      </Drawer>
    </>
    
  )

}
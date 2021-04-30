import { useState, useContext, useEffect } from 'react';
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

import { CartContext } from '../../contexts/CartContext';

export default function Checkout() {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(true);
  const [state, _dispatch] = useContext(CartContext);

  const maximumProducts = 5;

  useEffect(() => {
    
  })

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
              state.products.length == 0 &&
              <Box padding={6}>
                <Typography variant="h4">
                  No robots in your shopping cart, yet. ;)
                </Typography>
              </Box>
            }
            { 
              state.products.length > 0 &&
              state.products.map( (product, index) => 
                <Product product={product} key={index} />
              )
            }

            
          </Box>
        </Box>
      </Drawer>
    </>
    
  )

}
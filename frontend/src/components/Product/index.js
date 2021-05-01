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
  const [_state, dispatch] = useContext(AppContext);

  const handleAddProduct = (product) => {
    dispatch({
      type: 'cart/addProduct',
      payload: product
    })
  }

  const handleRemoveProduct = (product) => {
    dispatch({
      type: 'cart/removeProduct',
      payload: product
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
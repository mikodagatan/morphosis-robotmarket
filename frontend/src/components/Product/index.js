import { useContext } from 'react';
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

import { CartContext } from '../../contexts/CartContext';

export default function Product(props) {
  const classes = useStyles();
  const [state, dispatch] = useContext(CartContext);

  const handleAddProduct = (product) => {
    dispatch({
      type: 'ADD_PRODUCT',
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
            {props.product.stock} on stock
          </Typography>
        </Box>
        <Box textAlign="center">
          
        </Box>
      </CardContent>
      <CardActions>
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
            style={iconStyle.productCard}
            />
          Add to cart
        </Button>
      </CardActions>
      <Box textAlign="right" pb={1} pr={1}>
        <Typography variant="caption">
          created {moment(props.product.createdAt).format('DD-MM-YYYY')}
        </Typography>
      </Box>
    </Card>
  )
}
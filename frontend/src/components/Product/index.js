import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core';
import {
  Box,
  Button,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 210,
    width: 210,
    borderRadius: 8,
    margin: '0 10px 10px 0'
  },
  media: {
    height: 120,
    backgroundPosition: 'bottom',
    backgroundSize: 'auto'
  }
})

export default function Product(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia 
          className={classes.media}
          image={props.product.image}
          title={props.product.name}
        />
        <CardContent>
          <Box height={70}>
            <Typography gutterBottom variant="h3">
              {props.product.name}
            </Typography>
          </Box>
          
          <Typography variant="body2">
            Price: {props.product.price}
          </Typography>
          <Typography variant="body2">
            Stock: {props.product.stock}
          </Typography>
          <Typography variant="body2">
            Material: {props.product.material}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">Add to cart</Button>
      </CardActions>
    </Card>
  )
}
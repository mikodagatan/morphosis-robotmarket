import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core';
import {
  Button,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140
  }
})

export default function ProductItem(props) {
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
          <Typography gutterBottom variant="h2">
            {props.product.name}
          </Typography>
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
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
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
  },
  button: {
    width: '100%' 
  }
})

export const iconStyle = {
  margin: '0 10px 0 0',
  fontSize: '1.1rem'
}
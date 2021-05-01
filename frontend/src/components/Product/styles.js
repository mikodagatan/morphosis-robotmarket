import { makeStyles } from '@material-ui/core/styles';
import { global } from '../../themes/MainTheme';

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
  },
  cartProductButton: {
    width: '100%',
    color: `rgb(${global.colors.warning})`,
    borderColor: `1px solid rgb(${global.colors.warning})` 
  }
})

export const iconStyle = {
  margin: '0 10px 0 0',
  fontSize: '1.1rem'
}
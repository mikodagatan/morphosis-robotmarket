import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './';

export const useStyles = makeStyles(() => ({
  rootDiv: {
    flexGrow: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    zIndex: '10',
  },
  root: {},
  indicator: {
    left: '0',
    width: '4px',
    borderRadius: '0 5px 5px 0',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    padding: '5px 20px 5px 15px',
    width: drawerWidth,
  },
  labelIcon: {
    textTransform: 'unset',
    minHeight: 'auto',
  },
  selected: {
    fontWeight: 'bold',
  },
  drawer: {
    border: '0',
  },
  drawerPaper: {
    border: '0',
    width: drawerWidth,
  },
}));

export const iconStyle = {
  margin: '0 20px 0 0',
  fontSize: '1.5rem'
}
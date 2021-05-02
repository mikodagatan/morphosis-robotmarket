import { useContext } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import { AppContext } from '../contexts/AppContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notification() {
  const [state, dispatch] = useContext(AppContext);
  
  const handleClose = () => {
    dispatch({ type: 'snackbar/close', payload: null })
  };

  return (
    <Snackbar 
      anchorOrigin={{ 
        vertical: 'top',
        horizontal: 'center'  
      }}
      open={state.openNotification} 
      autoHideDuration={6000} 
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        { state.error }
      </Alert>
    </Snackbar>
  )
}
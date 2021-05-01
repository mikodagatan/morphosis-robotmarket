import { useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import Product from '../components/Product';

import { AppContext } from '../contexts/AppContext';

export default function Home() {
  const [state, dispatch] = useContext(AppContext);
  
  useEffect(async () => {
    fetch(`${process.env.REACT_APP_API_URL}/robots`)
      .then( response => response.json())
      .then( data => {
        dispatch({
          type: 'list/getProducts',
          payload: data.data
        })
      });
  }, [])

  return (
    <Box>
      <Box 
        display='flex' 
        width='100%' 
        flexWrap='wrap'
      >
        { state.productsInList.map( (product, index) => 
          <Product product={product} key={index} />
        )}
      </Box>
    </Box>
  )
}
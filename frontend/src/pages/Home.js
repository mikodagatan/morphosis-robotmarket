import { useContext } from 'react';
import { Box } from '@material-ui/core';
import Product from '../components/Product';
import { useQuery } from 'react-query';

import { AppContext } from '../contexts/AppContext';

const fetchProducts = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/robots`)
  return res.json()
} 

export default function Home() {
  const [state, dispatch] = useContext(AppContext);

  const { data, status } = useQuery(
    'products', 
    fetchProducts, 
    { staleTime: Infinity });

  if (status == 'success' && state.productsInList.length == 0) {
    const sortedData = data.data.sort((a,b) => (a.name > b.name) ? 1 : -1)
    dispatch({
      type: 'list/getProducts',
      payload: sortedData
    })
  }

  return (
    <Box>
      <Box 
        display='flex' 
        width='100%' 
        flexWrap='wrap'
      >
        { status == 'loading' && 'loading ...' }
        { status == 'success' &&
          state.productsInList.map( (product, index) => 
          <Product product={product} key={index} />
        )}
      </Box>
    </Box>
  )
}
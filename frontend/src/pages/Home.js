import { Typography, Box } from '@material-ui/core';
import { useQuery } from 'react-query';
import Product from '../components/Product';


const fetchProducts = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/robots`);
  return res.json();
}

export default function Home() {
  const { data, status, error } = useQuery('products', fetchProducts);
  if (status == 'loading') return 'Loading...';
  if (status == 'error') return error.message;
  return (
    <Box>
      {status}
      { status === 'loading' && (
        <div>Loading data...</div>
      )}
      {
        status === 'error' && (
        <div>Error fetching data</div>  
      )}
      {
        status === 'success' && (
        <Box display='flex' width='100%' flexWrap='wrap'>
          { data.data.map( product => 
            <Product product={product}/>
          )}
        </Box>  
      )}
      
    </Box>
  )
}
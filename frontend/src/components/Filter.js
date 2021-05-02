import { useContext, useState, useEffect } from 'react';
import { 
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel, 
  Typography
} from '@material-ui/core';

import { AppContext } from '../contexts/AppContext';


export default function Filter() {
  const [state, dispatch] = useContext(AppContext);
  const [materialList, setMaterialList] = useState([]);
  const [filters, setFilters] = useState([]);

  const findMaterials = () => {
    const materials = state.productsInList.map( 
      (product) => { return product.material }).sort()
    return materials.filter((type, i, ar) => ar.indexOf(type) === i);
  }

  const areProductsLoaded = (state.productsInList.length > 0)
  const areMaterialsLoaded = (materialList.length > 0)

  useEffect(()=> {
    (areProductsLoaded && !areMaterialsLoaded) &&
    setMaterialList(findMaterials())
  })

  const handleChange = ( e, material) => {
    toggleFilter(material)

    if (e.target.checked) {
      handleAddFilter(material)
    } else {
      handleRemoveFilter(material)
    }
  }

  const toggleFilter = (material) => {
    isInFilters(material) && setFilters( 
      filters.filter( (item) => item !== material)
    )
    !isInFilters(material) && setFilters( filters.concat(material))
  }

  const isInFilters = (material) => {
    const result = filters.includes(material)
    return result
  }

  const findProducts = (array, material) => {
    return array.filter( (item) => item.material == material)
  }

  const createFilteredList = (array, material) => {
    return array.filter( (item) => item.material !== material)
  }

  const handleRemoveFilter = (material) => {
    const removedProducts = findProducts(state.productsInList, material)
    const newRemovedList = state.removedProducts.concat(removedProducts)
    const newList = sortList(createFilteredList(state.productsInList, material))

    dispatch({
      type: 'filter/removeMaterial',
      productsInList: newList,
      removedProducts: newRemovedList
    })
    console.log('handleRemoveFilter', state.productsInList)
  }

  const handleAddFilter = (material) => {
    const addedProducts = findProducts(state.removedProducts, material)
    const newRemovedList = createFilteredList(state.removedProducts, material)
    const newList = sortList(state.productsInList.concat(addedProducts))
    
    dispatch({
      type: 'filter/addMaterial',
      productsInList: newList,
      removedProducts: newRemovedList
    })
    console.log('handleAddFilter', state)
  }

  const sortList = (list) => {
    return list.sort((a,b) => (a.name > b.name) ? 1 : -1)
  }

  return (
    <Box
      id="filters" 
      px={4}
    >
      <Typography variant="h4">
        Filters
      </Typography>
      <FormGroup>
        {
          areProductsLoaded && 
          materialList.map( (material) =>
            <FormControlLabel
              key={material}
              control={
                <Checkbox
                  key={material}
                  name={material}
                  value={material}
                  checked={!isInFilters(material)}
                  onChange={(e) => handleChange(e, material)}
                />
              }
              label={material}
            />
          )
        }
      </FormGroup>
    </Box>
    
  )
}
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  filteredProducts: [],
  searchTerm: '', // Add searchTerm to keep track of the current search term
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload.slice(); // Ensure to create a copy
    },
   
    sortProductsByPrice: (state, action) => {
      const sortOrder = action.payload;
      state.filteredProducts = [...state.products].sort((a, b) => {
        return sortOrder === 'lowToHigh' ? a.price - b.price : b.price - a.price;
      });
    },

    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = searchTerm; // Update searchTerm in state
      state.filteredProducts = state.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    },

    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredProducts = state.products.slice(); // Reset filteredProducts to include all products
    },
  },
});

export const { setProducts, sortProductsByPrice, searchProducts, clearSearch } = productsSlice.actions;

export const fetchProducts = () => async dispatch => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    dispatch(setProducts(response.data.products));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Handle error state if needed
  }
};

export default productsSlice.reducer;

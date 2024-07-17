import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    count: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.count += 1;
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const removedItem = state.items.find(item => item.id === action.payload);
      if (removedItem) {
        state.count -= removedItem.quantity;
        state.totalPrice -= removedItem.price * removedItem.quantity;
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.count += 1;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.count -= 1;
        state.totalPrice -= item.price;
      }
    },
    clearCart: state => {
      state.items = [];
      state.count = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

// Thunk action to handle adding to cart with alert
export const addToCartAlert = (product) => (dispatch, getState) => {
  const state = getState();
  const existingItem = state.cart.items.find(item => item.id === product.id);

 


  if (existingItem) {
    Swal.fire({
      icon: 'info',
      title: 'Product Already in Cart!',
      text: 'You have already added this product to your cart.',
    });
  } else {
    dispatch(addToCart(product));
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: 'Product has been added to your cart successfully.',
    });
  }
};

// Your other actions and reducers

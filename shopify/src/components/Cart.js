import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../redux/CartSlice';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    Swal.fire({
      title: 'Enter Your Details',
      html: `
        <input id="name" class="swal2-input" placeholder="Name">
        <input id="phone" class="swal2-input" placeholder="Phone">
        <input id="email" class="swal2-input" placeholder="Email">
        <input id="address" class="swal2-input" placeholder="Delivery Address">
      `,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const phone = Swal.getPopup().querySelector('#phone').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const address = Swal.getPopup().querySelector('#address').value;

        // Basic validation
        if (!name || !phone || !email || !address) {
          Swal.showValidationMessage('Please fill in all fields');
          return false;
        }

        return { name, phone, email, address };
      },
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Order Placed',
          text: 'Your order has been placed successfully!',
          icon: 'success',
        }).then(() => {
          dispatch(clearCart());
          navigate('/');
        });
      }
    });
  };

  return (
    <Container>
      {cartItems.map(item => (
        <CartItem key={item.id}>
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <QuantityControls>
            <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
          </QuantityControls>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </CartItem>
      ))}
      {cartItems.length > 0 && (
        <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
      )}
      {cartItems.length === 0 && (
        <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
      )}
      {cartItems.length > 0 && (
        <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  h3 {
    flex: 1;
    font-size: 18px;
  }

  p {
    width: 100px;
    text-align: center;
  }

  button {
    padding: 8px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #c82333;
    }
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }

    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 10px;
    }
  }

  span {
    width: 30px;
    text-align: center;
    font-size: 18px;
  }
`;

const CheckoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const EmptyCartMessage = styled.p`
  text-align: center;
`;

const TotalPrice = styled.p`
  text-align: right;
  font-size: 20px;
  margin-top: 10px;
`;

export default Cart;

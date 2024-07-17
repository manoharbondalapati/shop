import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import styled from 'styled-components';

const Product = () => {
  const { id } = useParams();
  const product = useSelector(state => state.products.products.find(p => p.id === parseInt(id)));
  const dispatch = useDispatch();

  return (
    <Container>
      {product && (
        <>
          <img src={product.thumbnail} alt={product.title} />
          <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;

  img {
    max-width: 400px;
    height: auto;
    border-radius: 4px;
  }

  div {
    flex: 1;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;


export default Product;

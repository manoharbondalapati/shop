import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, sortProductsByPrice, searchProducts, clearSearch } from '../redux/ProductsSlice';
import { addToCartAlert } from '../redux/CartSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { filteredProducts, searchTerm } = useSelector(state => state.products);
  const { count } = useSelector(state => state.cart); 
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSortChange = sortOrder => {
    dispatch(sortProductsByPrice(sortOrder));
  };

  const handleSearch = () => {
    dispatch(searchProducts(searchInput));
  };

  const handleInputChange = event => {
    setSearchInput(event.target.value);
  };

  const clearSearchTerm = () => {
    dispatch(clearSearch());
    setSearchInput('');
  };

  const addToCartHandler = (product) => {
    dispatch(addToCartAlert(product));
  };

  
  

  return (
    <Container>
      <Header>
        <Logo>MyShop</Logo>
        <SearchBox>
          <input type="text" placeholder="Search products..." value={searchInput} onChange={handleInputChange} />
          <button onClick={handleSearch}>Search</button>
          {searchTerm && (
            <button onClick={clearSearchTerm}>Clear</button>
          )}
        </SearchBox>
        <CartLink to="/cart">Cart ({count})</CartLink> {/* Display cart count */}
      </Header>
      <Filters>
        <SortFilter>
          <button onClick={() => handleSortChange('lowToHigh')}>Low to High</button>
          <button onClick={() => handleSortChange('highToLow')}>High to Low</button>
        </SortFilter>
      </Filters>
      <ProductList>
        {filteredProducts.map(product => (
          <ProductCard key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`}>Details</Link>
            <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
          </ProductCard>
        ))}
      </ProductList>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #333;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;

  input {
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 200px;
  }

  button {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const CartLink = styled(Link)`
  font-size: 18px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const SortFilter = styled.div`
  button {
    margin-left: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
  }

  h3 {
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    font-size: 16px;
    color: #555;
  }

  a {
    margin-right: 10px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    text-decoration: none;

    &:hover {
      background-color: #0056b3;
    }
  }

  button {
    padding: 8px 12px;
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

export default Home;

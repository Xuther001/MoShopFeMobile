import React, { useEffect, useState } from 'react';
import axios from '../../configs/axiosConfig';
import ProductDetails from '../ProductDetails/ProductDetails';
import { Link } from 'react-router-dom';
import './FootwearCategory.css';

const FootwearCategory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const filteredProducts = response.data.filter(product => product.category.id === 11);
        const sortedProducts = filteredProducts.sort((a, b) => a.id - b.id);
        setProducts(sortedProducts);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
  };

  const handleCloseDetails = () => {
    setSelectedProductId(null);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="footwear-category-container">
      <div className="home-button">
        <Link to="/" className="common-button">Home Page</Link>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>

      {selectedProductId && (
        <ProductDetails productId={selectedProductId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default FootwearCategory;
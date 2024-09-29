import React, { useEffect, useState } from 'react';
import axios from '../../configs/axiosConfig';
import ProductDetails from '../ProductDetails/ProductDetails';
import './Eyewear.css';

const Eyewear = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const filteredProducts = response.data.filter(product => product.category.id === 3);
        setProducts(filteredProducts);
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
    <div className="eyewear-container">
      <div>
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.imageUrl} alt={product.name} className="product-image" />
          </div>
        ))}
      </div>

      {selectedProductId && (
        <ProductDetails productId={selectedProductId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Eyewear;
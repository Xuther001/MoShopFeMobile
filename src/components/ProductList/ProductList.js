import React, { useEffect, useState } from 'react';
import axios from '../../configs/axiosConfig';
import ProductDetails from '../ProductDetails/ProductDetails';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
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

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      
      {selectedProductId && (
        <ProductDetails productId={selectedProductId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default ProductList;
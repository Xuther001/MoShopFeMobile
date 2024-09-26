import React, { useEffect, useState, useRef } from 'react';
import axios from '../../configs/axiosConfig';
import ProductDetails from '../ProductDetails/ProductDetails';
import './Footwear.css';

const Footwear = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const productListRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const filteredProducts = response.data.filter(product => product.category.id === 11);
        const sortedProducts = filteredProducts.sort((a, b) => a.id - b.id);
        setProducts(sortedProducts);
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

  const duplicatedProducts = [...products, ...products];

  return (
    <div className="footwear-container">
      <div className="scroll-button left" onClick={() => productListRef.current.scrollBy({ left: -200, behavior: 'smooth' })}>
        &#9664;
      </div>
      <div className="product-list" ref={productListRef}>
        {duplicatedProducts.length > 0 ? (
          duplicatedProducts.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
      <div className="scroll-button right" onClick={() => productListRef.current.scrollBy({ left: 200, behavior: 'smooth' })}>
        &#9654;
      </div>

      {selectedProductId && (
        <ProductDetails productId={selectedProductId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Footwear;
import Register from './components/UserRegistration/Register';
import ProductList from './components/ProductList/ProductList';
import ProductReviews from './components/ProductReview/ProductReview';

function Registration() {
  return (
    <div className="HomePage">
      <Register />
      <ProductList />
      <ProductReviews />
    </div>
  );
}

export default Registration;

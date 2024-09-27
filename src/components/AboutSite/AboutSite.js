import React from 'react';
import './AboutSite.css';

const AboutSite = () => {
  return (
    <div className="about-site">
      <h1>Goal: Develop a Functional E-commerce Website</h1>
      <h2>Accessing the URL</h2>
      <ul>
        <li><strong>Device Detection:</strong> The website will automatically detect whether the user is on a stationary device (desktop) or a mobile device.</li>
        <li>If the user is on a mobile device, they will be redirected to a mobile-friendly version of the website.</li>
        <li><strong>Home Screen Navigation:</strong> Upon accessing the website, users will be taken to the home screen after device detection.</li>
        <li>The home screen will feature Login and Sign Up buttons.</li>
        <li>After logging in, the user will see different buttons dynamically without refreshing the page for an enhanced user experience.</li>
      </ul>
      <h2>Sign Up Process</h2>
      <ul>
        <li>Clicking on the Sign Up button will bring up a registration form.</li>
        <li>Input fields will have restrictions to ensure valid data entry (e.g., no numbers in the last name field).</li>
        <li>After clicking Register:
          <ul>
            <li>If successful, a 5-second countdown will occur before redirecting the user back to the home screen.</li>
            <li>The user will be automatically logged in, eliminating the need to log in separately.</li>
          </ul>
        </li>
      </ul>
      <h2>Login Process</h2>
      <ul>
        <li>Clicking the Login button will direct the user to the login page.</li>
        <li>Usernames will be case-insensitive.</li>
        <li>A Forgot My Password link will be available, prompting the user to enter their email to receive a password reset link.</li>
      </ul>
      <h2>My Cart Functionality</h2>
      <ul>
        <li>Clicking on My Cart will take the user to their cart, displaying all products added.</li>
        <li>Users can remove items from the cart, which will free the product's quantity back to inventory.</li>
        <li>A Simulate a Purchase button will allow users to simulate a purchase:
          <ul>
            <li>This action generates an invoice in the My Invoice section.</li>
            <li>The cart will be cleared of any products upon purchase simulation.</li>
            <li>If a user completes a purchase, the stock on hand for that product will be permanently reduced on the backend.</li>
          </ul>
        </li>
      </ul>
      <h2>Invoice Management</h2>
      <ul>
        <li>Users can view their invoice(s) in the Invoice section.</li>
      </ul>
      <h2>Address Management</h2>
      <ul>
        <li>Users can view or change their address.</li>
        <li>Any changes to the address will be displayed immediately without a manual page refresh.</li>
      </ul>
      <h2>Product Interaction</h2>
      <ul>
        <li>Clicking on a product will display the product details screen.</li>
        <li>Users can click Add to Cart to add the product with the specified quantity to My Cart.</li>
        <li>Upon addition, the product's stock on hand will be reduced on the backend to reflect the item being held in the cart.</li>
        <li>If the user has previously purchased the product, they will automatically have the option to post a review.</li>
        <li>Users who have already reviewed a product will not have the option to review it again.</li>
        <li>Submitted reviews will appear immediately under the Customer Reviews section.</li>
      </ul>

      <h2>Explore the Site</h2>
      <p>
        For your convenience, here is an already registered account for you to explore the site with:
      </p>
      <ul>
        <li><strong>Username:</strong> Maiev</li>
        <li><strong>Password:</strong> 1111</li>
      </ul>

      <h2>Tech Stack</h2>
      <p>
        Tech stack used to build this website:
      </p>
      <ul>
        <li><strong>Frontend:</strong> JavaScript, React.js</li>
        <li><strong>Backend:</strong> Java, Spring Boot, PostgreSQL</li>
        <li><strong>Deployment:</strong> AWS RDS, AWS S3, AWS EC2</li>
      </ul>
    </div>
  );
};

export default AboutSite;
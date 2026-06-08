import { Link } from "react-router-dom";
import "../css/Footer.css";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import useSignOut from "../Hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export default function Footer() {

  const {user}=useContext(AuthContext);
  const {logOut}=useSignOut();
  const navigate=useNavigate();
  
  const logUser=async(e)=>{
    e.preventDefault();
    await logOut();
    navigate('login');
  }

  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <h2>NEXORA</h2>

          <p>
            Modern fashion designed for confident living.
            Discover timeless collections crafted for every season.
          </p>
        </div>

        <div className="footer-links">

          <div className="footer-column">
            <h4>Shop</h4>

            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/kids">Kids</Link>
            <Link to="/products">All Products</Link>
          </div>

          <div className="footer-column">
            <h4>Company</h4>

            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/journal">Journal</Link>
          </div>

          <div className="footer-column">
            <h4>Support</h4>

            <Link to="/faq">FAQ</Link>
            <Link to="/shipping">Shipping</Link>
            <Link to="/returns">Returns</Link>
          </div>

          <div className="footer-column">
            <h4>Account</h4>

            {!user &&<>
              <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>}
            {!!user &&<button onClick={logUser}>Logout</button>}
            <Link to="/wishlist">Wishlist</Link>
            <Link to='/order'>My order</Link>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Nexora. All rights reserved.</p>
      </div>

    </footer>
  );
}


import { Link } from "react-router-dom";
import "../css/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-tag">
            New Collection 2026
          </span>

          <h1>
            Elevate Your Style
          </h1>

          <p>
            Discover timeless fashion crafted for modern living.
          </p>

          <div className="hero-buttons">
            <Link to={'/women'} className="hero-btn">Shop Women</Link>
            <Link to={'/men'} className="hero-btn">Shop Men</Link>
          </div>
        </div>
      </div>
    </section>
  );
}


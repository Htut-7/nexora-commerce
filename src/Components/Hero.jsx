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
            <button>Shop Women</button>
            <button>Shop Men</button>
          </div>
        </div>
      </div>
    </section>
  );
}


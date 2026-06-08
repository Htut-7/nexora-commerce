import "../css/ShopByMood.css";

export default function ShopByMood() {
  return (
    <section className="mood-section">

      <div className="mood-header">
        <span>DISCOVER YOUR STYLE</span>
        <h2>Shop By Mood</h2>
      </div>

      <div className="mood-grid">

        <div className="mood-card">
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
            alt="Minimal"
          />

          <div className="mood-overlay">
            <h3>Minimal</h3>
            <button>Explore</button>
          </div>
        </div>

        <div className="mood-card">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
            alt="Streetwear"
          />

          <div className="mood-overlay">
            <h3>Streetwear</h3>
            <button>Explore</button>
          </div>
        </div>

        <div className="mood-card">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
            alt="Luxury"
          />

          <div className="mood-overlay">
            <h3>Casual</h3>
            <button>Explore</button>
          </div>
        </div>

        <div className="mood-card">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="Casual"
          />

          <div className="mood-overlay">
            <h3>Luxury</h3>
            <button>Explore</button>
          </div>
        </div>

      </div>

    </section>
  );
}


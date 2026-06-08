import "../css/FashionalJournal.css";

export default function FashionJournal() {
  return (
    <section className="journal">

      <div className="journal-header">
        <span>NEXORA JOURNAL</span>
        <h2>Stories Behind The Style</h2>
        <p>
          Explore the latest trends, styling inspiration,
          and seasonal fashion insights.
        </p>
      </div>

      <div className="journal-grid">

        <article className="journal-card">
          <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"
              alt="Minimal Wardrobe"
            />

          <div className="journal-content">
            <span>STYLE GUIDE</span>
            <h3>How To Build A Minimal Wardrobe</h3>
            <button>Read Story</button>
          </div>
        </article>

        <article className="journal-card">
          <img
              src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop"
              alt="Streetwear"
            />

          <div className="journal-content">
            <span>TRENDS</span>
            <h3>Streetwear Trends For 2026</h3>
            <button>Read Story</button>
          </div>
        </article>

        <article className="journal-card">
          <img
              src="https://i.pinimg.com/736x/f9/1f/a4/f91fa47d51e3e14f5630a5eed0dcb494.jpg"
              alt="Timeless Fashion"
            />

          <div className="journal-content">
            <span>EDITORIAL</span>
            <h3>Timeless Pieces Every Closet Needs</h3>
            <button>Read Story</button>
          </div>
        </article>

      </div>

    </section>
  );
}


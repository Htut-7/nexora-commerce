import "../css/EditorialShowcase.css";

export default function EditorialShowcase() {
  return (
    <section className="editorial">

      <div className="editorial-images">

     
<div className="editorial-image">
  <img
    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
    alt="Editorial Fashion"
  />
</div>

<div className="editorial-image">
  <img
    src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
    alt="Editorial Fashion"
  />
</div>



      </div>

      <div className="editorial-content">
        <span>EDITORIAL</span>

        <h2>The Nexora Edit</h2>

        <p>
          Fashion is more than clothing. It's a reflection of confidence,
          individuality, and modern living. Discover carefully curated pieces
          designed for every moment.
        </p>

        <button>
          Explore Collection
        </button>
      </div>

    </section>
  );
}


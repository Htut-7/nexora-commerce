import { useEffect, useState } from "react";
import "../css/Products.css";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../firebase/Firebase";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useWishlist from "../Hooks/useWishlist";

export default function Products() {

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [products,setProducts]=useState([]);
  const [searchParams]=useSearchParams();

  const {addWishlist}=useWishlist();

  const {addCart}=useCart();
  const searchTerms=searchParams.get("search") || "";

  const filterProducts=products.filter((products)=>
    products.title.toLowerCase().includes(searchTerms.toLowerCase()) || 
    products.category?.some((cat)=>cat.toLowerCase().includes(searchTerms.toLowerCase()))
  );

  useEffect(()=>{
    const fetchProducts=async()=>{
      try{
        setLoading(true);
        setError(null);
        const snapshot=await getDocs(collection(db,"products"));

        const data=snapshot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }));
        setProducts(data);
        setLoading(false);
      }catch(error){
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  },[])

  return (
    <section className="products">
      <div className="product-header">
        <h2>All Products</h2>
        <p>Discover timeless pieces curated for the modern wardrobe.</p>
      </div>

      {error && <p className="product-error">{error}</p>}

      {loading && (
        <span className="product-spinner"></span>
      )}

     <div className="product-grid">
       {filterProducts.map((p)=>(
        <div className="product-card" key={p.id}>

        <button className="wishlist-btn" onClick={()=>addWishlist(p)}>
          <FaHeart/>
        </button>

          <img src={p.image[0]} alt={p.title}/>

          <div className="product-info">
            <h3>{p.title}</h3>
            <p>Price: {p.price} $</p>
            <div className="product-catg">
              {p.category?.map((c)=>(
                <span key={c}>{c}</span>
              ))}
            </div>
            <p>Status: {p.Stock}</p>
          </div>

          <div className="product-action">
            <button onClick={()=>addCart(p)}>
              <FaShoppingCart className="product-icon"/>
            </button>

            <Link to={`/detail/${p.id}`}>Details</Link>
          </div>
        </div>
      ))}
     </div>
    </section>
  )
}

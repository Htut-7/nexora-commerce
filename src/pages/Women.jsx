import { useEffect, useState } from "react";
import "../css/Women.css";
import {db} from "../firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../Hooks/useCart";

export default function Women() {

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [product,setProduct]=useState([]);
  
  const {addCart}=useCart();

  useEffect(()=>{
    const fetchProduct=async()=>{
      try{
        setLoading(true);
        setError(null);

        const snapShot=await getDocs(collection(db,"products"));

        const data=await snapShot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }));
        setProduct(data);
        setLoading(false);

      }catch(error){
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProduct()
  },[])

  const filterProduct=product.filter((p)=>(
    p.category.includes('Women')
  ));

  return (
    <section className="women">
      <div className="women-container">
        <h3>Women's Collection</h3>
        <p>Discover elegant clothing, stylish footwear, and timeless accessories
          designed to elevate every look.
        </p>
      </div>

      {error && <p className="women-error">{error}</p>}

      {loading && <span className="women-spinner"></span>}

      <div className="women-grid">
        {filterProduct.map((w)=>(
          <div className="single-women" key={w.id}>
            <img src={w.image[0]} alt={w.title}/>

            <div className="women-info">
              <h3>{w.title}</h3>
              <p>Price: {w.price}</p>

              <div className="women-catg">
              {w.category?.map((wc)=>(
                <span key={wc}>{wc}</span>
              ))}
            </div>
            <p>Status: {w.Stock}</p>
            </div>

            <div className="women-action">
              <button onClick={()=>addCart(w)}>
                <FaShoppingCart className="women-icon"/>
              </button>

              <Link to={`/detail/${w.id}`}>Detail</Link>
            </div>
          </div>
          
        ))}
      </div>

    </section>
  )
}

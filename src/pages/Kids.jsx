import { useEffect, useState } from "react";
import "../css/Kids.css";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../firebase/Firebase";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../Hooks/useCart";

export default function Kids() {

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

        const data=snapShot.docs.map((doc)=>({
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
    fetchProduct();
  },[])

  const filterProducts=product.filter((p)=>
    p?.category.includes('Kids')
    );

  return (
    <section className="kids">
      <div className="kids-container">
        <h3>Kids's Collection</h3>
        <p>Comfortable,playful, and stylish essentials designed for every adventure.</p>
      </div>

    {error && <p className="kids-error">{error}</p>}

    {loading && <span className="kids-spinner"></span>}

    <div className="kids-grid">
      {filterProducts.map((k)=>(
        <div className="single-kid" key={k.id}>
          <img src={k.image[0]} alt={k.title}/>

          <div className="kid-info">
            <h3>{k.title}</h3>
            <p>Price: {k.price}</p>

            <div className="kid-category">
              {k.category?.map((kc)=>(
                <span key={kc}>{kc}</span>
              ))}
            </div>
            <p>Status: {k.Stock}</p>
          </div>

          <div className="kid-action">
            <button onClick={()=>addCart(k)}>
              <FaShoppingCart/>
            </button>
            
            <Link to={`/detail/${k.id}`}>Details</Link>
          </div>

        </div>
      ))}
    </div>

    </section>
  )
}

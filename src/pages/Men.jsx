import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import {db} from "../firebase/Firebase";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Men.css";
import useCart from "../Hooks/useCart";

export default function Men() {

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [product,setProduct]=useState([]);

  const {addCart}=useCart();

  useEffect(()=>{
    const fetchProduct=async()=>{
    try{
      setLoading(true);
      setError(null);

      const snap=await getDocs(collection(db,"products"));

      const snapShot=snap.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }));
      setProduct(snapShot);
      setLoading(false);

    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  };
  fetchProduct();
  },[])

  const filterProduct=product.filter((p)=>(
    p?.category.includes('Men') 
  ));

  return (
    <section className='men'>
      <div className="men-container">
        <h3>Men's Collection</h3>
        <p>Explore clothing, shoes and accessories desgined
          for the modern man.
        </p>
      </div>

      {error && <p className="men-error">{error}</p>}

      {loading && <span className="men-spinner"></span>}

      <div className="men-grid">
        {filterProduct.map((fp)=>(
          <div className="single-men" key={fp.id}>
            <img src={fp.image[0]} alt={fp.title}/>

            <div className="men-info">
              <h3>{fp.title}</h3>
              <p>Price: {fp.price}</p>
              <div className="men-catg">
                {fp.category.map((fpc)=>(
                  <span key={fpc}>{fpc}</span>
                ))}
              </div>
              <p>Status: {fp.Stock}</p>
            </div>

            <div className="men-action">
              <button onClick={()=>addCart(fp)}>
                <FaShoppingCart className="men-icon"/>
              </button>

              <Link to={`/detail/${fp.id}`}>Details</Link>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}

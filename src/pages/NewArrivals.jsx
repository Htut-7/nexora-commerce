import { useEffect, useState } from "react"
import "../css/NewArrivals.css"
import { collection, getDocs } from "firebase/firestore";
import {db} from "../firebase/Firebase";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../Hooks/useCart";

export default function NewArrivals() {

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
        fetchProduct();
    },[])

    const filterProduct=product.filter((p)=>
        p?.Stock.includes('New Arrival')
    );
    
  return (
    <section className="newarrival">
        <div className="arrival-hero">
            <span>JUST DROPPED</span>
            <h3>New Arrivals</h3>
            <p>Discover the lastest additions to our collection, featuring fresh styles and modern essentials.</p>
        </div>

        {error && <p className="newarrival-error">{error}</p>}

        {loading && <span className="newarrival-spinner"></span>}

        <div className="newarrival-grid">
            {filterProduct.map((f)=>(
                <div className="single-newarrival" key={f.id}>

                    <div className="arrival-badge">
                        NEW
                    </div>

                    <img src={f.image[0]} alt={f.title}/>

                    <div className="newarrival-info">
                        <h3>{f.title}</h3>
                        <p>Price: {f.price}</p>

                        <div className="newarrival-catg">
                            {f?.category.map((fc)=>(
                                <span key={fc}>{fc}</span>
                            ))}
                        </div>
                        <p>Status: {f.Stock}</p>
                    </div>

                    <div className="newarrival-action">
                        <button onClick={()=>addCart(f)}>
                            <FaShoppingCart className="newarrival-icon"/>
                        </button>

                        <Link to={`/detail/${f.id}`}>Detail</Link>
                    </div>
                </div>
            ))}
        </div>

    </section>
  )
}

import { useEffect, useState } from "react"
import "../css/Premium.css"
import { collection, getDocs } from "firebase/firestore";
import {db} from "../firebase/Firebase";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../Hooks/useCart";

export default function Premium() {

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

    const premiumProduct=product.filter((p)=>(
        p.Stock?.includes('Exclusive')
    ));

    const featureProduct=premiumProduct[0];

  return (
    <section className="premium">
        <div className="premium-contaiiner">
            <span>Limited Edition</span>

            <h2>Premium Collection</h2>

            <p>
                Crafted with exceptional quality and designed
                for those who value exclusivity.
            </p>
        </div>

        {error && <p className="premium-error">{error}</p>}

        {loading && <span className="premium-spinner"></span>}

        {!loading && featureProduct && (
            <div className="premium-feature">
                <img src={featureProduct.image[1]} alt={featureProduct.title}/>

                <div className="feature-content">
                    <h3>{featureProduct.title}</h3>
                    <p>{featureProduct.description}</p>

                    <div className="feature-price">
                        ${featureProduct.price}
                    </div>

                    <button>
                        Shop Now
                    </button>
                </div>
            </div>
        )}

            <div className="premium-title">
                <h3>Exclusive Picks</h3>
            </div>

            <div className="premium-grid">
                {premiumProduct.map((p)=>(
                    <div className="premium-card" key={p.id}>
                        <img src={p.image[0]} alt={p.title}/>

                        <div className="premium-info">
                            <h3>{p.title}</h3>
                            <p>Price: {p.price}$</p>

                            <div className="premium-catg">
                                {p.category.map((pc)=>(
                                    <span key={pc}>{pc}</span>
                                ))}
                            </div>
                            <p>Status: {p.Stock}</p>
                        </div>

                        <div className="premium-action">
                            <button onClick={()=>addCart(p)}>
                                <FaShoppingCart/>
                            </button>

                            <Link to={`/detail/${p.id}`}>Details</Link>
                        </div>

                    </div>
                ))}
            </div>
    </section>
  )
}

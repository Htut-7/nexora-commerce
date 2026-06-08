import { useEffect, useState } from "react"
import "../css/Accessories.css"
import { collection, getDocs } from "firebase/firestore";
import {db} from "../firebase/Firebase";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../Hooks/useCart";

export default function Accessories() {

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [activeTab,setActiveTab]=useState('Bags');
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

    const filterProduct=product.filter((p)=>(
        p.category?.includes('Accessories') && p.category?.includes(activeTab)
    ));

  return (
    <section className="accessories">
        <div className="accessories-container">
            <span>STYLE ESSENTIALS</span>

            <h2>Accessories Collection</h2>
            <p>
                Compelete every look with carefully selected
                accessories designed for style and functionality.
            </p>
        </div>

        {error && <p className="accessories-error">{error}</p>}

        {loading && <span className="accessories-spinner"></span>}

        <div className="accessories-tab">
            <button className={activeTab==='Bags' ? "active" : ""} onClick={()=>setActiveTab('Bags')}>
                Bags
            </button>

            <button className={activeTab==='Eyewear' ? "active" : ""} onClick={()=>setActiveTab('Eyewear')}>
                Eyewear
            </button>

            <button className={activeTab==='Watch' ? "active" : ""} onClick={()=>setActiveTab('Watch')}>
                Watch
            </button>
        </div>

        <div className="accessories-grid">
            {filterProduct.map((f)=>(
                <div className="single-accessories" key={f.id}>
                    <img src={f.image[0]} alt={f.title}/>

                    <div className="accessories-info">
                        <h3>{f.title}</h3>
                        <p>Price: {f.price}</p>

                        <div className="accessories-catg">
                            {f.category.map((fc)=>(
                                <span key={fc}>{fc}</span>
                            ))}
                        </div>
                        <p>Status: {f.Stocl}</p>
                    </div>

                    <div className="accessories-action">
                        <button onClick={()=>addCart(f)}>
                        <FaShoppingCart/>
                        </button>

                        <Link to={`/detail/${f.id}`}>Details</Link>
                    </div>

                </div>
            ))}
        </div>
    </section>
  )
}

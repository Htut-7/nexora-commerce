import { useEffect, useState } from "react";
import "../css/Shoes.css";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../firebase/Firebase";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../Hooks/useCart";

export default function Shoes() {

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [activeTab,setActiveTab]=useState('Men');
    const [shoe,setShoe]=useState([]);

    const {addCart}=useCart();

    useEffect(()=>{
        const fetchShoe=async()=>{
            try{
                setLoading(true);
                setError(null);

                const snapShot=await getDocs(collection(db,"products"));

                const data=await snapShot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setShoe(data);
                setLoading(false);

            }catch(error){
                setError(error.message)
                setLoading(false);
            }
        };
        fetchShoe();
    },[])

    const filterShoe=shoe.filter((s)=>
        s.category?.includes('Shoes') && s.category?.includes(activeTab)
    );

  return (
    <section className="shoes">
        <div className="shoes-container">
            <h2>Footwear Collection</h2>
            <p>
                Discover shoes designed for comfort,
                performance, and everyday style.
            </p>
        </div>

        {error && <p className="shoe-error">{error}</p>}

        {loading && <span className="shoe-spinner"></span>}

        <div className="shoe-tabs">
            <button className={activeTab==='Men' ? "active" : ""} onClick={()=>setActiveTab("Men")}>
                Men
            </button>

            <button className={activeTab==="Women" ? "active" : ''} onClick={()=>setActiveTab('Women')}>
                Women
            </button>

            <button className={activeTab==="Kids" ? "active" : ""} onClick={()=>setActiveTab('Kids')}>
                Kids
            </button>
        </div>

        <div className="shoe-grid">
            {filterShoe.map((fs)=>(
                <div className="filter-shoe" key={fs.id}>
                    <img src={fs.image[0]} alt={fs.title}/>

                    <div className="shoe-info">
                        <h3>{fs.title}</h3>
                        <p>Price: {fs.price}</p>

                        <div className="shoe-catg">
                            {fs.category.map((fShoe)=>(
                                <span key={fShoe}>{fShoe}</span>
                            ))}
                        </div>
                        <p>Status: {fs.Stock}</p>
                    </div>

                    <div className="shoe-action">
                        <button onClick={()=>addCart(fs)}>
                            <FaShoppingCart className="shoe-icon"/>
                        </button>

                        <Link to={`/detail/${fs.id}`}>Details</Link>
                    </div>

                </div>
            ))}
        </div>

    </section>
  )
}

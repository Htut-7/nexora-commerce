import { useEffect, useState } from "react"
import "../css/Perfume.css"
import { collection, getDocs } from "firebase/firestore";
import {db} from "../firebase/Firebase";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../Hooks/useCart";

export default function Perfume() {

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [fragrance,setFragrance]=useState([]);

    const {addCart}=useCart();

    useEffect(()=>{
        const fetchFragrance=async()=>{
            try{
                setLoading(true);
                setError(null);

                const snapShot=await getDocs(collection(db,"products"));

                const data=await snapShot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }));
                setFragrance(data);
                setLoading(false);
            }catch(error){
                setError(error.message);
                setLoading(false);
            }
        };
        fetchFragrance();
    },[])

    const filterMen=fragrance.filter((f)=>
        f?.category.includes("Male" ,"Perfume", "Fragrance")
    );

    const filterWomen=fragrance.filter((fw)=>
        fw?.category.includes("Female" , "Perfume", "Fragrance")
    );

  return (
    <section className="perfume">
        <div className="perfume-hero">
            <span>SIGNATURE SCENTS</span>

            <h2>Luxury Fragrance</h2>
            <p>Discover fragrance crafted to leave a lasting impression.</p>
        </div>

        {error && <p className="perfume-error">{error}</p>}

        {loading && <span className="perfume-spinner"></span>}

        <div className="perfume-section">
            <h3>Men's Fragrance</h3>

            <div className="fragrance-grid">
                {filterMen.map((fm)=>(
                    <div className="single-fragrance" key={fm.id}>
                        <img src={fm.image[0]} alt={fm.title}/>

                        <div className="fragrance-info">
                            <h3>{fm.title}</h3>
                            <p>Price: {fm.price}</p>

                            <div className="fragrance-catg">
                                {fm?.category.map((fmc)=>(
                                    <span key={fmc}>{fmc}</span>
                                ))}
                            </div>
                            <p>Status: {fm.Stock}</p>
                        </div>

                            <div className="fragrance-action">
                                <button onClick={()=>addCart(fm)}>
                                    <FaShoppingCart/>
                                </button>

                                <Link to={`/detail/${fm.id}`}>Details</Link>
                            </div>

                    </div>
                ))}
            </div>
        </div>

        <div className="perfume-section">
            <h3>Women's Fragrnace</h3>

            <div className="fragrance-grid">
                {filterWomen.map((filterW)=>(
                    <div className="single-fragrance" key={filterW.id}>
                        <img src={filterW.image[0]} alt={filterW.title}/>

                        <div className="fragrance-info">
                            <h3>{filterW.title}</h3>
                            <p>Price: {filterW.price}</p>

                            <div className="fragrance-catg">
                                {filterW.category.map((filterC)=>(
                                    <span key={filterC}>{filterC}</span>
                                ))}
                            </div>
                            <p>Status: {filterW.Stock}</p>
                        </div>

                        <div className="fragrance-action">
                            <button onClick={()=>addCart(filterW)}>
                                <FaShoppingCart/>
                            </button>

                            <Link to={`/detail/${filterW.id}`}>Details</Link>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

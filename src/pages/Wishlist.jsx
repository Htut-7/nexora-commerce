import { useEffect } from "react";
import "../css/wishlist.css";
import useWishlist from "../Hooks/useWishlist";
import { FaTrash } from "react-icons/fa";

export default function Wishlist() {

    let {loading,error,getWishList,wishlist}=useWishlist();

    useEffect(()=>{
        getWishList()
    },[])

  return (
    <div className="wishlist">
        <div className="wishlist-container">
            <h3>Your Wishlist</h3>
            <p>Curated pieces you've saved for later.</p>

            {error && <p className="wishlist-error">{error}</p>}

            {!loading && wishlist.length===0 && (
                <p>No Wishlist yet</p>
            )}

            {loading && <span className="wishlist-spinner"></span>}

            <div className="wishlist-grid">
                {wishlist.map((w)=>(
                    <div className="single-wishlist" key={w.id}>
                        <img src={w.image[0]} alt={w.title}/>

                        <div className="wishlist-info">
                            <h3>{w.title}</h3>
                            <p>Price: {w.price}</p>
                            <div className="wishlist-catg">
                                {w.category?.map((wc)=>(
                                    <span key={wc}>{wc}</span>
                                ))}
                            </div>
                            <span>Status: {w.status}</span>
                        </div>

                        <div className="wish-btn">
                            <button>
                                <FaTrash className="wish-icon"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

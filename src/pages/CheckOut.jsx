import { useState } from "react";
import {auth} from "../firebase/Firebase";
import "../css/CheckOut.css";
import { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import {db} from "../firebase/Firebase";

export default function CheckOut() { 
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');
    const [payment,setPayment]=useState("Cash on Delivery");
    const { cart, setCart } = useContext(CartContext);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const navigate=useNavigate();

    const totalItems=cart.reduce(
        (sum,item)=>sum +item.quantity,
        0
    );

    const totalPrice=cart.reduce(
        (sum,item)=>
            sum + Number(item.price) * item.quantity,
        0
    );

    const handleOrder=async()=>{
        try{
            
            setLoading(true);
            setError(null);

                await addDoc(collection(db,"orders"),{
                userId: auth.currentUser.uid,
                customerName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                phone,
                address,
                paymentMethod: payment,
                items: cart,
                totalItems,
                totalPrice,
                status: "Pending",
                createdAt: serverTimestamp()
            });

            console.log("Cart before delete:", cart);

            for(const item of cart){

                console.log("Deleting:", item.id);

                await deleteDoc(
                    doc(db,"cart",item.id)
                );
            }

            console.log("All cart items deleted");

            setCart([]);

            navigate("/order");
        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    }

  return (
    <div className="checkout">
        {error && <p className="checkout-error">{error}</p>}
        <form className='checkout-form'>
        <h3>Customer Information</h3>
        <div className='checkout-container'>
            <label>Username</label>
            <input type='text' placeholder='Enter your name' value={auth.currentUser?.displayName || ""} disabled/>

            <label>Email</label>
            <input type='email' placeholder='Enter your email' value={auth.currentUser?.email || ""} disabled/>

            <label>Phone Number</label>
            <input type='tel' placeholder='Enter your phone number' onChange={(e)=>setPhone(e.target.value)} value={phone}/>

            <label>Addess</label>
           <textarea placeholder='Enter your address' onChange={(e)=>setAddress(e.target.value)} value={address}/>

           <label>Payment Method</label>
           <select onChange={(e)=>setPayment(e.target.value)} value={payment}> 

            <option>
                Cash on Delivery
            </option>

            <option>
                Bank Transfer
            </option>

            <option>
                Prompt Pay
            </option>
           </select>
        </div>
    </form>

    <div className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="checkout-items">
            {cart.map((c)=>(
                <div className="single-checkout" key={c.id}>
                    <span>
                        {c.title}
                        {" "}
                        x{c.quantity}
                    </span>

                    <span>
                        ${(
                            Number(c.price) * c.quantity
                        ).toFixed(2)}
                    </span>
                </div>
            ))}
        </div>

            <div className="checkout-total">
                <div className="summary-row">
                    <span>Total Items</span>
                    <span>{totalItems}</span>
                </div>

                <div className="summary-row">
                    <span>Total Price</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </div>

            <button className="place-order-btn" onClick={handleOrder} disabled={loading} type="button">
                {loading ? <span className="checkout-spinner"></span> : "Place Order"}
            </button>

    </div>
</div>
  )
}

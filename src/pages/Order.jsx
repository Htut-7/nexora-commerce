import { useEffect, useState } from "react";
import { auth, db } from "../firebase/Firebase";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import "../css/Order.css";

export default function Order() {

  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const getOrders = async() => {
    try{
      setLoading(true);

      const q = query(
        collection(db,"orders"),
        where(
          "userId",
          "==",
          auth.currentUser.uid
        )
      );

      const snapShot = await getDocs(q);

      const data = snapShot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(data);

      setLoading(false);

    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(()=>{
    getOrders();
  },[]);

  return (
    <section className="orders">

      <h1>My Orders</h1>

      {error && (
        <p className="order-error">
          {error}
        </p>
      )}

      {loading && (
        <span className="order-spinner"></span>
      )}

      {!loading && orders.length === 0 && (
        <p className="order-empty">
          No orders found.
        </p>
      )}

      <div className="orders-grid">

        {orders.map((order)=>(
          <div
            className="single-order"
            key={order.id}
          >

            <div className="order-header">

              <h3>
                Order #{order.id.slice(0,8)}
              </h3>

              <span className="order-status">
                {order.status}
              </span>

            </div>

            <p>
              Payment:
              {" "}
              {order.paymentMethod}
            </p>

            <p>
              Total Items:
              {" "}
              {order.totalItems}
            </p>

            <p>
              Total:
              {" "}
              ${order.totalPrice.toFixed(2)}
            </p>

            <div className="order-items">

              {order.items?.map((item,index)=>(
                <div
                  className="order-item"
                  key={index}
                >

                  <span>
                    {item.title}
                    {" "}
                    x{item.quantity}
                  </span>

                  <span>
                    $
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}
                  </span>

                </div>
              ))}

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
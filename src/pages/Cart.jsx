import { useEffect } from "react";
import "../css/Cart.css";
import useCart from "../Hooks/useCart";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {

  let {loading,error,getCart,cart,deleteCart,updateCart}=useCart();

  useEffect(()=>{
    getCart()
  },[]);
  
  const total = cart.reduce(
  (sum, item) => sum + Number(item.price) * item.quantity,
  0
  );

  return (
    <section className="cart">

      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <p>Review your items before proceeding to checkout.</p>
      </div>

      {error && <p className="cart-error">{error}</p>}

      {loading && <span className="cart-spinner"></span>}

      {!loading && cart.length === 0 && (
        <p className="cart-empty">
          No items in cart
        </p>
      )}

      {!loading && cart.length > 0 && (

        <div className="cart-layout">

          <div className="cart-items">

            {cart.map((c) => (

              <div className="single-cart" key={c.id}>

                <img src={Array.isArray(c.image) ? c.image[0] : c.image} alt={c.title} />

                <div className="cart-info">

                  <h3>{c.title}</h3>

                  <p className="cart-price">
                    ${c.price}
                  </p>

                  <div className="cart-catg">
                    {c.category?.map((cg) => (
                      <span key={cg}>{cg}</span>
                    ))}
                  </div>

                </div>

                <div className="cart-actions">

                  <div className="cart-quantity">

                    <button
                      onClick={() =>
                        updateCart(
                          c.id,
                          Math.max(1, c.quantity - 1)
                        )
                      }
                    >
                      -
                    </button>

                    <span>{c.quantity}</span>

                    <button
                      onClick={() =>
                        updateCart(
                          c.id,
                          c.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteCart(c.id)}
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row">
              <span>Total Quantity</span>
              <span>
                {cart.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="checkout-btn"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>

      )}

    </section>
  )
}

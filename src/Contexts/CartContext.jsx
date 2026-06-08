import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";

import {
  createContext,
  useState,
  useEffect
} from "react";

import { auth, db } from "../firebase/Firebase";

const CartContext = createContext();

export default function CartContextProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCart = async () => {
    try {

      if (!auth.currentUser) return;

      setLoading(true);

      const q = query(
        collection(db, "cart"),
        where(
          "userId",
          "==",
          auth.currentUser.uid
        )
      );

      const snapShot = await getDocs(q);

      const data = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setCart(data);

      setLoading(false);

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addCart = async (product) => {
    try {

      await addDoc(collection(db, "cart"), {
        userId: auth.currentUser.uid,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        desc: product.description,
        status: product.Stock,
        quantity: 1
      });

      await getCart();

    } catch (error) {
      setError(error.message);
    }
  };

  const deleteCart = async (id) => {
    try {

      await deleteDoc(
        doc(db, "cart", id)
      );

      setCart((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {
      setError(error.message);
    }
  };

  const updateCart = async (
    id,
    quantity
  ) => {

    try {

      await updateDoc(
        doc(db, "cart", id),
        {
          quantity
        }
      );

      setCart((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity
              }
            : item
        )
      );

    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        getCart,
        addCart,
        deleteCart,
        updateCart,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export {
  CartContext,
  CartContextProvider
};
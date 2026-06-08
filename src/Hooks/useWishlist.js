import { addDoc, collection, serverTimestamp, where, query, getDocs } from "firebase/firestore";
import {db,auth} from "../firebase/Firebase";
import { useState } from "react";

export default function useWishlist() {

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [wishlist,setWishlist]=useState([]);

    const addWishlist=async(p)=>{
        try{
            setLoading(true);
            setError(null);

            await addDoc(collection(db,"wishlist"),{
                userId:auth.currentUser.uid,
                productID:p.id,
                title: p.title,
                image: p.image,
                price: p.price,
                category: p.category,
                status: p.Stock,
                createdAt: serverTimestamp()
            });
        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    }

    const getWishList=async()=>{
        try{
            setLoading(true);
            setError(null);

            const q=query(collection(db,'wishlist'),
                where("userId","==",auth.currentUser.uid)
        );

        const snapShot=await getDocs(q);
        const data=snapShot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
        }));
        setWishlist(data);
        setLoading(false);

        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    }

  return {loading,error,addWishlist,getWishList,wishlist}
}

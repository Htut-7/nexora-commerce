import { useState } from "react";
import {db,auth} from "../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function useSignIn() {

    const [loading,setLoading]=useState(false);
    const  [error,setError]=useState(null);
    const signIn=async(email,password)=>{
        try{
            setLoading(true);
            setError(null);
            let res=await signInWithEmailAndPassword(auth,email,password);
            const userRes=doc(db,"users",res.user.uid);
            await updateDoc((userRes),{
                lastLogin: serverTimestamp()
            });
            setLoading(false);
            return res.user;
        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    }

  return {loading,error,signIn}
}

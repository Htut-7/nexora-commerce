import { useState } from "react";
import {auth} from "../firebase/Firebase";
import { signOut } from "firebase/auth";

export default function useSignOut() {

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const logOut=async()=>{
        try{
            setLoading(true);
            setError(null);
            await signOut(auth);
            setLoading(false);
            

        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    }

  return {loading,error,logOut}
}

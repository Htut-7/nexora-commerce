import { useState } from "react";
import {db,auth} from "../firebase/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function useSignUp() {

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const signUp = async (name, email, password) => {
    try {
        setLoading(true);
        setError(null);

        const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Auth success", res.user.uid);

        await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            name,
            email,
            createdAt: serverTimestamp()
        });

        await updateProfile(
            res.user,
            {
                displayName: name
            }
        );
        setLoading(false);

    } catch (error) {
    setError(error.message);
    setLoading(false);
    } finally {
        setLoading(false);
    }
};

  return {loading,error,signUp}
}

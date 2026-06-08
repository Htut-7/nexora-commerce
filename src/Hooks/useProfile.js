import { useState } from "react";
import "../css/Profile.css";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";
import { auth } from "../firebase/Firebase";

export default function useProfile() {

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const updateUser = async (
    oldPassword,
    newPassword
  ) => {

    try{

      setLoading(true);
      setError(null);

      const user = auth.currentUser;

      const credential =
        EmailAuthProvider.credential(
          user.email,
          oldPassword
        );

      await reauthenticateWithCredential(
        user,
        credential
      );

      await updatePassword(
        user,
        newPassword
      );

      setLoading(false);

      return true;

    }catch(error){

      setError(error.message);
      setLoading(false);

      return false;
    }
  };

  return {
    loading,
    error,
    updateUser
  };
}
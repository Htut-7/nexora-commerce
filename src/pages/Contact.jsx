import { useEffect, useState } from "react";
import "../css/Contact.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {db,auth} from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";

export default function Contact() {

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [subject,setSubject]=useState('');
    const [message,setMessage]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{

        if(!auth.currentUser){
            setError('Please Login First');
            return;
        }

        e.preventDefault();
        try{
            setLoading(true);
            setError(null);
            await addDoc(collection(db,"messages"),{
                userId:auth.currentUser.uid,
                name,
                email,
                subject,
                message,
                createdAt: serverTimestamp()
            });
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setLoading(false);
            navigate('/');
            alert ('Message send successfully');

        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(auth.currentUser){
            setName(auth.currentUser.displayName || "");
            setEmail(auth.currentUser.email || "");
        } 
        },[])

    if(error){
        return <p className="contact-error">{error}</p>
    }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-container">
            <h1>Get In Touch</h1>
            <p>
                Have a question about an order, product, or partnership?
                Our team is here to help. Reach out and we'll get back to
                you as soon as possible.
            </p>

            <div className="contact-input">
                <label>Full Name</label>
                <input type="text" placeholder="Enter Full Name" value={name} disabled/>

                <label>Email Address</label>
                <input type="email" placeholder="Enter Email Address" value={email} disabled/>

                <label>Subject</label>
                <input type="text" placeholder="Subject you want to tell" onChange={(e)=>setSubject(e.target.value)} value={subject}/>

                <label>Message</label>
                <textarea placeholder="How Can we help you?" onChange={(e)=>setMessage(e.target.value)} value={message}/>

                <div className="contact-btn">
                    <button type="submit" disabled={loading}>
                        {loading ? <span className="contact-spinner"></span> : "Send"}
                    </button>
                </div>
            </div>
        </div>
    </form>
  )
}
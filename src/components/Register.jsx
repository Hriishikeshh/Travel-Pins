import "./register.css"
import { Cancel,Room} from '@material-ui/icons';
import React from "react";
import { useState,useRef } from "react";
import axios from "axios";
import setShowRegister from "../App2";

export default function Register({setShowRegister}) {

    const [success,setSuccess]=useState(false);
    const [failure,setFailure]=useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newUser= {
            username: nameRef.current.value,
            email:emailRef.current.value,
            password: passwordRef.current.value
        };
        try{
            await axios.post("/users/register",newUser);
            setFailure(false);
            setSuccess(true);

            // Reset form fields
            nameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";

        }catch(err){
            setFailure(true);
        }
    };

 
    return(
    <div className="registerContainer">
        <div className="logo">
            <Room /> hrishipin</div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef}></input>
                <input type="email" placeholder="email" ref={emailRef}></input>
                <input type="password" placeholder="password" ref={passwordRef}></input>
                <button className="registerbutton">register</button>
                {success &&
                <span className="success">Successful you can login now</span>}
                {failure &&
                <span className="failure">login failed</span>}
            </form>
            <Cancel className="registercancel" onClick={()=>setShowRegister(false)}></Cancel>
        </div>)
};
import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword , onAuthStateChanged , createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../firebase.js"
import {useNavigate} from "react-router-dom"
import "./Welcome.css";
export default function Welcome() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isRegistering,setIsRegistering] = useState(false);
    const [registerInformation,setRegisterInformation] = useState({
        email : '',
        confirmEmail: '',
        password : '',
        confirmPassword : ''
    })

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user =>{
            if(user){
                navigate('/homepage');
            }
        });
    })
    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    }
    const handleSignIn = () =>{
        signInWithEmailAndPassword(auth,email,password)
        .then(() => {
            navigate('/homepage')
        }).catch((err) =>
         alert(err.message)
         );
    }
    const handleRegister = () =>{

        if(registerInformation.email!==registerInformation.confirmEmail){
            alert('Please confirm that the emails are same')
        }
        if(registerInformation.password!==registerInformation.confirmPassword){
            alert('Please confirm that the passwords are same')
        }
        createUserWithEmailAndPassword(auth,registerInformation.email,registerInformation.password).then(()=>{
            navigate('/homepage')
        }).catch((err) => alert(err.message)
        );
    }
  return (
    <div className='welcome'>
       <div className='heading'><h1>DailyDoer</h1></div>
       <div className='login-register-container'>
        {isRegistering ?
        ( <>
            <input type="email" placeholder='Email' value = {registerInformation.email} 
            onChange={(e)=> 
            setRegisterInformation({
                ...registerInformation,email : e.target.value
            })
        }
             />

            <input type="email"  placeholder='Confirm Email' value = {registerInformation.confirmEmail}
            onChange={(e)=> 
                setRegisterInformation({
                    ...registerInformation,confirmEmail : e.target.value
                })
            }
            />

            <input type="password" placeholder='Password' value = {registerInformation.password}
            onChange={(e)=> 
                setRegisterInformation({
                    ...registerInformation,password : e.target.value
                })
            }
            />

            <input type="password" placeholder='Confirm password' value = {registerInformation.confirmPassword}
            onChange={(e)=> 
                setRegisterInformation({
                    ...registerInformation,confirmPassword : e.target.value
                })
            }
             />
            <button className="register-button" onClick={handleRegister}>Register</button>
            <button className='go-back-button' onClick={() => setIsRegistering(false)}>Go back</button>
         </>)
         :
         ( <>
            <input type="email" onChange={handleEmailChange} value={email} placeholder='Email'/>
            <input type="password"  onChange={handlePasswordChange} value={password} placeholder='Password'/>
            <button className='sign-in-button' onClick={handleSignIn}>Sign in</button>
            <button className="create-account-button" onClick={() => setIsRegistering(true)}>Create an Account</button>
          </>)}
       </div>
    </div>
  )
}

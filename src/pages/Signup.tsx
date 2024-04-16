
import { IonButton, IonInput} from '@ionic/react'
import "./Login.css"
import {EventHandler, useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
//import { useHistory } from 'react-router'



export default function Login() {
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const email=useRef<HTMLIonInputElement>(null)
  const password=useRef<HTMLIonInputElement>(null)
  const passwordconfirm=useRef<HTMLIonInputElement>(null)
  const {currentUser,signup,signupWithGoogle}=useAuth()

  async function handlesubmitnormal(e:any){
    e.preventDefault()
    if (password?.current?.value !== passwordconfirm?.current?.value) {
      return setError("Passwords do not match")
    }
    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;
    if(typeof emailValue === 'string' && typeof passwordValue === 'string') {
      try{
        setError("")
        setLoading(true)
        await signup(emailValue,passwordValue)
      }catch{
        setError("Failed to Sign in")
      }
      setLoading(false)
    }
    else {
      return setError("Email and password must be provided.");
    }
  }
  
  
  async function handlesubmitgoogle(e:any){
    e.preventDefault()
    try{
      setError("")
      setLoading(true)
      await signupWithGoogle()
     // history.push("/")
    }catch{
        setError("Failed to Sign in")
      }
    setLoading(false)
  }
  
  return (
    <>
    <div style={{maxWidth:"600 px"}}>
        <p className='ion-text-center'>Login Page</p>
        <IonInput label="Email" type="email" labelPlacement="floating" fill="outline" placeholder="example@gmail.com" ref={email} required></IonInput>
          <br />
        <IonInput label="Password" type="password" labelPlacement="floating" fill="outline" placeholder="Password" ref={password} required></IonInput>
        <br />
        <IonInput label="Confrim Password" type="password" labelPlacement="floating" fill="outline" placeholder="Confirm Password" ref={passwordconfirm} required></IonInput>
        <div className='przyciski'>
          <IonButton disabled={loading} onClick={handlesubmitnormal} style={{maxWidth: '400px'}}>Sign up</IonButton>
          <IonButton disabled={loading} onClick={handlesubmitgoogle} style={{maxWidth: '400px'}}>Sign up with Google</IonButton>
          <span style={{color:"red"}}>{error}</span>
          <span style={{color:"red"}}>{JSON.stringify(currentUser)}</span>
        </div>
    </div>
    </>
  )
}


import { IonButton, IonInput} from '@ionic/react'
import "./Login.css"
import {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
//import { useHistory } from 'react-router'



export default function Login() {
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const email=useRef()
  const password=useRef()
  const passwordconfirm=useRef()
  //const history=useHistory()
  //@ts-ignore
  const {currentUser,signup,signupWithGoogle}=useAuth()

  async function handlesubmitnormal(e){
    e.preventDefault()
    //@ts-ignore
    if (password.current.value !== passwordconfirm.current.value) {
      return setError("Passwords do not match")
    }
    try{
      setError("")
      setLoading(true)
    //@ts-ignore
      await signup(email.current.value,password.current.value)
     // history.push("/")
    }catch{
      setError("Failed to Sign in")
    }
    setLoading(false)
  }
  
  
  async function handlesubmitgoogle(e){
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

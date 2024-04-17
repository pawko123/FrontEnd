import { IonButton, IonInput } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";


export default function Login() {
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const email=useRef<HTMLIonInputElement>(null)
    const password=useRef<HTMLIonInputElement>(null)
    const {currentUser,signupWithGoogle,login}=useAuth()
    const history = useHistory()
    
    useEffect(() => {
        if (currentUser) {
          history.push('/Home');
        }
      }, [currentUser, history]);

    async function handlesubmitnormal(e:any){
        e.preventDefault()
        const emailValue = email.current?.value;
        const passwordValue = password.current?.value;
        if(typeof emailValue === 'string' && typeof passwordValue === 'string') {
          try{
            setError("")
            setLoading(true)
            await login(emailValue,passwordValue)
            history.push("/Home")
          }catch{
            setError("Failed to Log in")
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
          history.push("/Home")
        }catch{
            setError("Failed to Log in")
          }
        setLoading(false)
      }

  return (
    <>
    <div style={{maxWidth:"600 px"}}>
        {error}
        <p className='ion-text-center'>Log in Page</p>
        <IonInput label="Email" type="email" labelPlacement="floating" fill="outline" placeholder="example@gmail.com" ref={email} required></IonInput>
          <br />
        <IonInput label="Password" type="password" labelPlacement="floating" fill="outline" placeholder="Password" ref={password} required></IonInput>
        <div className='przyciski'>
          <IonButton disabled={loading} onClick={handlesubmitnormal} style={{maxWidth: '400px'}}>Log in</IonButton>
          <IonButton disabled={loading} onClick={handlesubmitgoogle} style={{maxWidth: '400px'}}>Log in with Google</IonButton>
        <p className='ion-text-center'>Don't have an account?<a href='/Signup'>Sign up</a></p>
        </div>
    </div>
    </>
  )
}

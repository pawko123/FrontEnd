
import { IonButton, IonInput} from '@ionic/react'
import { useEffect, useRef, useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router'

export default function Signup() {
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const email=useRef<HTMLIonInputElement>(null)
  const password=useRef<HTMLIonInputElement>(null)
  const passwordconfirm=useRef<HTMLIonInputElement>(null)
  const {currentUser,signup,signupWithGoogle,logout}=useAuth()
  const history = useHistory()

  useEffect(() => {
    if (currentUser) {
      history.push('/Home');
    }
  }, [currentUser, history]);

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
        await logout()
        history.push("/Login")
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
      await logout()
      history.push("/Login")
    }catch{
        setError("Failed to Sign in")
      }
    setLoading(false)
  }
  
  return (
    <>
    <div style={{maxWidth:"600 px"}}>
        {error && <span>{error}</span>}
        <p className='ion-text-center'>Sign in Page</p>
        <IonInput label="Email" type="email" labelPlacement="floating" fill="outline" placeholder="example@gmail.com" ref={email} required></IonInput>
          <br />
        <IonInput label="Password" type="password" labelPlacement="floating" fill="outline" placeholder="Password" ref={password} required></IonInput>
        <br />
        <IonInput label="Confrim Password" type="password" labelPlacement="floating" fill="outline" placeholder="Confirm Password" ref={passwordconfirm} required></IonInput>
        <div className='przyciski'>
          <IonButton disabled={loading} onClick={handlesubmitnormal} style={{maxWidth: '400px'}}>Sign up</IonButton>
          <IonButton disabled={loading} onClick={handlesubmitgoogle} style={{maxWidth: '400px'}}>Sign up with Google</IonButton>
        <p className='ion-text-center'>Already have an account?<a href='/Login'>Login</a></p>
        <p className='ion-text-center'>Return to HomePage <a href='/Home'>Home</a></p>
        </div>
    </div>
    </>
  )
}

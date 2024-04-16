import React ,{useContext, useEffect, useState } from 'react';
import {auth, googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

// @ts-ignore
const AuthContext=React.createContext()


export function useAuth(){
  // @ts-ignore
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading,setLoading]=useState(true)
  
    function signupWithGoogle(){
      return signInWithPopup(auth,googleProvider)
    }
    
    
    function signup(email,password){
      //@ts-ignore
      return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
      const unsubscribe= auth.onAuthStateChanged(user=>{
        //@ts-ignore
        setCurrentUser(user)
        setLoading(false)
      })
      return unsubscribe
    },[])

    const value={
      currentUser,
      signup,
      signupWithGoogle
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

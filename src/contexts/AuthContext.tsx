import React ,{ReactNode, useContext, useEffect, useState } from 'react';
import {auth, googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup,User } from 'firebase/auth';

// @ts-ignore
const AuthContext=React.createContext({currentUser: {} as User | null
                                      ,signup:(e:string,p:string)=>{}
                                      ,signupWithGoogle:()=>{}})

interface Props {
  children?: ReactNode
}

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}:Props) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading,setLoading]=useState(true)
  
    function signupWithGoogle(){
      return signInWithPopup(auth,googleProvider)
    }
    
    
    function signup(email:string,password:string){
      return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
      const unsubscribe= auth.onAuthStateChanged(user=>{
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

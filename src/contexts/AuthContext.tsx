import React ,{ReactNode, useContext, useEffect, useState } from 'react';
import {auth, googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,User } from 'firebase/auth';

// @ts-ignore
const AuthContext=React.createContext({currentUser: {} as User | null
                                      ,signup:(_e:string,_p:string)=>{}
                                      ,signupWithGoogle:()=>{}
                                      ,logout:()=>{}
                                      ,login:(_e:string,_p:string)=>{}})

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

    function logout(){
      return auth.signOut()
    }

    function login(email:string,password:string){
      return signInWithEmailAndPassword(auth,email,password)
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
      signupWithGoogle,
      logout,
      login
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

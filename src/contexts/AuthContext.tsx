import React ,{ReactNode, useContext, useEffect, useState } from 'react';
import {auth, googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,User } from 'firebase/auth';
import axios from 'axios';

// @ts-ignore
const AuthContext=React.createContext({currentUser: {} as User | null
                                      ,isadmin: {} as boolean
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
    const [isadmin,setisadmin]=useState<boolean>(false)


  
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
        axios.get(`http://localhost:5000/admins/${user?.email}`)
        .then(res => {setisadmin(res.data.isAdmin)}).
        catch(err => console.log(err))
        setCurrentUser(user)
        setLoading(false)
      })
      return unsubscribe
    },[])

    const value={
      currentUser,
      isadmin,
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

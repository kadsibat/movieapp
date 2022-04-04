import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState,useEffect } from "react";
import { auth } from "../auth/firebase-config";

export const AuthContext = createContext()

const AuthContextProvider = (props) =>{
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
     onAuthStateChanged(auth, (currentUser)=>{
         setCurrentUser(currentUser)
     })
    }, [])
    


    return(
        <AuthContext.Provider value={{currentUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
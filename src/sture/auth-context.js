import React from "react";
import { useState } from "react";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
});

export const AuthContextProvider=(props)=>
{
   const initialToken=localStorage.getItem('token')

   const [isToken,setToken]=useState(initialToken)

   const userIsLoggedIn=!!isToken;

   const loginHandler=(isToken)=>{
    setToken(isToken)
    localStorage.setItem('token',isToken)
   }

   const logoutHandler=()=>
   {
    setToken(null)
    localStorage.removeItem('token')
   }

   const context={
    token:isToken,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler
   }

    return(
    <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;


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
   const [isToken,setToken]=useState(null)

   const userIsLoggedIn=!!isToken;

   const loginHandler=(isToken)=>{
    setToken(isToken)
   }

   const logoutHandler=()=>
   {
    setToken(null)
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


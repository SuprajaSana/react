import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  const [isLogin, setIsLogin] = useState(true);
  const [isSendingRequest,setSendingRequest]=useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;

    setSendingRequest(true)

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUBxdcpTl3dsdRWOLPWwE-R_c1i7gbMsA",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        setSendingRequest(false)
        if (response.ok) {
            console.log(response)
        } else {
          response.json().then((data) => {
            let errorMessage='Authentication Failed!';
            if(data && data.error && data.error.message)
            {
                errorMessage=data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isSendingRequest && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {isSendingRequest && <p>Sending Request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

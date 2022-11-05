import { useContext, useRef } from 'react';
import AuthContext from '../../sture/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const passwordChangeRef=useRef('')
  const authCtx=useContext(AuthContext)

  const submitHandler=(event)=>
  {
     event.preventDefault();
   
     const passwordChanged=passwordChangeRef.current.value;
     
     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCUBxdcpTl3dsdRWOLPWwE-R_c1i7gbMsA',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:passwordChanged,
        returnSecureToken:true
      })
     }).then((response)=>{
          console.log(1)
     })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='6' ref={passwordChangeRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

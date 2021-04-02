import React from 'react';

export function SignIn() {

    const signInWithGoogle = () => {
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <p>Do not violate the community guidelines or you will be banned for life!</p>
      </>
    )
  
  }
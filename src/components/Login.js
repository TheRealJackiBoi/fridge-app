import firebase from '../firebase.js'

export function Login(props) {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      props.auth.signInWithPopup(provider);
    }
    return(
      <button className="sign-in" onClick={signInWithGoogle}>Login</button>
    )
}


export function SignOut(props) {
    return props.auth.currentUser && (
        <li><button className="sign-out" onClick={() => props.auth.signOut()} >Sign Out</button></li>
      )
  }
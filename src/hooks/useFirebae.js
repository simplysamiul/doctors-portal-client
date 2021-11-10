import initializeAuth from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  onAuthStateChanged, signOut, GoogleAuthProvider,getIdToken, signInWithPopup, updateProfile  } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";


// Initialize firebase app
initializeAuth();

const useFirebase = () =>{
const [user, setUser] = useState({});
const [isLoading, setIsLoading] = useState(true);
const [authError, setAuthError] = useState("");
const [admin, setAdmin] = useState(false);
const [token, setToken] = useState("");

const auth = getAuth();

// Google Provider
const googleProvider = new GoogleAuthProvider();

// Create user
const registarUser = (email, password, name, history) =>{
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setAuthError('');
        const newUser = {email, displayName : name};
        setUser(newUser);
        // save user to the database
        saveUser(email, name, "POST");
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
          }).catch((error) => {
          });
        history.replace('/');
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(()=> setIsLoading(false));
};

// Login user
const loginUser = (email, password, location, history) =>{
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const destination = location?.state?.from || '/';
        history.replace(destination);
        setAuthError('');
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(()=> setIsLoading(false));
};

// Google Login
const signInWithGoogle = (location, history) =>{
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
        const destination = location?.state?.from || '/';
        history.replace(destination);
        setAuthError('');
        // save user to the database
        saveUser(user.email, user.displayName, "PUT");
      }).catch((error) => {
        setAuthError(error.message);
      })
      .finally(()=> setIsLoading(false));
}

// Observe user state
useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, user =>{
        if(user){
            setUser(user);
            getIdToken(user)
            .then( idToken =>{
              setToken(idToken);
            } )
        }
        else{
            setUser({});
        }
        setIsLoading(false);
    });
    return () => unSubscribe;
},[auth]);

// Admin check
useEffect(()=>{
const url = `http://localhost:5000/users/${user.email}`
fetch(url)
.then(res => res.json())
.then(data => setAdmin(data.admin))
},[user.email]);
// Log Out 
const logOut = () =>{
    setIsLoading(true);
    signOut(auth)
    .then(()=>{

    })
    .finally(()=> setIsLoading(false));
};

const saveUser = (email, displayName, method) =>{
    const user  = { email, displayName };
    fetch("http://localhost:5000/users", {
      method : method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(user)

    })
    .then()
}
return{
    user,
    isLoading,
    registarUser,
    loginUser,
    signInWithGoogle,
    admin,
    token,
    logOut,
    authError
}
};
export default useFirebase;
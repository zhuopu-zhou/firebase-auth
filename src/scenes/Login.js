import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../ConnectAuth";

export default function Login({ setUser, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  useEffect(() => {
    const localUser = localStorage.getItem("displayName");

    console.log('localUser from LS',localUser);

    if(localUser)setUser(localUser)
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        //navigate to home page
        navigate("/");
      })
      .catch(alert);
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user)
        localStorage.setItem("displayName", result.user.displayName);
        localStorage.setItem("img", result.user.photoURL);
        localStorage.setItem("email", result.user.email);
        


        console.log(result.user.displayName);
        navigate("/");
      })
      .catch(alert);
  };

  console.log(user);

  return (
    <>
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Login" />
      </form>
      <button
        onClick={handleGoogleLogin}
        style={{ backgroundColor: "black", color: "white", border: "none" }}
      >
        Sign in with Google
      </button>
      <p>
        Not a user? <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
}

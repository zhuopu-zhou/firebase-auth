import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Welcome({ user, setUser }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => console.error(err));
    // const auth = getAuth(app);
    // signOut(auth)
    //   .then(() => {
    //     navigate("/login");
    //   })
    //   .catch(alert);
  };

  return (
    <>
      <h1>Welcome</h1>
      <h2>{localStorage.getItem("img") || localStorage.getItem("email")}</h2>
      {localStorage.getItem("img") && (
        <img
          src={localStorage.getItem("img")}
          alt="Profile picture of logged-in user"
        />
      )}
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}

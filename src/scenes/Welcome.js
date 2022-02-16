export default function Welcome({ user }) {
  return (
    <>
      <h1>Welcome</h1>
      <h2>{user.display || user.email}</h2>
      {user.photoURL && (
        <img src={user.photoURL} alt="Profile picture of logged-in user" />
      )}
    </>
  );
}

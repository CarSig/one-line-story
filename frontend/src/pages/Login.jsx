import users from "@data/users";
import useLogin from "@hooks/useLogin";
const Login = ({ socket }) => {
  const { loggedUsers, handleLogin, getButtonStyle } = useLogin(socket);

  return (
    <div>
      <h1>Login</h1>
      <div className="user-login-container">
        {users.map((user, index) => (
          <button key={user.id} className="user-login" onClick={() => handleLogin(user, index)} style={getButtonStyle(index)}>
            <h2>{user.username}</h2>
            {loggedUsers[index] && <p>player selected</p>}
            <img src={user.image} alt={user.username} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;

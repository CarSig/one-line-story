import { useAuth } from "@context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  return (
    <header>
      <a href="/">
        <h4>Logout</h4>
      </a>
      <div>
        <p> {user?.username}</p>
        <img src={user?.image} alt={user?.username} />
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = (socket) => {
  const [loggedUsers, setLoggedUsers] = useState([null, null, null]);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (user, index) => {
    navigate("/");
    login(user);
    if (loggedUsers[index] === null) {
      socket.emit("click", { buttonIndex: index });
    }
  };

  useEffect(() => {
    socket.on("updateUsers", (loggedUsers) => {
      setLoggedUsers(loggedUsers);
    });

    // Cleanup socket listener on component unmount
    return () => {
      socket.off("updateUsers");
    };
  }, [socket]);

  const getButtonStyle = (index) => {
    if (loggedUsers[index] !== null) {
      return {
        filter: "grayscale(100%)",
        cursor: "not-allowed",
        pointerEvents: "none",
        scale: "0.85",
        opacity: "0.8",
      };
    }
    return {};
  };

  return {
    loggedUsers,
    handleLogin,
    getButtonStyle,
  };
};

export default useLogin;

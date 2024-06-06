import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import App from "./App.jsx";
import "./scss/index.scss";

const socket = io("http://localhost:3001");

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <App socket={socket} />
  // </React.StrictMode>
);

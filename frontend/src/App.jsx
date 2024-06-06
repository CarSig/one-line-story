import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Story, NotFound } from "@pages";
import PrivateRoute from "@pages/utils/PrivateRoute";
import { AuthProvider } from "@context/AuthContext";
import ErrorBoundary from "@templates/ErrorBoundary";
import Header from "@templates/Header";

function App({ socket }) {
  const [, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} socket={socket} />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home socket={socket} />} />
            <Route
              path="/stories/:id"
              element={
                <ErrorBoundary>
                  <Story socket={socket} />
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

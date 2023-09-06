import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: null,
    token: "",
  });

  // axios config
  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = sessionStorage.getItem("auth");

    if (data) {
      const parsed = JSON.parse(data);
      setAuth({ ...auth, user: parsed.username, token: parsed.token });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

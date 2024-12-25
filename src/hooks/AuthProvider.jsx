import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accountToken") || "");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const loginAction = async (username, password) => {
    try {
      const response = await fetch("https://medihack2024.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const res = await response.json();
      console.log(res);
      if (res.token) {
        setLoginError(false);
        setUser(res.username);
        setToken(res.token);
        localStorage.setItem("accountToken", res.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      setLoginError(true);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    setLoginError(false);
    localStorage.removeItem("accountToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, loginError }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
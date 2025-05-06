import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./auth-context"; // Import the context

let logoutTimer;

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

 

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({ 
        userId: uid, 
        token,
        expiration: tokenExpirationDate.toISOString()
      })
    )
  }, []);
  
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);


useEffect(() => {
  if (token && tokenExpirationDate) {
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
    logoutTimer = setTimeout(logout, remainingTime);
  } else {
    clearTimeout(logoutTimer);
  }
}, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

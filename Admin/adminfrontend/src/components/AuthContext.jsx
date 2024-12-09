import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedTokens = localStorage.getItem('tokens');
    return storedTokens ? JSON.parse(storedTokens) : { isAuthenticated: false, user: null };
  });

  useEffect(() => {
    localStorage.setItem('tokens', JSON.stringify(auth));
  }, [auth]);

  const login = (userData, tokens) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      ...tokens,
    });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem('tokens');
  };

  const refreshAccessToken = async () => {
    const storedTokens = JSON.parse(localStorage.getItem('tokens'));
    if (!storedTokens) {
      logout();
      return;
    }

    const { refreshToken, user } = storedTokens;
    const userId = user?.userId;

    if (typeof userId !== 'string' || !userId) {
      console.error("Error refreshing access token: Invalid or missing user ID.");
      logout();
      return;
    }

    try {
      const response = await axios.post('https://localhost:5001/api/Auths/refreshtoken', {
        refreshToken,
        userId,
      });

      if (response.data && response.data.token) {
        // Set only the new accessToken in state and leave other values unchanged
        setAuth(prevAuth => ({
          ...prevAuth,
          accessToken: response.data.token.accessToken,
          accessTokenExpiresAt: response.data.token.accessTokenExpiresAt, // Set accessTokenExpiresAt > current time to trigger a refresh
        }));
        
        // Update only the accessToken in local storage
        localStorage.setItem('tokens', JSON.stringify({
          ...storedTokens,
          accessToken: response.data.token.accessToken,
          accessTokenExpiresAt: response.data.token.accessTokenExpiresAt, // Set accessTokenExpiresAt > current time to trigger a refresh
        }));
      }
    } catch (error) {
      console.error("Error refreshing access token:", error.response || error.message);
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const accessTokenExpiresAt = new Date(auth.accessTokenExpiresAt).getTime();
      const refreshTokenExpiresAt = new Date(auth.refreshTokenExpiresAt).getTime();

      if (currentTime >= accessTokenExpiresAt) {
        refreshAccessToken();
      }

      if (currentTime >= refreshTokenExpiresAt) {
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

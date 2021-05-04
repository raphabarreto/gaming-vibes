import { createContext, useEffect, useState } from 'react';
import netlifyIdentify from 'netlify-identity-widget';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentify.on('login', (user) => {
      setUser(user);
      netlifyIdentify.close();
      console.log('login event');
    });

    netlifyIdentify.on('logout', () => {
      setUser(null);
      console.log('logout event');
    });

    netlifyIdentify.on('init', (user) => {
      setUser(user);
      setAuthReady(true);
      console.log('init event');
    });

    netlifyIdentify.init();

    return () => {
      netlifyIdentify.off('login');
      netlifyIdentify.off('logout');
    };
  }, []);

  const login = () => {
    netlifyIdentify.open();
  };

  const logout = () => {
    netlifyIdentify.logout();
  };

  const context = {
    user,
    login,
    logout,
    authReady,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

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

  useEffect(() => {
    netlifyIdentify.on('login', (user) => {
      setUser(user);
      netlifyIdentify.close();
      console.log('logging');
    });

    netlifyIdentify.init();
  }, []);

  const login = () => {
    netlifyIdentify.open();
  };

  const context = {
    user,
    login,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

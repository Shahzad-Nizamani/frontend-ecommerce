import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    window.location.href = '/auth/login';
  }, []);
  return null;
};

export default LoginPage;
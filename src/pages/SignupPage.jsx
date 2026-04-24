import { useEffect } from 'react';

const SignupPage = () => {
  useEffect(() => {
    window.location.href = '/auth/signup';
  }, []);
  return null;
};

export default SignupPage;
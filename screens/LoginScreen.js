import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../utils/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  async function signInHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      await login({email, password});
      setIsAuthenticating(false);
      if (response.status === 200) {
        // Navigate to the "LoginScreen"
        console.log('User login successful');
      } else {
          // Handle other response statuses if needed
          console.log('User login failed');
        }
    } catch (err) {
      console.log(err);
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={'Logging you...'}/>;
  }
  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;

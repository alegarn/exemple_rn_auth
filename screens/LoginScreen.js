import AuthContent from '../components/Auth/AuthContent';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../utils/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';



function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signInHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const response = await login({email, password});
      console.log("response login screen", response);
      setIsAuthenticating(false);
      if (response.status === 200) {
        // Navigate to the "LoginScreen" set in App.js
        console.log('User login successful');
      } else {
          console.log(response);
          Alert.alert('Invalid input', `${response}`);
          setIsAuthenticating(false);
        };
    } catch (err) {
      console.log(err);
      Alert.alert('There is an error', err);
      setIsAuthenticating(false);
    };
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={'Logging you...'}/>;
  }
  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;

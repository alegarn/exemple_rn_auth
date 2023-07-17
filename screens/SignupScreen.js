import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';


function SignupScreen({navigation}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  async function signUpHandler({email, password, confirmPassword}) {
    setIsAuthenticating(true);
    try {
      await createUser({email, password, confirmPassword});
      setIsAuthenticating(false);
      if (response.status === 200) {
        // Navigate to the "LoginScreen"
        navigation.navigate('Login');
        } else {
          // Handle other response statuses if needed
          console.log('User creation failed');
        }
    } catch (err) {
      console.log(err);
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={'Creating user...'}/>;
  }

  return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;

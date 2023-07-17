import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser, login } from '../utils/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen({navigation}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  async function signUpHandler({email, password, confirmPassword}) {
    setIsAuthenticating(true);
    try {

      const {response, status, token, expiry, access_token} = await createUser({email, password, confirmPassword});

      setIsAuthenticating(false);
      if (status === 200) {
        authContext.authenticate(token, expiry, access_token);
        const authentification = await login({email, password});
        if (authentification.status === 200) {
          console.log('authentification signup screen', authentification);
          console.log('User login successful');
        }
        } else {
          Alert.alert('User creation failed', 'Please retry later.');
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

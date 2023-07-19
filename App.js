import { useContext, useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CameraScreen from './screens/CameraScreen';

import IconButton from './components/ui/IconButton';

import { Colors } from './constants/styles';
import AuthContextProvider from './store/auth-context';

import { AuthContext } from './store/auth-context';
import LoadingOverlay from './components/ui/LoadingOverlay';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({tintColor}) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={authContext.logout}/>)
      }}/>
      <Stack.Screen name="Camera" component={CameraScreen} options={{
        headerRight: ({tintColor}) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={({navigation}) => navigation.goBack()}/>)
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authContext.IsAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


function Root() {
  const [isTryingLogging, setIsTryingLogging] = useState(true);
  const authContext = useContext(AuthContext);


  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token')
      if (storedToken) {
        authContext.tokenAuthentication(storedToken);
      }
      setIsTryingLogging(false);
    };
    fetchToken();

  })

  if (isTryingLogging) {
    return <LoadingOverlay />
  }

  return <Navigation />

};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import ExpensesList from '../components/ExpensesList';
import Button from '../components/ui/Button';


function WelcomeScreen({navigation}) {
  const userContext = useContext(AuthContext);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Button title="Image Picker" onPress={() => navigation.navigate('Camera')}>Image Picker </Button>
      <Text>You authenticated successfully!</Text>
      <ExpensesList userContext={userContext} />


    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

import { View, Text, StyleSheet } from 'react-native';
import { getExpenses } from '../utils/requests';
import Button from './ui/Button';
import { useState } from 'react';


export default function ExpensesList({userContext}) {

  const [expenses, setExpenses] = useState([]);

  async function expensesHandler() {
    console.log("userContext", userContext);
    const response = await getExpenses({ token: userContext.token, uid: userContext.uid, userId: userContext.userId, expiry: userContext.expiry, access_token: userContext.access_token, client: userContext.client});
    const expenses = response.data;
    setExpenses(expenses);
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Expenses!</Text>
      <Button onPress={expensesHandler}> Expenses </Button>
      {(expenses.length > 0) ? (
        <View>
          {expenses.map((expense) => (
            <View key={expense.id}>
              <Text>Name: {expense.title}</Text>
              <Text>Amount: {expense.amount}</Text>
              <Text>Date: {expense.date}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text>No expenses yet!</Text>
        </View>
      )}
    </View>
  );
};

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
})

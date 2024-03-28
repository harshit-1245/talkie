import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './navigation';
import { GlobalContextProvider } from './context/globalContext';

export default function App() {
  return (
    <GlobalContextProvider>
    <NavigationContainer>
      <MyTabs/>
     
    </NavigationContainer>
    </GlobalContextProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

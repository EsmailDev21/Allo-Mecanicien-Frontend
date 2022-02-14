
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import Services from './pages/Services';
import AccountSettings from './pages/AccountSettings';
import { ToastProvider } from 'react-native-toast-notifications'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {Provider as PaperProvider} from 'react-native-paper'
import CompleteSignup from './pages/Mecanicien/CompleteSignup';
import Panel from './pages/Mecanicien/Panel';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <PaperProvider>
    <ToastProvider placement="top"
    duration={5000}
    animationType='slide-in'
    animationDuration={250}
    successColor="green"
    dangerColor="red"
    warningColor="orange"
    normalColor="gray"
    icon={<AntDesign name="notification" size={24} color="white" />}
    successIcon={<FontAwesome5 name="smile-wink" size={24} color="white" />}
    dangerIcon={<FontAwesome5 name="sad-tear" size={24} color="white" />}
    warningIcon={<AntDesign name="warning" size={24} color="black" />}
    textStyle={{ fontSize: 20 }}
    offset={50} // offset for both top and bottom toasts
    offsetTop={30}
    offsetBottom={40}
    swipeEnabled={true}>
    <Provider store={store}>
       <NavigationContainer>
    <Stack.Navigator initialRouteName='Landing'>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown:false }}
      />
      <Stack.Screen options={{ headerShown:false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown:false }} name="Signup" component={Signup} />
      <Stack.Screen options={{ headerShown:false }} name="Home" component={Home} />  
      <Stack.Screen options={{ headerShown:false }} name="Services" component={Services} />  
      <Stack.Screen options={{ headerShown:false }} name="Account" component={AccountSettings} />  
      <Stack.Screen options={{ headerShown:false }} name="CompleteRegister" component={CompleteSignup} />  
      <Stack.Screen options={{ headerShown:false }} name="MecanicienPanel" component={Panel} />
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  </ToastProvider>
  </PaperProvider>
  );
};



export default App;

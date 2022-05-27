//Fichier app.js de l'application

//Import des modules necessaires
import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, LogBox } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './src/firebase/config';

//import des pages
import Menu from './src/screens/HomeScreen';
import Ajouter from './src/screens/CreateScreen';
import Modifier from './src/screens/UpdateScreen';
import Historique from './src/screens/AddScreen';
import Astuces from './src/screens/InfoScreen';
import Détail from './src/screens/ShowScreen';
import Utilisateur from './src/screens/UserScreen/UserScreen';
import Login from './src/screens/CnxScreen/LoginScreen';
import Signup from './src/screens/CnxScreen/RegistrationScreen';

const Stack = createStackNavigator();

//Pages de l'application
function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Menu' component={Menu} />
      <Stack.Screen name='Ajouter' component={Ajouter} />
      <Stack.Screen name='Détail' component={Détail} />
      <Stack.Screen name='Historique' component={Historique} />
      <Stack.Screen name='Modifier' component={Modifier} />
      <Stack.Screen name='Utilisateur' component={Utilisateur} />
      <Stack.Screen name='Astuces' component={Astuces} />
    </Stack.Navigator>
  );
}

//Pages de connexion
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  LogBox.ignoreLogs(['Warning: ...']);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
    {user ? <MenuStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

//Setup de l'application
export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}



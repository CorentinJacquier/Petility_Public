//Import des modules pour la page de connexion
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles/styles';
import AppLoading from 'expo-app-loading';
import { useFonts, Nunito_400Regular, Nunito_700Bold, } from '@expo-google-fonts/nunito';

//Import de la config de la base de données
import { auth } from '../../firebase/config'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
      });
    
    //Gestion de la connexion des utilisateurs
    const onHandleLogin = () => {
      if (email !== '' && password !== '') {
        var modemail = email.replace(/ /g, "");
        signInWithEmailAndPassword(auth, modemail, password)
          .then(() => console.log('Login success'))
          .catch(err => Alert.alert(`Erreur : ${err}`));
      }
    };
  
     //Affichage des éléments la page
     if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/login.png')}
                />
                <Text style={styles.title}>Connexion</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Mot de passe'
                    onChangeText={(pass) => setPassword(pass)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => onHandleLogin()}>
                    <Text style={styles.buttonTitle}>Se connecter</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Vous n'avez pas de compte? <Text onPress={() => navigation.navigate('Signup')} style={styles.footerLink}>Créer un compte ici</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
  }
}
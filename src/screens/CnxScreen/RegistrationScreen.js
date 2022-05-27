//Import des modules pour la page d'enregistrement
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles/styles';
import AppLoading from 'expo-app-loading';
import { useFonts, Nunito_400Regular, Nunito_700Bold, } from '@expo-google-fonts/nunito';

//Import de la config de la base de données
import { auth } from '../../firebase/config'

export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
      });
    
    //Gestion de la creation de compte utilisateurs
    const onHandleSignup = () => {
      if (email !== '' && password !== '') {
        var modemail = email.replace(/ /g, "");
        createUserWithEmailAndPassword(auth, modemail, password)
          .then(() => console.log('Signup success'))
          .catch(err => Alert.alert(`${err.replace('Firebase:','')}`));
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
                    source={require('../../../assets/register.png')}
                />
                <Text style={styles.title}>Créer un compte</Text>
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
                    onPress={() => onHandleSignup()}>
                    <Text style={styles.buttonTitle}>Créer le compte</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Vous avez déjà un compte? <Text onPress={() => navigation.navigate("Login")} style={styles.footerLink}>Connectez-vous ici</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
 }
}
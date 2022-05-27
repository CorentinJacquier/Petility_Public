//Import des modules pour la page des utilisateurs
import React, { useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, Alert, Modal, StyleSheet, Pressable, View } from "react-native";
import styles from "../../styles/styles";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from "@expo-google-fonts/nunito";
import * as Linking from 'expo-linking';

import {
  doc,
  deleteDoc,
  collection,
  onSnapshot
} from "firebase/firestore";

//Import des modules de Firebase
import { signOut, deleteUser } from 'firebase/auth';

//Import de la config de la base de données
import { auth, database } from '../../firebase/config';

export default function UserScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });

  const [modalVisible, setModalVisible] = useState(false);

  //Recupérer les données utilisateur
  const user = auth.currentUser;
  const userMail = user.email;
  const uid = auth.currentUser.uid;

  //Gestion du module de deconnexion 
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Erreur de déconnexion: ', error));
  };

  //Gestion du module de suppression du compte 
  const onDeleteUser = () => {
    
    //suppression des animaux
    const unsubscribe = onSnapshot(
      collection(database, uid),
      (querySnapshot) => {
        querySnapshot.forEach(
          (data) => {
            deleteDoc(doc(database, uid, data.id));
          },
          function (error) {
            console.log(error);
          }
        );
      }
    );

    //suppression des détails des animaux de l'utilisateur
    deleteUser(user).then(()=> {navigation.navigate("Signup")}).catch(error => console.log('Erreur : ', error));
    return () => unsubscribe();
  };

  //Placer le bouton pour se deconnecter dans la bar du haut
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.topButtonRed}
          onPress={onSignOut}
        >
          <Text style={styles.buttonTopTitle}>Se déconnecter</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Êtes-vous sur de vouloir supprimer votre compte, vos données enregistrées sur ce compte seront perdues ? {"\n"} Veuillez vous déconnecter et reconnecter pour réaliser cette action !</Text>
            <Pressable
              style={[styles.button, styles.modalButtonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Non, c'est une érreur</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.modalButtonAccept]}
              onPress={onDeleteUser}
            >
              <Text style={styles.textStyle}>Oui, je veux le supprimer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <Text style={styles.title}>Gestion du compte</Text>
        <Text style={styles.details}>Mail : {userMail}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("https://github.com/CorentinJacquier/PetilityMobile/issues")}
      >
        <Text style={styles.buttonTitle}>Contacter le développeur</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonDanger}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonTitle}>Supprimer de compte</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

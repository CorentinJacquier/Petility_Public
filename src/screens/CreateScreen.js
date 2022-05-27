//Import des modules pour la page de création
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, TextInput, View, Alert } from "react-native";
import styles from "../styles/styles";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from "@expo-google-fonts/nunito";

//Import des modules de Firebase
import { setDoc, doc, collection, onSnapshot } from "firebase/firestore";

//Import de la config de la base de données
import { auth, database } from "../firebase/config";

export default function CreateScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });
  const [newname, setName] = useState("");
  const [newtype, setType] = useState("");
  const [newrdv, setRdv] = useState("");

  //Déclaration nb d'animaux
  var nbAni = 0;

  //Recupérer un utilisateur
  const uid = auth.currentUser.uid;

  //On recupère tous les animaux
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid),
      (querySnapshot) => {
        querySnapshot.forEach(
          (doc) => {
            nbAni = parseInt(doc.id, 10);
          },
          function (error) {
            console.log(error);
          }
        );
      }
    );
    return () => unsubscribe();
  });

  //Ajout d'animal sur firestore
  const addAnimal = () => {
    if (newname !== "" && newtype !== "" && newrdv !== "") {
      nbAni += 1;
      setDoc(doc(database, uid, nbAni.toString()), {
        name: newname,
        type: newtype,
        rdv: newrdv
      });
      navigation.navigate("Menu");
    } else {
      Alert.alert("Veuillez remplir tous les champs");
    }
  };

  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ajouter un animal</Text>
        <TextInput
          style={styles.input}
          name="aniName"
          placeholder="Nom de votre animal"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          name="aniType"
          placeholder="Type"
          onChangeText={(text) => setType(text)}
        />
        <TextInput
          style={styles.input}
          name="aniRdv"
          keyboardType="numeric"
          placeholder="Jour du rdv mensuel chez le véto"
          onChangeText={(text) => setRdv(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => addAnimal()}>
          <Text style={styles.buttonTitle}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

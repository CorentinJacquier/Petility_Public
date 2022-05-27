//Import des modules pour la page de modification d'animaux
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Text, TouchableOpacity, TextInput, View, Alert } from "react-native";
import styles from "../styles/styles";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from "@expo-google-fonts/nunito";

//Import des modules de Firebase
import {
  doc,
  deleteDoc,
  collection,
  onSnapshot,
  setDoc
} from "firebase/firestore";

//Import de la config de la base de données
import { auth, database } from "../firebase/config";

export default function UpdateScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });

  const [loading, setLoading] = useState(true);
  const [newname, setNewName] = useState("");
  const [newrdv, setNewRdv] = useState(null);
  const [newtype, setNewType] = useState(null);
  const [PetName, setPetName] = useState();

  //Recupérer l'id de l'animal selectioné par routage
  const { id } = route.params;

  //Recupérer un utilisateur
  const uid = auth.currentUser.uid;

  //Lire le nom de l'animal
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid),
      (querySnapshot) => {
        var PetName;
        querySnapshot.forEach(
          (doc) => {
            if (doc.id == id) {
              PetName = doc.data().name;
            }
          },
          function (error) {
            console.log(error);
          }
        );
        setLoading(false);
        setPetName(PetName);
      }
    );
    return () => unsubscribe();
  }, []);

  //console.log(nbWeight, nbFood);

  //Suppression d'un animal
  const OnDelAnimal = () => {

    //on supprime tous les détails nourriture de l'animal
    const unsubscribe1 = onSnapshot(
      collection(database, uid, id, "food"),
      (querySnapshot) => {
        querySnapshot.forEach(
          (data) => {
            deleteDoc(doc(database, uid, id, "food", data.id));
          },
          function (error) {
            console.log(error);
          }
        );
      }
    );

    //on supprime tous les détails poids de l'animal 
    const unsubscribe2 = onSnapshot(
      collection(database, uid, id, "weight"),
      (querySnapshot) => {
        querySnapshot.forEach(
          (data) => {
            deleteDoc(doc(database, uid, id, "weight", data.id));
          },
          function (error) {
            console.log(error);
          }
        );
      }
    );
  
    //on supprime l'animal
    deleteDoc(doc(database, uid, id));

    navigation.navigate("Menu");
    return () => unsubscribe1() && unsubscribe2();
  };

  //Placer le bouton pour Supprimer dans la bar du haut
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.topButtonRed} onPress={OnDelAnimal}>
          <Text style={styles.buttonTopTitle}>Supprimer</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  //Modification de l'animal existant
  const updateAnimal = () => {
    if (newname !== null) {
      setDoc(doc(database, uid, id), {
        name: newname,
        type: newtype,
        rdv: newrdv
      });
    } else {
      Alert.alert("Veuillez remplir les champs !");
    }
    navigation.navigate("Détail", { id });
  };

  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Modifier {PetName}</Text>
        <TextInput
          style={styles.input}
          name="aniName"
          placeholder={PetName}
          onChangeText={(text) => setNewName(text)}
        />
        <TextInput
          style={styles.input}
          name="aniType"
          placeholder={"Nouveaux type"}
          onChangeText={(text) => setNewType(text)}
        />
        <TextInput
          style={styles.input}
          name="aniFood"
          keyboardType="numeric"
          placeholder={"Nouvelle date rdv"}
          onChangeText={(date) => setNewRdv(date)}
        />
        <TouchableOpacity style={styles.button} onPress={() => updateAnimal()}>
          <Text style={styles.buttonTitle}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

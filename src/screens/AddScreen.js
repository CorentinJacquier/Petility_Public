//Import des modules pour la page d'ajout de données dans l'historique
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
import { doc, collection, onSnapshot, setDoc } from "firebase/firestore";

//Import de la config de la base de données
import { auth, database } from "../firebase/config";

export default function AddScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });

  const [loading, setLoading] = useState(true);

  const [newdate, setNewDate] = useState(null);
  const [newDetails, setNewDetails] = useState(null);
  const [PetName, setPetName] = useState();

  //Recupérer l'id de l'animal selectioné par routage
  const { id } = route.params;
  const { addType } = route.params;

  //Recupérer un utilisateur
  const uid = auth.currentUser.uid;

  //Recupération de la date
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var currentTime = date + "/" + month;

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

  if (addType == "food") {
    var pageName = "Nourriture de";

    var nbFood = 0;

    //Verif si le subdoc food existe déjà
    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(database, uid, id, "food"),
        (querySnapshot) => {
          querySnapshot.forEach(
            (doc) => {
              nbFood = parseInt(doc.id, 10);
            },
            function (error) {
              console.log(error);
            }
          );
        }
      );
      return () => unsubscribe();
    });
  }

  if (addType == "weight") {
    var pageName = "Poids de";
    var nbWeight = 0;

    //Verif si le subdoc weight existe déjà
    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(database, uid, id, "weight"),
        (querySnapshot) => {
          querySnapshot.forEach(
            (doc) => {
              nbWeight = parseInt(doc.id, 10);
            },
            function (error) {
              console.log(error);
            }
          );
        }
      );
      return () => unsubscribe();
    });
  }

  //Modification de l'animal existant
  const updateAnimal = () => {
    if (addType == "food") {
      nbFood += 1;
      var newModDetails = newDetails.replace(/,/g, ".");
      if (newdate !== null && newModDetails !== null) {
        setDoc(doc(database, uid, id, "food", nbFood.toString()), {
          date: newdate,
          quantity: newModDetails
        });
      } else {
        Alert.alert("Veuillez remplir les champs !");
      }
    }
    if (addType == "weight") {
      nbWeight += 1;
      var newModDetails = newDetails.replace(/,/g, ".");
      if (newdate !== null && newModDetails !== null) {
        setDoc(doc(database, uid, id, "weight", nbWeight.toString()), {
          date: newdate,
          weight: newModDetails
        });
      } else {
        Alert.alert("Veuillez remplir les champs !");
      }
    }
    navigation.navigate("Détail", { id });
  };

  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {pageName} {PetName}
        </Text>
        <TextInput
          style={styles.input}
          name="aniDetails"
          keyboardType="numeric"
          placeholder={"Nouveaux poids"}
          onChangeText={(int) => setNewDetails(int)}
        />
        <TextInput
          style={styles.input}
          name="aniDate"
          placeholder={"Date"}
          onChangeText={(date) => setNewDate(date)}
        />
        <TouchableOpacity style={styles.button} onPress={() => updateAnimal()}>
          <Text style={styles.buttonTitle}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

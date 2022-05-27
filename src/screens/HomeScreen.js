//Import des modules pour la page acceuil
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styles from "../styles/styles";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from "@expo-google-fonts/nunito";

//Import des modules de Firebase
import { collection, onSnapshot } from "firebase/firestore";

//Import de la config de la base de données
import { auth, database } from "../firebase/config";

export default function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });

  const [loading, setLoading] = useState(true);
  const [ani, setAni] = useState([]);

  //Recupérer l'utilisateur
  const uid = auth.currentUser.uid;

  //Recuperer le mois prochain
  var month = new Date().getMonth() + 2;

  //Placer le bouton pour profile utilisateur dans la bar du haut
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.navigate("Utilisateur")}
        >
          <Text style={styles.buttonTopTitle}>Compte</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  //Affichage des éléments en listes sur l'accueil
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid),
      (querySnapshot) => {
        const ani = [];
        querySnapshot.forEach(
          (doc) => {
            ani.push({
              id: doc.id,
              name: doc.data().name,
              rdv: doc.data().rdv
            });
          },
          function (error) {
            console.log(error);
          }
        );
        setAni(ani);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  function Item({ id, name, rdv }) {
    const handlePress = () => {
      navigation.navigate("Détail", { id });
    };
    return (
      <TouchableOpacity onPress={() => handlePress()}>
        <View style={styles.itemHome}>
          <View style={styles.itemTop}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.itemDate}>
              <Text style={styles.itemDateTitle}>Prochain RDV le {rdv + "/" + month}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const renderItem = ({ item }) => (
    <Item id={item.id} name={item.name} rdv={item.rdv} />
  );

  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Application Petility</Text>

        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => navigation.navigate("Ajouter")}
        >
          <Text style={styles.buttonTitle}> Ajouter un animal </Text>
        </TouchableOpacity>
        <FlatList data={ani} renderItem={renderItem} />
        <TouchableOpacity
          style={styles.buttonRound}
          onPress={() => navigation.navigate("Astuces")}
        >
          <Text style={styles.buttonTitle}>Aide</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

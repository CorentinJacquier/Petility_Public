//Import des modules pour la paage de détails
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from "@expo-google-fonts/nunito";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

//Import des modules de Firebase
import { collection, onSnapshot } from "firebase/firestore";

//import InteractiveChart from "./Chart2"
//import Chart from "./Chart"

//Import de la config de la base de données
import { auth, database } from "../firebase/config";

export default function ShowScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });

  //Import des données par route de l'autre page (id de l'annimal)
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [aniWeightDate, setAniWeightDate] = useState([]);
  const [aniWeight, setAniWeight] = useState([]);
  const [aniFoodDate, setAniFoodDate] = useState([]);
  const [aniFoodQte, setAniFoodQte] = useState([]);
  const [PetName, setPetName] = useState();

  let [posWeight, setPosWeight] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0
  });
  let [posFood, setPosFood] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0
  });

  //Recupérer l'utilisateur
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

  //Lire les données de poids
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid, id, "weight"),
      (querySnapshot) => {
        const aniWeightDate = [];
        const aniWeight = [];
        querySnapshot.forEach(
          (doc) => {
            aniWeightDate.push(doc.data().date);
            aniWeight.push(doc.data().weight);
          },
          function (error) {
            console.log(error);
          }
        );
        setLoading(false);
        setAniWeight(aniWeight);
        setAniWeightDate(aniWeightDate);
      }
    );
    return () => unsubscribe();
  }, []);

  if (aniWeightDate.length >= 2 && aniWeight.length >= 2) {
    var weight = {
      labels: aniWeightDate,
      datasets: [
        {
          data: aniWeight,
          color: (opacity = 1) => `rgba(89, 110, 121, ${opacity})`
        }
      ]
    };
  } else {
    var weight = {
      labels: ["Ajouter", "2", "valeurs"],
      datasets: [
        {
          data: ["1", "2", "3"]
        }
      ]
    };
  }

  //Lire les données de nourriture
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid, id, "food"),
      (querySnapshot) => {
        const aniFoodDate = [];
        const aniFoodQte = [];
        querySnapshot.forEach(
          (doc) => {
            aniFoodDate.push(doc.data().date);
            aniFoodQte.push(doc.data().quantity);
          },
          function (error) {
            console.log(error);
          }
        );
        setLoading(false);
        setAniFoodDate(aniFoodDate);
        setAniFoodQte(aniFoodQte);
      }
    );
    return () => unsubscribe();
  }, []);

  if (aniFoodQte.length >= 2 && aniFoodDate.length >= 2) {
    var food = {
      labels: aniFoodDate,
      datasets: [
        {
          data: aniFoodQte,
          color: (opacity = 1) => `rgba(89, 110, 121, ${opacity})`
        }
      ]
    };
  } else {
    var food = {
      labels: ["Ajouter", "2", "valeurs"],
      datasets: [
        {
          data: ["1", "2", "3"]
        }
      ]
    };
  }

  //Configuration Affichage graphs
  const chartConfig = {
    backgroundGradientFrom: "#DFD3C3",
    backgroundGradientTo: "#DFD3C3",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  };

  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Détail de {PetName}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Modifier", { id })}
        >
          <Text style={styles.buttonTitle}>Modifier</Text>
        </TouchableOpacity>
        <View style={styles.item}>
          <View style={styles.itemTop}>
            <Text style={styles.itemName}>Poids </Text>
            <TouchableOpacity
              style={styles.itemButtonWeight}
              onPress={() =>
                navigation.navigate("Historique", { id, addType: "weight" })
              }
            >
              <Text style={styles.itemButtonTitle}>Ajouter</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={weight}
            width={280}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={{
              fontFamily: "Nunito_400Regular"
            }}
            yAxisSuffix={" kg"}
            decorator={() => {
              return posWeight.visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={posWeight.x - 18}
                      y={posWeight.y - 18}
                      width="35"
                      height="25"
                      rx={10}
                      fill="#596E79"
                    />
                    <TextSVG
                      x={posWeight.x}
                      y={posWeight.y}
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {posWeight.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                posWeight.x === data.x && posWeight.y === data.y;

              isSamePoint
                ? setPosWeight((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible
                    };
                  })
                : setPosWeight({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true
                  });
            }}
          />
        </View>
        <View style={styles.item}>
          <View style={styles.itemTop}>
            <Text style={styles.itemName}>Nourriture</Text>
            <TouchableOpacity
              style={styles.itemButtonFood}
              onPress={() =>
                navigation.navigate("Historique", { id, addType: "food" })
              }
            >
              <Text style={styles.itemButtonTitle}>Ajouter</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={food}
            width={280}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={{
              fontFamily: "Nunito_400Regular"
            }}
            yAxisSuffix={" kg"}
            decorator={() => {
              return posFood.visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={posFood.x - 18}
                      y={posFood.y - 18}
                      width="35"
                      height="25"
                      rx={10}
                      fill="#596E79"
                    />
                    <TextSVG
                      x={posFood.x}
                      y={posFood.y}
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {posFood.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint = posFood.x === data.x && posFood.y === data.y;

              isSamePoint
                ? setPosFood((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible
                    };
                  })
                : setPosFood({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true
                  });
            }}
          />
        </View>
      </View>
    );
  }
}

<img src="https://media.discordapp.net/attachments/759837532589916170/938094586130231406/petility-logo.png?width=100&height=100">

## 🐈 Petility

Le nom Petility vient de “Pet Utility” qui signifie utilitaire pour animaux de compagnie.

L'application veut aider à améliorer et gérer la vie des animaux de l'utilisateur. Elle contient différentes options tels que le suivi du poids et de la nourriure, les rendez vous médicaux en plus des vétérinaires à proximité, les bon plans sur les articles d'animaux de compagnie... 

L'application utilise FireStore (Firebase de Google) comme base de données et codée en React Native avec Expo. 

Voir la [Documentation utilisateur](https://corentin-jacquier.fr/docs/projets/Documentation%20utilisateur%20Petility%202022%20%20-%20Projet%20Mobile%20-Corentin%20Jacquier.pdf).

Voir la [Documentation technique](https://corentin-jacquier.fr/docs/projets/Documentation%20Technique%20Petility%202022%20%20-%20Projet%20Mobile%20-Corentin%20Jacquier.pdf).


## 🔧 Base de données

Les paramètres de connexion à la base de données (Firebase) sont dans `src/firebase/config.json` :

```json
const firebaseConfig = {
    apiKey: "clé_api",
    authDomain: "domaine",
    databaseURL: "url_bdd",
    projectId: "id_projet",
    storageBucket: "num_bucket",
    messagingSenderId: "id_envoie",
    appId: "id_application",
    measurementId: "id_meusure"
};
```

## 📷 Capture d'écran

### Page de connexion
<img src="https://media.discordapp.net/attachments/759837532589916170/937737594245115964/Screenshot_2022-01-31-16-52-33-80_f73b71075b1de7323614b647fe394240.jpg?width=263&height=585">

### Menu principal
<img src="https://media.discordapp.net/attachments/759837532589916170/939177197124608020/Screenshot_2022-02-04-16-14-19-32_f73b71075b1de7323614b647fe394240.jpg?width=266&height=592">

### Détails de l'animal
<img src="https://media.discordapp.net/attachments/759837532589916170/938093645893099631/Screenshot_2022-02-01-16-28-41-55_f73b71075b1de7323614b647fe394240.jpg?width=263&height=585">

### Création d'un nouvel animal
<img src="https://media.discordapp.net/attachments/759837532589916170/938093821642829865/Screenshot_2022-02-01-16-28-54-66_f73b71075b1de7323614b647fe394240.jpg?width=263&height=585">

### Modification d'un nouvel animal
<img src="https://media.discordapp.net/attachments/759837532589916170/938093646459314216/Screenshot_2022-02-01-16-28-48-03_f73b71075b1de7323614b647fe394240.jpg?width=266&height=592">

### Ajout de données 
<img src="https://media.discordapp.net/attachments/759837532589916170/938093646153121792/Screenshot_2022-02-01-16-28-44-10_f73b71075b1de7323614b647fe394240.jpg?width=266&height=592">

### Page d'astuces
<img src="https://media.discordapp.net/attachments/759837532589916170/938357594538512424/Screenshot_2022-02-02-09-57-51-39_f73b71075b1de7323614b647fe394240.jpg?width=265&height=589">

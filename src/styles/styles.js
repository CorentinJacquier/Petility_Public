//Style de la page d'accueil
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#F0ECE3'
    },
    logo: {
        flex: 1,
        height: 150,
        width: 320,
        alignSelf: "center",
        margin: 50
    },
    title: {
        fontSize: 30,
        color: '#596E79',
        marginTop: 15,
        alignSelf: "center",
        fontFamily: 'Nunito_400Regular',
    },
    name: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'Nunito_700Bold',
    },
    input: {
        height: 48,
        width: 300,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#DFD3C3',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        paddingRight: 16,
        alignSelf: "center",
        fontFamily: 'Nunito_400Regular',
    },
    buttonHome: {
        backgroundColor: '#596E79',
        marginTop: 15,
        marginBottom: 20,
        height: 48,
        width: 180,
        borderRadius: 25,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#596E79',
        marginTop: 15,
        marginBottom: 20,
        height: 48,
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center'
    },
    buttonDanger: {
        backgroundColor: '#f85b4d',
        marginTop: 15,
        marginBottom: 20,
        height: 48,
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center'
    },
    buttonLogin: {
        backgroundColor: '#596E79',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Nunito_700Bold',
    },
    topButton: {
        backgroundColor: '#596E79',
        marginLeft: 10,
        marginRight: 15,
        marginTop: 0,
        height: 25,
        width: 110,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center'
    },
    itemHome: {
        backgroundColor: '#C7B198',
        padding: 25,
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 20,
        width: 320,
    },
    itemTop: {
        flexDirection: 'row',
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 18,
        color: '#596E79',
        fontFamily: 'Nunito_400Regular',
    },
    footerLink: {
        color: "#C7B198",
        fontFamily: 'Nunito_700Bold',
        fontSize: 18
    },
    topButtonRed: {
        backgroundColor: '#f85b4d',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 0,
        height: 25,
        width: 130,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTopTitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: "bold",
        fontFamily: 'Nunito_700Bold',
    },
    item: {
        backgroundColor: '#DFD3C3',
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 20,
        width: 320,
    },
    itemName: {
        fontSize: 20,
        color: '#000000',
        fontFamily: 'Nunito_400Regular',
    },
    itemText: {
        fontSize: 14,
        color: '#596E79',
        marginVertical: 8,
        marginHorizontal: 10,
        fontFamily: 'Nunito_400Regular',
    },
    itemButtonWeight: {
        backgroundColor: '#596E79',
        height: 22,
        width: 70,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 175,
    },
    itemButtonFood: {
        backgroundColor: '#596E79',
        height: 22,
        width: 70,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 130,
    },
    itemButtonTitle: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'Nunito_400Regular',
    },
    itemDate: {
        backgroundColor: '#DFD3C3',
        height: 24,
        width: 170,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 10,
    },
    itemDateTitle: {
        color: '#596E79',
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
    },
    itemButtonHelp: {
        backgroundColor: '#596E79',
        height: 22,
        width: 200,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: "center",
    },
    details: {
        fontSize: 16,
        color: '#596E79',
        marginTop: 13,
        marginBottom: 5,
        fontFamily: 'Nunito_400Regular',
    },
    buttonRound: {
        backgroundColor: '#596E79',
        marginTop: 15,
        marginBottom: 40,
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      modalButtonClose: {
        backgroundColor: "#C7B198",
      },
      modalButtonAccept: {
        backgroundColor: "#FF0000",
      },
})
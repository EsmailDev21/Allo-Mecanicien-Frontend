import {Dimensions, StyleSheet} from 'react-native'
import { colors } from './theme'

const {dark,gray,teal} = colors
export const homeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: 500,
    
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height:Dimensions.get('window').height/3,
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height:'40%'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    
    buttonClose: {
      backgroundColor: colors.dark[400],
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    alertBtnTextStyle:{
      marginLeft:10,
      fontSize:24,
      fontWeight:'100',
      color:'white'
    },
    alertBtn:{
    backgroundColor:'tomato',
     paddingHorizontal:50,
     paddingVertical:5,
     borderRadius:10,
     flexDirection:'row',
     alignItems:'center'
    }
  });
  
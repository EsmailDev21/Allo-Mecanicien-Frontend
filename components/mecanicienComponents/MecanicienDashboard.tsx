import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../styles/theme';

const MecanicienDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.itemsContainer}>
         <View style={styles.item}><Text style={styles.itemText}>Earnings : 2300DT</Text></View> 
         <View style={styles.item}><Text style={styles.itemText}>Services done : 15</Text></View> 
         <View style={styles.item}><Text style={styles.itemText}>Rating : 8/10</Text></View> 
      </View>
    </View>
  );
};

export default MecanicienDashboard;

const styles = StyleSheet.create({
    container:{
      marginTop:80,
        height:'80%',
        flex:1,
        paddingLeft:'10%',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:colors.gray[500],
        marginBottom:40
    },
    itemsContainer:{
        flex:1,
        height:50,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    item:{
        marginVertical:30,
        paddingVertical:20,
        borderBottomWidth:1,
        borderBottomColor:colors.dark[400]
    },
    itemText:{
      textAlign:'left',
        fontSize:18,
        fontWeight:'400',
        color:colors.gray[300],

    }
});

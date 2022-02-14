import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../styles/theme';
import { Colors } from 'react-native-paper';
import { Axios, AxiosResponse } from 'axios';

export interface NotificationProps{
    title:string,
    description:string,
    date:string,
    onAccept:()=>Promise<any>,
    onDecline:()=>Promise<any>,
   
}
function Notification({title,description,date,onAccept,onDecline}:NotificationProps): JSX.Element {

  return (
    <View style={styles.notificationWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{date}</Text>
      <View>
        <TouchableOpacity style={styles.btnAccept} onPress={()=>{
          onAccept()
        }}>
          <Text style={styles.textAccept}>Accepter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDecline} onPress={()=>onDecline()}>
          <Text style={styles.textDecline}>Refuser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notificationWrapper:{
    flex:1,
    alignItems:'center',
    justifyContent: 'flex-start',
    backgroundColor:colors.gray[100],
    paddingLeft:10,
    borderBottomWidth:1,
    borderBottomColor:colors.dark[300]
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:colors.dark[400]
  },
  description:{
    fontSize:18,
    fontWeight:'normal',
    color:colors.gray[300],
  },
  date:{
    fontSize:12,
    fontWeight:'100',
    color:colors.gray[200],
  },
  btnAccept:{
    borderColor:colors.teal[600],
    borderRadius:5,
    borderWidth:1,
    paddingHorizontal:40,
    paddingVertical:5,
  },
  btnDecline:{
    borderColor:'tomato',
    borderRadius:5,
    borderWidth:1,
    paddingHorizontal:40,
    paddingVertical:5,
  },
  textAccept:{
    fontSize:18,
    fontWeight:'normal',
    color:colors.teal[600]
  },
  textDecline:{
    fontSize:18,
    fontWeight:'normal',
    color:'tomato'
  }
});

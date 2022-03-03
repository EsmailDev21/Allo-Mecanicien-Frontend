import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../styles/theme';
import { Colors, TouchableRipple } from 'react-native-paper';
import { Axios, AxiosResponse } from 'axios';
import * as Paper from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useSelector,useDispatch } from 'react-redux';
import { selectNotificationAccept, setNotificationAcceptETA, setNotificationAcceptPrice } from '../../redux/slices/notificationSlice';

export interface NotificationProps{
    senderNotificationToken:string;
    serviceType:string,
    serviceLabel:string,
    senderName:string,
    senderLocation:string
    additionalDetails:string,
    requestDate:string,
    onAccept:()=>Promise<any>,
    onDecline:()=>Promise<any>,
   
}
function Notification({serviceType,serviceLabel,senderName,senderLocation,additionalDetails,requestDate,onAccept,onDecline,senderNotificationToken}:NotificationProps): JSX.Element {
  const dispatch = useDispatch();
  const [showETA,setShowETA] = useState(false)
  const notificationAcceptData = useSelector(selectNotificationAccept)
  
  return (
    <TouchableOpacity style={styles.notificationWrapper}>
      <Text style={styles.title}>{serviceType}</Text>
      <Text style={styles.title1}>{serviceLabel}</Text>
      <Text style={styles.description}>{additionalDetails}</Text>
      <Text style={styles.description}>De {senderName}</Text>
      <Text style={styles.date}>{requestDate}</Text>
      <View>
        <TouchableRipple rippleColor={styles.btnAccept.borderColor} style={styles.btnAccept} onPress={()=>{
          
          setShowETA(!showETA)

        }}>
          <Text style={styles.textAccept}>Accepter</Text>
        </TouchableRipple >
       
        <TouchableRipple rippleColor={styles.btnDecline.borderColor} style={styles.btnDecline} onPress={()=>onDecline()}>
          <Text style={styles.textDecline}>Refuser</Text>
        </TouchableRipple>
        {showETA && (
          <>
          <View style={{maxHeight:250}}>
          <Paper.TextInput
          placeholder='Temps pour arriver au client'
          keyboardType='numeric'
          autoComplete={false}
          activeUnderlineColor={colors.dark[300]}
          
          activeOutlineColor={colors.dark[300]}
          style={{marginBottom:10,borderRadius:5}}
           value={notificationAcceptData.eta} onChangeText={(val)=>dispatch(setNotificationAcceptETA(val))} />
           <Paper.TextInput
          placeholder='Prix de service en DT'
          keyboardType='numeric'
          
          activeUnderlineColor={colors.dark[300]}
          autoComplete={false}
           value={notificationAcceptData.prix} onChangeText={(val)=>dispatch(setNotificationAcceptPrice(val))} />
           <TouchableOpacity
           onPress={()=> onAccept() }
           style={{
             alignItems:'center',
             backgroundColor: colors.teal[600],
             borderRadius: 10000,
             padding: 10,
             marginVertical: 10,
             marginHorizontal: 10,
           }}
         ><Ionicons name="send" color={"white"} size={30} />
         </TouchableOpacity></View>
           </>
          
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notificationWrapper:{
    flex:1,
    alignItems:'center',
    justifyContent: 'flex-start',
    backgroundColor:colors.gray[100],
    padding:20,
    margin:20,
    borderRadius:10
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:colors.dark[400]
  },
  title1:{
    fontSize:20,
    fontWeight:'300',
    color:colors.gray[400]
  },
  description:{
    fontSize:18,
    fontWeight:'normal',
    color:colors.gray[500],
  },
  date:{
    fontSize:12,
    fontWeight:'100',
    color:colors.dark[500],
  },
  btnAccept:{
    marginVertical:10,
    borderColor:colors.teal[600],
    borderRadius:5,
    borderWidth:1,
    paddingHorizontal:40,
    paddingVertical:5,
  },
  btnDecline:{
    marginBottom:10,
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

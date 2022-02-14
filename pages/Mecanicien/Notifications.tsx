import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { API_URL } from '../../url';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/slices/userSlice';
import Notification from '../../components/mecanicienComponents/Notification';
import { colors } from '../../styles/theme';

const getNotifications = async (id:string) => {
    const response =  await axios.get(`${API_URL}/notification/get_user_notifications/${id}`)
    return response
}
const onAcceptService = async (id:string) => {
    return await axios.put(`${API_URL}/notification/${id}`,{
        accepted:true,
    })
}
const onDeclineService = async (id:string) => {
    return await axios.put(`${API_URL}/notification/${id}`,{
       declined:true,
   })
}
const Notifications = () => {
    const [notifications,setNotifications] = useState([])
    const userId = useSelector(selectUserData).id
    useEffect(()=> {
         getNotifications(userId)
        .then((res)=>setNotifications(res.data))
        .catch((err)=>console.log(err))
        
    },[notifications])
  return (
    <SafeAreaView style={{height:'100%'}}>
        <ScrollView alwaysBounceVertical={true} endFillColor={colors.teal[400]}>
        {notifications && notifications.map((notif)=> (
            <Notification onDecline={()=>onDeclineService(notif.id)} onAccept={()=>onAcceptService(notif.id)}  date={notif.date} description={notif.description} title={notif.title}/>
        ))}
        </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});

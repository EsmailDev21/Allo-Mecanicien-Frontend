import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServicesScrollView from '../components/ServicesScrollView';

const Services = () => {
  return (
    <SafeAreaView style={{height:"100%"}}>
        <ServicesScrollView />
        
    </SafeAreaView>
  );
};

export default Services;

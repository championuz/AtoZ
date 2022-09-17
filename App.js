/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack'
 import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
 import HomeScreen from './screens/HomeScreen';
 import DetailsScreen from './screens/DetailsScreen';
 import { TouchableOpacity, View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons'
 
 const Tab = createMaterialBottomTabNavigator();

 const Stack = createNativeStackNavigator();
 
 const App = () => (
   <NavigationContainer >
  <Tab.Navigator
  initialRouteName="Home"
  activeColor="#fff"
  barStyle={{ backgroundColor: '#2F0050' }}
  >
  
  <Tab.Screen 
    name="HomeScreen"
    component={HomeScreen}
    options={{
      title: 'Home',
      tabBarLabel: 'Home',
      tabBarColor: '#2F0050',
      tabBarIcon: ({ color }) => (
        <Icon name="ios-home-outline" color="#fff" size={22} />
      ),
    }}
  />
  <Tab.Screen
    name="DetailsScreen"
    component={DetailsStackScreen}
    options={{
      title: 'Home',
      tabBarLabel: 'Details',
      tabBarColor: '#2F0050',
      tabBarIcon: ({ color }) => (
        <Icon name="md-albums-outline" color="#fff" size={22} />
      ),
    }}
  />
</Tab.Navigator>
</NavigationContainer>
  );

  const clearSpins = () => {
    fetch('https://atoz-server.herokuapp.com/api/auth/clearspins', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    })
}

// headerRight: ()=> (<View style={styles.thecard}><TouchableOpacity onPress={()=>reloadSpins()}><Icon style={styles.det} name="ios-reload" color="#fff" size={22}/></TouchableOpacity><TouchableOpacity onPress={()=>clearSpins()} style={styles.button}><Text style={styles.btn_title}>Clear Spins</Text></TouchableOpacity></View>),
 
 
 const DetailsStackScreen = () => (
   <Stack.Navigator screenOptions = {{ 
     headerStyle: {
       backgroundColor: '#2F0050',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
       fontWeight: 'bold',
     },
     headerRight: ()=> (<View style={styles.thecard}><TouchableOpacity onPress={()=>clearSpins()} style={styles.button}><Text style={styles.btn_title}>Clear Spins</Text></TouchableOpacity></View>),

    }}>
      
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
 );
 
 export default App;

 const styles = StyleSheet.create({
   image: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  thecard: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  det: {
    marginRight: 10,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#2F0050',
    paddingHorizontal: 20,
    paddingVertical: 10,
 },
  btn_title: {
   fontSize: 16,
   textAlign: 'center',
   fontWeight: '900',
  },
 });
 
 
 
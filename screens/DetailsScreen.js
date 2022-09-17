import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
  FlatList,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
// import { ScrollView } from 'react-native-virtualized-view';


const DetailsScreen = () => {

  const [returnedData, setReturnedData] = React.useState([])
  const [returnedMsg, setReturnedMsg] = React.useState([])
  const [nothing, setNothing] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  


  const getAllSpins = () => {
      fetch('https://atoz-server.herokuapp.com/api/auth/getspins')
      .then((response) => response.json())
      .then((json)=> {
        if(json.message == 'Confirmed'){
            const finalResult = json.data.getspins
            setReturnedData(finalResult)
            setReturnedMsg('')
            setNothing(false)

          } else {
              console.log(json.message)
              setReturnedMsg(json.message)
              setNothing(true)
              setReturnedData([])
              
          }
      })
      .catch((error) => {
          console.error(error);
      })
      .finally(()=>setLoading(false));
  }

  React.useEffect(()=> {
    getAllSpins()
  });


  const copyNewClip = (spinner) => {
    Clipboard.setString(spinner);
    console.log(spinner)
  };``

  
  return(
    <View style={styles.container}>
    <ScrollView style={styles.footer}
     refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
     }>
        {nothing ? (<Text style={styles.defaults}>{returnedMsg}</Text>) : (
            <></>
        )}
            {loading ? (<Text style={styles.defaults}>Loading... </Text>) : (
                returnedData.map((post)=>(
              <View key={post._id} style={styles.card}>
                  <View style={styles.containedText}>
                      <Text style={styles.title}>{post.Spins}</Text>
                  </View>
                  <View style={styles.containedBtn}>
                      <TouchableOpacity
                          onPress={()=> copyNewClip(`${post.Spins}`)}
                          style={styles.button}>
                          <Text style={styles.btn_title}>copy</Text>
                      </TouchableOpacity>
                  </View>
              </View>
                ))
            )
            }
    </ScrollView>
    </View>
  );
};

export default DetailsScreen;


 const {height} = Dimensions.get("screen");
 const height_logo = height * 0.38;

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#2F0050'
   },
   containedText: {
    width: '68%',
    marginRight: 6,
    height: 'auto',
   },
   containedBtn: {
    width: '30%',
    height: 'auto',
    justifyContent: 'center',
   },
   card: {
    width: '100%',
    height: 'auto',
    borderRadius: 14,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    backgroundColor: "#fff",
    shadowColor: "blue",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 4,
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap'

  },
   header: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
   footer: {
     flex: 4,
     backgroundColor: '#fff',
     borderTopLeftRadius: 30,
     borderTopRightRadius: 30,
     paddingVertical: 20,
     paddingHorizontal: 15
   },
   logo: {
     width: height_logo,
     height: height_logo
   },
   textInput: { 
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  outputField: {
    height: 'auto',
    width: 300,
    borderRadius: 40,
    borderColor: '#2F0050',
    borderWidth: 2,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  defaults: {
    color: '#05375a',
     fontSize: 18,
     fontWeight: 'bold',
     justifyContent: 'center'
  },
   title: {
     color: '#05375a',
     fontSize: 18,
     fontWeight: 'bold'
   },
   text: {
     color: 'grey',
     marginTop: 5,
   },
   header_text: {
     color: '#fff',
     marginTop: 5,
     fontWeight: '900',
     fontSize: 34,
   },
   outputTitle: {
     fontSize: 24,
     color: '#2F0050',
     textAlign: 'center',
     paddingTop: 20,
     paddingBottom: 20,
     fontWeight: '700',
   },
   button: {
     backgroundColor: '#2F0050',
     borderRadius: 10,
     color: '#fff',
     paddingHorizontal: 20,
     paddingVertical: 10,
  },
   btn_title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
   },
   signIn: {
     width: 150,
     height: 40,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 50,
     flexDirection: 'row'
   },
   action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  views: {
    marginTop: 20,
  },
   outputText: {
     color: '#2F0050',
     fontSize: 16,
     fontWeight: 'bold'
   },
  //    color: '#2F0050',
  //    fontSize: 16,
  //    fontWeight: 'bold'
  //  },
  //.gradlew clean
  //
 })
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';


const HomeScreen = () => {

  const [newwords, setNewWords] = React.useState('')
  const [randWord, setRandWord] = React.useState('')
  const [newnumber, setNewNumber] = React.useState('')
  const [savedWord, setSavedWord] = React.useState([])
  const [errorMessage, setErrorMessage] = React.useState([])
  const [loading, setLoading] = React.useState(null)

  const setWords = () => {
   const spliting = newwords.split(" ")
//    console.log(spliting);
   const randomize = getRandom(spliting).join(" ");
//    console.log(randomize);
   setRandWord(randomize);
   createSpins();
  }

  const getRandom = (spliting, items = newnumber) => {
    return [...spliting].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, items)
  }
  

  const copyToClipboard = () => {
    Clipboard.setString(randWord);
  };

  const createSpins = () => {
    fetch('https://atoz-server.herokuapp.com/api/auth/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            Spins: randWord
     })
    })
    .then((response) => response.json())
    .then((json)=>  {
            if(json.status === 'ok'){
                setSavedWord(json.data.newSpins.Spins)
               setLoading(false)
                // const finalResult = json.data.getspins
                // setReturnedData(finalResult)
                // setReturnedMsg('')
                // setNothing(false)
        
              } else {
                  console.log(json.message)
                  setErrorMessage(json.message)
                  setLoading(true)
                //   setReturnedMsg(json.message)
                //   setNothing(true)
              }
          })
      .catch((error) => {
          console.error(error);
      })
    .catch((error) => {
        console.error(error);
    })
}

// .then((json)=> {
//     if(json.message == 'Confirmed'){
//         const finalResult = json.data.getspins
//         setReturnedData(finalResult)
//         setReturnedMsg('')
//         setNothing(false)

//       } else {
//           console.log(json.message)
//           setReturnedMsg(json.message)
//           setNothing(true)
//       }
//   })
//   .catch((error) => {
//       console.error(error);
//   })

  return(
    <View style={styles.container}>
    <View style={styles.header}>
    <Text style={styles.header_text}>Welcome to AtoZ</Text>
     </View>
    <View style={styles.footer}>
    <View style={styles.action}>
    <TextInput
    placeholder="Paste the Words"
    value={newwords}
    style={styles.textInput}
    onChangeText={(Text)=>setNewWords(Text)}
    autoCapitalize="none"
    />
    
    </View>
    <View style={[styles.action, styles.views]}>
    <TextInput
    placeholder="State Number of Words"
    value={newnumber}
    style={styles.textInput}
    onChangeText={(Text)=>setNewNumber(Text)}
    autoCapitalize="none"
    />
    <TouchableOpacity
    onPress={setWords}
    style={styles.button}>
      <Text style={styles.btn_title}>Spin</Text>
    </TouchableOpacity>
    </View>
    {loading ? (<Text style={styles.errorTitle}>{errorMessage}</Text>) : (<></>)}
    

    <Text style={styles.outputTitle}>Here's the Output</Text>
<View style={styles.outputField}>
<Text style={styles.outputText}>{savedWord}</Text>
</View>
<View style={styles.views}>
<TouchableOpacity
    onPress={copyToClipboard}
    style={styles.button}>
      <Text style={styles.btn_title}>Copy</Text>
    </TouchableOpacity>
</View>

    </View>
    </View>
  );
};

export default HomeScreen;


 const {height} = Dimensions.get("screen");
 const height_logo = height * 0.38;

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#2F0050'
   },
   header: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   },
   footer: {
     flex: 3,
     backgroundColor: '#fff',
     borderTopLeftRadius: 30,
     borderTopRightRadius: 30,
     paddingVertical: 50,
     paddingHorizontal: 30
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
   title: {
     color: '#05375a',
     fontSize: 30,
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
   errorTitle: {
     fontSize: 14,
     color: '#ff2000',
     textAlign: 'center',
     paddingTop: 10,
     paddingBottom:10,
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
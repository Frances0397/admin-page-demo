import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-web';

//drawer component TEMP
import { Drawer } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

//header component TEMP
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//admin page content component TEMP
import { Divider } from '@rneui/themed';
import { TextInput, List, Button } from 'react-native-paper';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  //const Drawer = createDrawerNavigator();

  //admin page content component TEMP
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaProvider style={styles.safeareaprovider}>
      {/* <SafeAreaView> */}
      <View style={styles.outerContainer}>
        <View style={styles.drawer}>
          <Drawer.Item
            style={{ backgroundColor: '#b5b5b5' }}
            icon="star"
            label="First Item"
          />
          <Drawer.Item
            style={{ backgroundColor: '#b5b5b5' }}
            icon="heart"
            label="Second Item"
          />
        </View>
        <View style={styles.container}>
          <Appbar.Header style={styles.header}>
            <Appbar.Content title="Title" titleStyle={{ color: '#fff' }} />
          </Appbar.Header>
          <ScrollView contentContainerStyle={styles.pageContainer}>
            <View style={styles.inputSection}>
              <Text style={styles.inputSectionTitle}>Aggiungi/modifica utente</Text>
              <View style={styles.horizontalInputBox}>
                <TextInput style={styles.input} label="Email" value={email} onChangeText={email => setFirstName(email)}
                  underlineColor='transparent' activeUnderlineColor='transparent' outlineStyle={{ borderRadius: 15 }} contentStyle={{ borderRadius: 15 }} />
                <TextInput style={styles.input} label="Password" value={password} onChangeText={password => setFirstName(password)}
                  underlineColor='transparent' activeUnderlineColor='transparent' />
              </View>
              <View style={styles.horizontalInputBox}>
                <TextInput style={styles.input} label="Nome" value={firstName} onChangeText={firstName => setFirstName(firstName)}
                  underlineColor='transparent' activeUnderlineColor='transparent' />
                <TextInput style={styles.input} label="Cognome" value={lastName} onChangeText={lastName => setFirstName(lastName)}
                  underlineColor='transparent' activeUnderlineColor='transparent' />
                <Button style={styles.searchButton} icon="feature-search-outline" mode="contained-tonal" onPress={() => console.log('Pressed')} />
              </View>
              <View style={styles.horizontalInputBox}>
                <View style={styles.accordionSelectorContainer} >
                  <List.Accordion style={styles.accordionSelector} title="Ruolo">
                    <List.Item title="Sviluppatore" />
                    <List.Item title="Funzionale" />
                  </List.Accordion>
                </View>
                <View style={styles.accordionSelectorContainer} >
                  <List.Accordion style={styles.accordionSelector} title="Ruolo">
                    <List.Item title="Sviluppatore" />
                    <List.Item title="Funzionale" />
                  </List.Accordion>
                </View>
                <Button style={styles.saveButton} icon="content-save" mode="contained-tonal" onPress={() => console.log('Pressed')}>
                  Salva
                </Button>
              </View>
            </View>
            <Divider style={{ width: '100%', heigth: 10 }} />
            <View style={styles.inputSection}>
              <Text style={styles.inputSectionTitle}>Titolo sezione 2</Text>
              <Text style={styles.inputSectionText}>Open up App.js to start working on your app!</Text>
            </View>
            <Divider style={{ width: '100%', heigth: 10 }} />
            <View style={styles.inputSection}>
              <Text style={styles.inputSectionTitle}>Titolo sezione 3</Text>
              <Text style={styles.inputSectionText}>Open up App.js to start working on your app!</Text>
            </View>
          </ScrollView>
          <StatusBar style="auto" />
        </View>
      </View>
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  drawer: {
    width: 230,
    backgroundColor: '#b5b5b5',
    // position: 'fixed',
    //height: '100%',
    minHeight: '100%',
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  safeareaproviderContainer: {
    flex: 1
  },
  header: {
    backgroundColor: '#E7E0EC',
  },
  pageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    //flex: 1,
  },
  inputSectionTitle: {
    marginBottom: 10,
    fontFamily: 'Manrope',
    fontWeight: 'bolder',
    fontSize: 20,
    color: '#252B42'
  },
  inputSection: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  inputSectionText: {
    fontFamily: 'Manrope',
    fontWeight: 'normal',
    color: '#252B42'
  },
  horizontalInputBox: {
    marginTop: 15,
    flexDirection: "row",
  },

  input: {
    marginRight: 15,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
    //height: '90%'
  },
  accordionSelector: {
    paddingRight: 10,
    borderRadius: 10
  },
  accordionSelectorContainer: {
    marginRight: 15,
  },
  saveButton: {
    marginLeft: 500,
    height: '60%',
    marginTop: 15,
  },
  searchButton: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    //marginLeft: 10,
    paddingLeft: 15,
    width: 15
  }
});

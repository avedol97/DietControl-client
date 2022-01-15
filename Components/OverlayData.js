import React, {useState} from 'react';
import {Button, Overlay, Icon} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';

import UserService from '../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const service = new UserService();

type OverlayComponentProps = {};

const OverlayComponent: React.FunctionComponent<OverlayComponentProps> = () => {
  const [visible, setVisible] = useState(false);
  const [weight, setWeight] = useState();
  const [activity, setActivity] = useState();
  const [purpose, setPurpose] = useState();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const changeDate = async () => {
    const id = await AsyncStorage.getItem('userId');
    let change = service.changeDate(id, weight, activity, purpose);
    Alert.alert('Pomyślnie zaaktualizowano dane!');
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => toggleOverlay()}
        style={styles.buttonMain}>
        <Text style={styles.buttonText}>Edytuj Dane</Text>
      </TouchableOpacity>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.mainText}>WAGA [kg]</Text>
        <TextInput
          onChangeText={weight => setWeight(weight)}
          style={styles.input}
          placeholder="WPISZ"
          placeholderTextColor="white"
        />
        <Text style={styles.mainText}>AKTYWNOŚĆ</Text>
        <Picker
          selectedValue={activity}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setActivity(itemValue)}>
          <Picker.Item label="WYBIERZ RODZAJ AKTYWNOŚCI ..." value="Unknown" />
          <Picker.Item label="BRAK AKTYWNOŚCI FIZYCZNEJ" value="1.0" />
          <Picker.Item label="BARDZO NISKA AKTYWNOŚĆ FIZYCZNA" value="1.2" />
          <Picker.Item label="NISKA AKTYWNOŚĆ FIZYCZNA" value="1.4" />
          <Picker.Item label="AKTYWNY TRYB ŻYCIA" value="1.6" />
          <Picker.Item label="BARDZO AKTYWNY TRYB ŻYCIA" value="1.8" />
          <Picker.Item label="WYCZYNOWY TRYB ŻYCIA" value="2.0" />
        </Picker>
        <Text style={styles.mainText}>CEL</Text>
        <Picker
          selectedValue={purpose}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}>
          <Picker.Item label="WYBIERZ CEL ..." value="Unknown" />
          <Picker.Item label="REDUKCJA" value="-1" />
          <Picker.Item label="ZDROWE ODŻYWIANIE" value="0" />
          <Picker.Item label="BUDOWA MIĘŚNI" value="1" />
        </Picker>

        <TouchableOpacity onPress={() => changeDate()} style={styles.button}>
          <Text style={styles.buttonText}>Zmień Dane</Text>
        </TouchableOpacity>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 60,
    marginTop: 15,
    height: 40,
    width: 180,
    borderWidth: 2,
    backgroundColor: '#ff8243',
    borderColor: '#999999',
    justifyContent: 'center',
  },
  buttonMain: {
    margin: 2,
    height: 30,
    borderWidth: 2,
    backgroundColor: '#ff8243',
    borderColor: '#999999',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
    fontFamily: 'Domine-Bold',
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#999999',
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    fontSize: 16,
    paddingLeft: 15,
  },
  picker: {
    color: 'white',
    marginTop: 5,
    backgroundColor: '#999999',
  },
  mainText: {
    margin: 10,
    fontFamily: 'Domine-Bold',
  },
});

export default OverlayComponent;

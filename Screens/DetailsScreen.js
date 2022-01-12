import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Platform,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import MyField from '../Components/MyField';
import Button from '../Components/Button2';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DetailsService from '../services/DetailsService';
import UserService from '../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const service = new DetailsService();
const serviceUser = new UserService();

const DetailsScreen = ({navigation}) => {
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  const [gender, setGender] = React.useState();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [activity, setActivity] = useState();
  const [purpose, setPurpose] = useState();
  const [somatic, setSomatic] = useState('STANDARD');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('USTAW DATE URODZENIA');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const date = {
      day: day.toString(),
      month: month.toString(),
      year: year.toString(),
    };
    setDateOfBirth(date);
    setText(day + '-' + month + '-' + year);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const createDetails = async (
    gender,
    dateOfBirth,
    height,
    weight,
    activity,
    purpose,
    somatic,
  ) => {
    const id = await AsyncStorage.getItem('userId');
    if (
      dateOfBirth === undefined ||
      height === undefined ||
      weight === undefined
    ) {
      alert(' Musisz uzupełnić wszystkie dane!');
    } else {
      const data = await service.postDetails(
        id,
        gender,
        dateOfBirth,
        height,
        weight,
        activity,
        purpose,
        somatic,
      );
      const change = await serviceUser.changeDetails(id);
      const detail = await AsyncStorage.setItem('isDetails', 'true');
      Alert.alert('Pomyślnie uzupełniono dane!');
      await navigation.navigate('Auth');
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.scrollView}>
        <StatusBar animated={true} backgroundColor="#61dafb" hidden={true} />
        <View style={styles.top}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              margin: 20,
              color: 'white',
              fontFamily: 'FrederickatheGreat-Regular',
            }}>
            TWOJE DANE
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.mainText}>PŁEĆ</Text>
          <View style={styles.radioBox}>
            <View style={styles.radio}>
              <RadioButton
                value="Men"
                status={gender === 'Men' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Men')}
                color={'white'}
                uncheckedColor={'white'}
              />
              <Text style={styles.radioText}>MĘŻCZYZNA</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton
                value="Woman"
                status={gender === 'Woman' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Woman')}
                uncheckedColor={'white'}
                color={'white'}
              />
              <Text style={styles.radioText}>KOBIETA</Text>
            </View>
          </View>
          <Text style={styles.mainText}>WZROST[CM]</Text>
          <TextInput
            placeholder="USTAW WZROST"
            placeholderTextColor="white"
            showSoftInputOnFocus={false}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={height => setHeight(height)}
          />
          <Text style={styles.mainText}>WAGA[KG]</Text>
          <TextInput
            placeholder=" USTAW WAGĘ"
            showSoftInputOnFocus={false}
            keyboardType="numeric"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={weight => setWeight(weight)}
          />
          <View>
            <Text style={styles.mainText}>DATA URODZENIA</Text>
            <MyField fun={showDatepicker} text={text} />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateOfBirth}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <Text style={styles.mainText}>STYL ŻYCIA</Text>
          <View style={styles.container}>
            <Picker
              selectedValue={activity}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setActivity(itemValue)}>
              <Picker.Item
                label="WYBIERZ RODZAJ AKTYWNOŚCI ..."
                value="Unknown"
              />
              <Picker.Item label="BRAK AKTYWNOŚCI FIZYCZNEJ" value="1.0" />
              <Picker.Item
                label="BARDZO NISKA AKTYWNOŚĆ FIZYCZNA"
                value="1.2"
              />
              <Picker.Item label="NISKA AKTYWNOŚĆ FIZYCZNA" value="1.4" />
              <Picker.Item label="AKTYWNY TRYB ŻYCIA" value="1.6" />
              <Picker.Item label="BARDZO AKTYWNY TRYB ŻYCIA" value="1.8" />
              <Picker.Item label="WYCZYNOWY TRYB ŻYCIA" value="2.0" />
            </Picker>
          </View>
          <Text style={styles.mainText}>CEL</Text>
          <View style={styles.container}>
            <Picker
              selectedValue={purpose}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}>
              <Picker.Item label="WYBIERZ CEL ..." value="Unknown" />
              <Picker.Item label="REDUKCJA" value="-1" />
              <Picker.Item label="ZDROWE ODŻYWIANIE" value="0" />
              <Picker.Item label="BUDOWA MIĘŚNI" value="1" />
            </Picker>
          </View>
          <Text style={styles.mainText}>SOMATOTYP</Text>
          <View style={styles.radioBox}>
            <View style={styles.radio}>
              <RadioButton
                value="EKTOMORFIK"
                status={somatic === 'EKTOMORFIK' ? 'checked' : 'unchecked'}
                onPress={() => setSomatic('EKTOMORFIK')}
                color={'white'}
                uncheckedColor={'white'}
              />
              <Text style={styles.radioText}>EKTOMORFIK</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton
                value="MEZOMORFIK"
                status={somatic === 'MEZOMORFIK' ? 'checked' : 'unchecked'}
                onPress={() => setSomatic('MEZOMORFIK')}
                uncheckedColor={'white'}
                color={'white'}
              />
              <Text style={styles.radioText}>MEZOMORFIK</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton
                value="ENDOMORFIK"
                status={somatic === 'ENDOMORFIK' ? 'checked' : 'unchecked'}
                onPress={() => setSomatic('ENDOMORFIK')}
                uncheckedColor={'white'}
                color={'white'}
              />
              <Text style={styles.radioText}>ENDOMORFIK</Text>
            </View>
          </View>
          <Button
            text="ZAPISZ"
            fun={() =>
              createDetails(
                gender,
                dateOfBirth,
                height,
                weight,
                activity,
                purpose,
                somatic,
              )
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 70,
    backgroundColor: '#708090',
  },
  scrollView: {
    backgroundColor: '#181818',
  },
  mainText: {
    marginLeft: 10,
    marginBottom: -6,
    fontSize: 14,
    color: '#ff8243',
    fontFamily: 'Domine-Bold',
  },
  background: {
    flex: 1,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioBox: {
    borderColor: '#708090',
    borderWidth: 3,
    margin: 10,
    paddingLeft: 5,
  },
  radioText: {
    marginTop: 6,
    fontSize: 14,
    color: 'white',
    fontFamily: 'Exo2-ExtraLightItalic',
  },
  input: {
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#708090',
    borderWidth: 3,
    color: 'white',
    fontFamily: 'Exo2-ExtraLightItalic',
  },
  picker: {
    width: 380,
    height: 50,
    color: 'white',
  },
  container: {
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#708090',
    borderWidth: 3,
  },
});

export default DetailsScreen;

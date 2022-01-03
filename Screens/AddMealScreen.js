import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import Button from '../Components/Button2';
import Header from '../Components/HeaderBack';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';

const service = new ProductService();

export default class AddMealScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      name: '',
      category: 'unknown',
      protein: -1,
      fat: -1,
      carbohydrates: -1,
      calories: -1,
    };
  }

  componentDidMount() {
    this.getUserId().then(r => console.log('Ok'));
  }

  async getUserId() {
    try {
      const id = await AsyncStorage.getItem('userId');
      this.setState({userId: id});
    } catch (e) {
      console.log(e);
    }
  }
  addProduct = async () => {
    if (
      this.state.name.length > 3 &&
      this.state.category !== 'unknown' &&
      this.state.protein >= 0 &&
      this.state.fat >= 0 &&
      this.state.carbohydrates >= 0 &&
      this.state.calories >= 0
    ) {
      const data = await service.postProduct(
        this.state.userId,
        this.state.name,
        this.state.category,
        this.state.protein,
        this.state.fat,
        this.state.carbohydrates,
        this.state.calories,
      );
      Alert.alert('Pomyslnie dodano produkt!');
      this.props.navigation.navigate('SearchMeal');
    } else {
      Alert.alert('Uzupelnij wszystkie pola!');
    }
  };

  render() {
    return (
      <View style={styles.background}>
        <Header name="Dodaj Produkt" navigation={this.props.navigation} />
        <View style={styles.box}>
          <Text style={styles.mainText}>NAZWA</Text>
          <TextInput
            placeholder="USTAW"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={name => this.setState({name: name})}
          />
          <Text style={styles.mainText}>KATEGORIA</Text>
          <View style={styles.container}>
            <Picker
              selectedValue={this.state.category}
              style={styles.picker}
              onValueChange={category => this.setState({category: category})}>
              <Picker.Item label="WYBIERZ ..." value="Unknown" />
              <Picker.Item label="PRODUKTY ZBOŻOWE" value="zboże" />
              <Picker.Item label="WARZYWA" value="warzywa" />
              <Picker.Item label="OWOCE" value="owoce" />
              <Picker.Item label="PRODUKTY MLECZNE" value="mleczne" />
              <Picker.Item label="PRODUKTY MIĘSNE" value="mięsne" />
              <Picker.Item label="TŁUSZCZE" value="tłuszcze" />
              <Picker.Item label="CUKRY I SŁODYCZE" value="cukry" />
              <Picker.Item label="NAPOJE" value="napoje" />
            </Picker>
          </View>
          <Text style={styles.mainText}>BIAŁKO [W 100g]</Text>
          <TextInput
            placeholder="USTAW"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={protein => this.setState({protein: protein})}
          />
          <Text style={styles.mainText}>TŁUSZCZ [W 100g]</Text>
          <TextInput
            placeholder="USTAW"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={fat => this.setState({fat: fat})}
          />
          <Text style={styles.mainText}>WĘGLOWODANY [W 100g]</Text>
          <TextInput
            placeholder="USTAW"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={carbohydrates =>
              this.setState({carbohydrates: carbohydrates})
            }
          />
          <Text style={styles.mainText}>KALORIE [W 100g]</Text>
          <TextInput
            placeholder=" USTAW"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={calories => this.setState({calories: calories})}
          />
          <View style={styles.button}>
            <Button text="GOTOWE" fun={() => this.addProduct()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    margin: 10,
  },
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#181818',
  },
  mainText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#b70000',
    marginBottom: -3,
    marginTop: 4,
  },
  input: {
    margin: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#708090',
    borderWidth: 3,
    color: 'white',
  },
  container: {
    margin: 5,
    borderColor: '#708090',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 380,
    height: 40,
    color: 'white',
  },
  button: {
    marginTop: -15,
  },
});

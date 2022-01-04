import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';
import Header from '../Components/HeaderBack';
import Button from '../Components/Button3';

export default class CalculateScreen extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      dateEat: '',
      kcal: '',
      newKcal: '100',
      b: '',
      t: '',
      w: '',
    };
  }

  async get() {
    const {date, dateEat} = await this.props.route.params;
    this.setState({
      date: date,
      dateEat: dateEat,
      kcal: date.calories,
      b: date.protein,
      t: date.fat,
      w: date.carbohydrates,
    });
  }

  componentDidMount() {
    Keyboard.dismiss;
    this.get().then(r => console.log('OO'));
  }

  calculate(kcal, newKcal, protein, fat, carbohydrates) {
    const result = (kcal * newKcal) / 100;
    const b = (protein * newKcal) / 100;
    const t = (fat * newKcal) / 100;
    const w = (carbohydrates * newKcal) / 100;
    console.log(t);
    this.setState({kcal: result, newKcal: newKcal, b: b, t: t, w: w});
  }

  render() {
    return (
      <View style={styles.background}>
        <Header name="Kalorie" navigation={this.props.navigation} />
        <View style={styles.eat}>
          <Text style={styles.eatText}>{this.state.dateEat}</Text>
        </View>
        <View style={styles.top}>
          <View style={styles.topBox}>
            <Text style={styles.topBoxText1}>{this.state.date.name}</Text>
          </View>
          <View style={styles.topBox}>
            <Text style={styles.topBoxText}>
              100 {this.state.date.packaging}
            </Text>
            <Text style={styles.topBoxText}>
              {this.state.date.calories} kcal
            </Text>
          </View>
          <View style={styles.topBox}>
            <TextInput
              placeholder="100"
              placeholderTextColor="white"
              style={styles.input}
              onChangeText={newKcal =>
                this.calculate(
                  this.state.date.calories,
                  newKcal,
                  this.state.date.protein,
                  this.state.date.fat,
                  this.state.date.carbohydrates,
                )
              }
            />
            <Text style={styles.topBoxText2}>{this.state.date.packaging}</Text>
            <Text style={styles.topBoxText}>{this.state.kcal} kcal</Text>
          </View>
          <Button text="DODAJ" />
        </View>

        <View style={styles.down}>
          <Text style={styles.title}>Wartości Odżywcze</Text>
          <View style={styles.table}>
            <View style={styles.tableTop}>
              <Text style={styles.tableTopText}>
                Na 100{this.state.date.packaging}
              </Text>
              <Text style={styles.tableTopText}>
                Na {this.state.newKcal}
                {this.state.date.packaging}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableIn}>
              <Text style={styles.tableDownText}>
                Białka({this.state.date.packaging})
              </Text>
            </View>
            <View style={styles.tableOn}>
              <Text style={styles.tableText}>{this.state.date.protein}</Text>
              <Text style={styles.tableText}>{this.state.b}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableIn}>
              <Text style={styles.tableDownText}>
                Tłuszcze({this.state.date.packaging})
              </Text>
            </View>
            <View style={styles.tableOn}>
              <Text style={styles.tableText}>{this.state.date.fat}</Text>
              <Text style={styles.tableText}>{this.state.t}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableIn}>
              <Text style={styles.tableDownText}>
                Węglowodany({this.state.date.packaging})
              </Text>
            </View>
            <View style={styles.tableOn}>
              <Text style={styles.tableText}>
                {this.state.date.carbohydrates}
              </Text>
              <Text style={styles.tableText}>{this.state.w}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#999999',
  },
  top: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
  },
  down: {
    width: '100%',
    height: '50%',
    backgroundColor: '#333333',
  },
  table: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 10,
    paddingBottom: 10,
    borderWidth: 4,
    borderColor: '#333333',
    borderBottomColor: '#999999',
  },
  tableText: {
    marginLeft: 80,
    marginRight: 50,
    color: '#b70000',
    fontSize: 15,
    fontWeight: '700',
  },
  tableTopText: {
    marginLeft: 80,
    color: 'white',
  },
  tableDownText: {
    color: 'white',
  },
  tableIn: {
    width: '30%',
    flexDirection: 'row',
  },
  tableOn: {
    width: '60%',
    flexDirection: 'row',
  },
  tableTop: {
    flexDirection: 'row',
    marginLeft: 95,
    padding: 0,
  },
  title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  eat: {
    height: '4%',
    width: '100%',
    backgroundColor: '#b70000',
    borderWidth: 2,
    marginTop: -10,
    borderColor: '#333333',
  },
  eatText: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: 40,
    marginLeft: 65,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#b70000',
    borderWidth: 2,
    color: 'white',
  },
  topBox: {
    margin: 10,
    width: '95%',
    height: '15%',
    backgroundColor: '#333333',
    flexDirection: 'row',
  },
  topBoxText1: {
    color: 'white',
    marginLeft: 180,
    marginTop: 10,
  },
  topBoxText: {
    color: 'white',
    marginLeft: 100,
    marginTop: 10,
  },
  topBoxText2: {
    color: 'white',
    margin: 10,
  },
});

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import Header from '../Components/Header';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Components/Button3';
import ProgressCircle from 'react-native-progress-circle';
import {format} from 'date-fns';
const subDays = require('date-fns/subDays');

export default class ResultScreen extends Component {
  constructor() {
    super();
    this.state = {
      weight: null,
      weightTemp: null,
      dataTime: '',
      kcalToday: 0,
      bToday: 2220,
      tToday: 0,
      wToday: 0,
      data: [],
      percent: 0,
      days: [],
    };
  }



  temp = {
    labels: [
      format(subDays(new Date(), 7), 'dd/MM').toString(),
      format(subDays(new Date(), 6), 'dd/MM').toString(),
      format(subDays(new Date(), 7), 'dd/MM').toString(),
      format(subDays(new Date(), 4), 'dd/MM').toString(),
      format(subDays(new Date(), 3), 'dd/MM').toString(),
      format(subDays(new Date(), 2), 'dd/MM').toString(),
      format(subDays(new Date(), 1), 'dd/MM').toString(),
    ],
    datasets: [
      {
        data: [93, 92.5, 92, 91.5, 91, 90.5, 90],
        color: (opacity = 1) => `rgba(255, 130, 67, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Ostatnie 7 dni'],
  };




  componentDidMount() {
    this.getDateAsync();
    this.getCurrentDate();

  }

  async getDateAsync() {
    const detail = JSON.parse(await AsyncStorage.getItem('details'));
    this.setState({
      percent: Math.round(
        ((await AsyncStorage.getItem('kcal')) / detail.kcalUserBalance) * 100,
      ),
    });

    this.setState({
      weight: await AsyncStorage.getItem('weight'),
      kcalToday: await AsyncStorage.getItem('kcal'),
      bToday: await AsyncStorage.getItem('b'),
      tToday: await AsyncStorage.getItem('t'),
      wToday: await AsyncStorage.getItem('w'),
      data: JSON.parse(await AsyncStorage.getItem('wykres')),

    });
  }

  async saveAsync() {
    this.setState({weight: this.state.weightTemp});
    await AsyncStorage.setItem('weight', this.state.weightTemp);
  }

  getCurrentDate() {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    this.setState({dataTime: date + '.0' + month + '.' + year});
  }

  chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(192, 192, 192, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  renderWeightInput() {
    return (
      <View style={styles.pack}>
        <View>
          <Text style={styles.dataText}>
            {this.state.dataTime} - UZUPEŁNIJ WAGE{' '}
          </Text>
        </View>
        <View style={styles.box}>
          <TextInput
            placeholder="WAGA"
            placeholderTextColor="white"
            showSoftInputOnFocus={false}
            keyboardType="numeric"
            style={styles.input}
            onChangeText={weight => this.setState({weightTemp: weight})}
          />
          <View style={styles.container}>
            <Text style={styles.weightText}>kg</Text>
          </View>
        </View>
        <Button text="USTAW" fun={() => this.saveAsync()} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        <Header name="Statystyki" navigation={this.props.navigation} />
        <ScrollView style={styles.scrollview}>
          <View style={styles.weight}>
            {this.state.weight === null ? this.renderWeightInput() : <View />}
          </View>
          <View style={styles.progress}>
            <Text style={styles.progressText}>Dostarczone kalorie</Text>
            <ProgressCircle
              percent={this.state.percent}
              radius={50}
              borderWidth={8}
              color="#ff8243"
              shadowColor="#708090"
              bgColor="#fff">
              <Text style={{fontSize: 28, fontFamily: 'Domine-Bold'}}>
                {this.state.percent + '%'}
              </Text>
            </ProgressCircle>

            <Text style={styles.progressText}>
              Dostarczone wartości odżywcze
            </Text>
            <PieChart
              data={this.state.data}
              width={screenWidth}
              height={220}
              chartConfig={this.chartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              center={[10, 20]}
            />
            <Text style={styles.progressText}>Waga</Text>
            <LineChart
              data={this.temp}
              width={screenWidth}
              height={220}
              chartConfig={this.chartConfig}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#181818',
  },
  input: {
    width: 265,
    margin: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#708090',
    borderWidth: 3,
    color: 'white',
    fontFamily: 'Domine-Bold',
  },
  container: {
    width: 50,
    margin: 5,
    borderColor: '#708090',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flexDirection: 'row',
  },
  weightText: {
    color: 'white',
    fontFamily: 'Domine-Bold',
  },
  progressText: {
    fontSize: 15,
    margin: 15,
    color: 'white',
    fontFamily: 'Domine-Bold',
  },
  dataText: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Domine-Bold',
  },
  pack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weight: {
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ff8243',
  },
  progress: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: '80%',
    width: '100%',
  },
});

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import Header from '../Components/Header';
import {BarChart, LineChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Components/Button3';
import * as Progress from 'react-native-progress';

export default class ResultScreen extends Component {
  constructor() {
    super();
    this.state = {
      weight: null,
      weightTemp: null,
      data: '',
    };
  }

  componentDidMount() {
    this.getDateAsync();
    this.getCurrentDate();
  }

  async getDateAsync() {
    this.setState({weight: await AsyncStorage.getItem('weight')});
  }

  async saveAsync() {
    this.setState({weight: this.state.weightTemp});
    await AsyncStorage.setItem('weight', this.state.weightTemp);
  }

  getCurrentDate() {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    this.setState({data: date + '/' + month + '/' + year});
  }

  // data = {
  //   labels: [
  //     '1.01',
  //     '2.01',
  //     '3.01',
  //     '4.01',
  //     '5.01',
  //     '6.01',
  //     '1.01',
  //     '2.01',
  //     '3.01',
  //     '4.01',
  //     '5.01',
  //     '6.01',
  //   ],
  //   datasets: [
  //     {
  //       data: [95, 105, 88, 70, 99, 43, 95, 105, 88, 70, 99, 43],
  //       color: (opacity = 1) => `rgba(183, 0, 0, ${opacity})`,
  //       strokeWidth: 4,
  //     },
  //   ],
  //   legend: ['Waga'],
  // };
  // chartConfig = {
  //   backgroundGradientFrom: '#2d2e30',
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: '#2d2e30',
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(183, 0, 0, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  // };

  renderWeightInput() {
    return (
      <View style={styles.pack}>
        <View>
          <Text style={styles.dataText}>
            {this.state.data} - UZUPEŁNIJ WAGE{' '}
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
        <Header name="Postęp" />
        <View style={styles.main}>
          {this.state.weight === null ? this.renderWeightInput() : <View />}
          <Progress.Circle progress={0.3} size={30} indeterminate={true} />

          {/*<LineChart*/}
          {/*  data={this.data}*/}
          {/*  width={screenWidth}*/}
          {/*  height={220}*/}
          {/*  chartConfig={this.chartConfig}*/}
          {/*/>*/}
          {/*<BarChart*/}
          {/*  // style={graphStyle}*/}
          {/*  data={this.data}*/}
          {/*  width={screenWidth}*/}
          {/*  height={220}*/}
          {/*  // yAxisLabel="$"*/}
          {/*  chartConfig={this.chartConfig}*/}
          {/*  verticalLabelRotation={30}*/}
          {/*/>*/}
        </View>
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
  main: {marginTop: 30, width: '100%', height: '20%', justifyContent: 'center'},
  input: {
    width: 265,
    margin: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#708090',
    borderWidth: 3,
    color: 'white',
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
  },
  dataText: {
    color: 'white',
    fontSize: 20,
  },
  pack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

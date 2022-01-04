import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Header from '../Components/Header';

import {Dimensions} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {ProductItem} from '../Components/ProductItem';
const screenWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      isResult: true,
      isLoading: false,
      details: null,
    };
  }

  data = {
    labels: [
      '1.01',
      '2.01',
      '3.01',
      '4.01',
      '5.01',
      '6.01',
      '1.01',
      '2.01',
      '3.01',
      '4.01',
      '5.01',
      '6.01',
    ],
    datasets: [
      {
        data: [95, 105, 88, 70, 99, 43, 95, 105, 88, 70, 99, 43],
        color: (opacity = 1) => `rgba(183, 0, 0, ${opacity})`,
        strokeWidth: 4,
      },
    ],
    legend: ['Waga'],
  };
  chartConfig = {
    backgroundGradientFrom: '#2d2e30',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#2d2e30',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(183, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  componentDidMount() {
    this.getAsync();
  }

  async getAsync() {
    const details = await AsyncStorage.getItem('details');

    this.setState({details: JSON.parse(details), isLoading: true});
  }

  changeViewResult() {
    this.setState({isResult: true});
  }
  changeViewProfile() {
    this.setState({isResult: false});
  }

  renderResult() {
    return (
      <View>
        <LineChart
          data={this.data}
          width={screenWidth}
          height={220}
          chartConfig={this.chartConfig}
        />
        <BarChart
          // style={graphStyle}
          data={this.data}
          width={screenWidth}
          height={220}
          // yAxisLabel="$"
          chartConfig={this.chartConfig}
          verticalLabelRotation={30}
        />
      </View>
    );
  }
  renderProfile() {
    return (
      <View>
        <Text>{this.state.details.gender}</Text>
        <Text>
          {this.state.details.dateOfBirth.day}{' '}
          {this.state.details.dateOfBirth.month}{' '}
          {this.state.details.dateOfBirth.year}
        </Text>
        <Text>{this.state.details.height}</Text>
        <Text>{this.state.details.activity}</Text>
        <Text>{this.state.details.type}</Text>
        <Text>{this.state.details.somatotyp}</Text>
        <Text>{this.state.details.kcalUserBalance}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        <Header name="Podsumowanie" />
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => this.changeViewProfile()}
            style={styles.button}>
            <Text style={styles.buttonText}>PROFIL</Text>
          </TouchableOpacity>
        </View>
        <View>
          {this.state.isResult ? this.renderResult() : this.renderProfile()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  buttons: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 30,
    width: '50%',
    borderWidth: 2,
    backgroundColor: '#b70000',
    borderColor: '#999999',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
  },
  update: {
    color: 'black',
    fontSize: 20,
  },
});

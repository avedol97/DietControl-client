import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from '../Components/Header';
import {BarChart, LineChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
import {Dimensions} from 'react-native';

export default class ResultScreen extends Component {
  constructor() {
    super();
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

  render() {
    return (
      <View>
        <Header name="Postęp" />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '80%',
  },
  view: {
    margin: 10,
  },
});

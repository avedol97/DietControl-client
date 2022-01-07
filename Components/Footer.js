import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';


export default class Footer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.line}>
          <Text style={styles.text_line_one}>Kcal</Text>
          <Text style={styles.text_line_one}>Białko</Text>
          <Text style={styles.text_line_one}>Tł.</Text>
          <Text style={styles.text_line_one}>Węgl.</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.text_line_two}>{this.props.kcal}</Text>
          <Text style={styles.text_line_two}>{this.props.b}</Text>
          <Text style={styles.text_line_two}>{this.props.t}</Text>
          <Text style={styles.text_line_two}>{this.props.w}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#2d2e30',
    height: '8%',
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 4,
    borderBottomColor: '#b70000',
    borderColor: '#2d2e30',
    paddingTop: 5,
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 40,
  },
  text_line_one: {
    fontSize: 12,
    textAlign: 'center',
    color: '#b70000',
  },
  text_line_two: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
});

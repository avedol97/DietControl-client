import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import Meals from '../Components/Meals';
import Meal from '../Components/Meal';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default class DayScreen extends Component {
  constructor() {
    super();
    this.state = {
      breakfast: [],
      lunch: [],
      dinner: [],
    };
  }

  meal = [
    {
      name: 'Woda Gazowana',
      kcal: '100',
      b: '100',
      t: '100',
      w: '100',
    },
    {
      name: 'Woda NieGazowana',
      kcal: '100',
      b: '100',
      t: '100',
      w: '100',
    },
    {
      name: 'Woda Mocno Gazowana',
      kcal: '100',
      b: '100',
      t: '100',
      w: '100',
    },
  ];

  render() {
    return (
      <View style={styles.background}>
        <Header name="Data" />

        <ScrollView>
          <Meals
            text="ŚNIADANIE [ 6.00 - 11.00 ]"
            fun={() => this.props.navigation.navigate('AddMeal')}
          />
          {this.meal.map(meal => (
            <Meal
              key={meal.name}
              name={meal.name}
              kcal={meal.kcal}
              b={meal.b}
              t={meal.t}
              w={meal.w}
            />
          ))}
          <Meals text="OBIAD [ 11.00 - 16.00 ] " />
          {this.meal.map(meal => (
            <Meal
              key={meal.name}
              name={meal.name}
              kcal={meal.kcal}
              b={meal.b}
              t={meal.t}
              w={meal.w}
            />
          ))}
          <Meals text="KOLACJA [ 16.00 - 19.00 ]" />
          {this.meal.map(meal => (
            <Meal
              key={meal.name}
              name={meal.name}
              kcal={meal.kcal}
              b={meal.b}
              t={meal.t}
              w={meal.w}
            />
          ))}
        </ScrollView>
        <Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
});

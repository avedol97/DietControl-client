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

  getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return date + '/' + month + '/' + year;
  };

  meal = [
    {
      name: 'Cola Gazowana',
      kcal: '100',
      b: '100',
      t: '100',
      w: '100',
    },
    {
      name: 'Cola NieGazowana',
      kcal: '100',
      b: '100',
      t: '100',
      w: '100',
    },
    {
      name: 'Cola Mocno Gazowana',
      kcal: '100',
      b: '100',
      t: '100',
      w: '100',
    },
  ];

  render() {
    return (
      <View style={styles.background}>
        <Header
          name={this.getCurrentDate()}
          navigation={this.props.navigation}
        />
        <ScrollView>
          <View style={styles.box}>
            <Meals
              text="ŚNIADANIE [ 6.00 - 11.00 ]"
              fun={() => this.props.navigation.navigate('SearchMeal')}
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
            <Meals
              text="OBIAD [ 11.00 - 16.00 ] "
              fun={() => this.props.navigation.navigate('SearchMeal')}
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
            <Meals
              text="KOLACJA [ 16.00 - 19.00 ]"
              fun={() => this.props.navigation.navigate('SearchMeal')}
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
          </View>
        </ScrollView>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  box: {
    margin: 10,
    marginBottom: 150,
  },
});

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Meals from '../Components/Meals';
import Meal from '../Components/Meal';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailsService from '../services/DetailsService';

const service = new DetailsService();

export default class DayScreen extends Component {
  constructor() {
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      isAdmin: 'true',
      isDetails: 'true',
      isLoading: true,
      kcal: 0,
      kcalDetails: 0,
      b: 0,
      t: 0,
      w: 0,
      bfName: 'ŚNIADANIE',
      lunchName: 'OBIAD',
      dinnerName: 'KOLACJA',
    };
  }
  forceUpdateHandler() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.getDateAsync();
    this.getDetails();
  }

  async getDateAsync() {
    const detail = await AsyncStorage.getItem('isDetails');
    this.setState({isAdmin: await AsyncStorage.getItem('isAdmin')});
    this.setState({isDetails: await AsyncStorage.getItem('isDetails')});
    this.setState({
      bf: JSON.parse(await AsyncStorage.getItem('bf')),
      lunch: JSON.parse(await AsyncStorage.getItem('lunch')),
      dinner: JSON.parse(await AsyncStorage.getItem('dinner')),
      isLoading: false,
    });
    if (detail === 'false') {
      this.props.navigation.navigate('Details');
    }
  }

  async getDetails() {
    const id = await AsyncStorage.getItem('userId');
    try {
      const data = await service.getDetails(id);
      console.log(this.state.kcalDetails);
      AsyncStorage.setItem('details', JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return date + '/' + month + '/' + year;
  };

  async deleteElement(index, what) {
    if (what === 0) {
      AsyncStorage.removeItem('bf');
      this.state.bf.splice(index, 1);
      await AsyncStorage.setItem('bf', JSON.stringify(this.state.bf));
    }
    if (what === 1) {
      AsyncStorage.removeItem('lunch');
      this.state.lunch.splice(index, 1);
      await AsyncStorage.setItem('lunch', JSON.stringify(this.state.lunch));
    }
    if (what === 2) {
      AsyncStorage.removeItem('dinner');
      this.state.dinner.splice(index, 1);
      await AsyncStorage.setItem('dinner', JSON.stringify(this.state.dinner));
    }
    this.forceUpdateHandler();
    this.setState({kcal: 0, b: 0, t: 0, w: 0});
  }

  sumValue(kcal, b, t, w) {
    this.state.kcal += kcal;
    this.state.b += b;
    this.state.t += t;
    this.state.w += w;
  }

  renderBreakfastList = () => {
    if (this.state.bf !== null && this.state.isLoading === false) {
      return this.state.bf.map((meal, index) => {
        this.sumValue(meal.kcal, meal.b, meal.t, meal.w);
        return (
          <Meal
            key={index}
            name={meal.name}
            kcal={meal.kcal}
            b={meal.b}
            t={meal.t}
            w={meal.w}
            fun={() => this.deleteElement(index, 0)}
          />
        );
      });
    }
  };

  renderLunchList = () => {
    if (this.state.lunch !== null && this.state.isLoading === false) {
      return this.state.lunch.map((meal, index) => {
        this.sumValue(meal.kcal, meal.b, meal.t, meal.w);
        return (
          <Meal
            key={index}
            name={meal.name}
            kcal={meal.kcal}
            b={meal.b}
            t={meal.t}
            w={meal.w}
            fun={() => this.deleteElement(index, 1)}
          />
        );
      });
    }
  };

  renderDinnerList = () => {
    if (this.state.dinner !== null && this.state.isLoading === false) {
      return this.state.dinner.map((meal, index) => {
        this.sumValue(meal.kcal, meal.b, meal.t, meal.w);
        return (
          <Meal
            key={index}
            name={meal.name}
            kcal={meal.kcal}
            b={meal.b}
            t={meal.t}
            w={meal.w}
            fun={() => this.deleteElement(index, 2)}
          />
        );
      });
    }
  };

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
              fun={() =>
                this.props.navigation.navigate('SearchMeal', {
                  date: this.state.bfName,
                })
              }
            />
            {this.renderBreakfastList()}
            <Meals
              text="OBIAD [ 11.00 - 16.00 ] "
              fun={() =>
                this.props.navigation.navigate('SearchMeal', {
                  date: this.state.lunchName,
                })
              }
            />
            {this.renderLunchList()}
            <Meals
              text="KOLACJA [ 16.00 - 19.00 ]"
              fun={() =>
                this.props.navigation.navigate('SearchMeal', {
                  date: this.state.dinnerName,
                })
              }
            />
            {this.renderDinnerList()}
          </View>
        </ScrollView>
        <Footer
          kcal={Math.round(this.state.kcal)}
          b={Math.round(this.state.b)}
          t={Math.round(this.state.t)}
          w={Math.round(this.state.w)}
        />
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

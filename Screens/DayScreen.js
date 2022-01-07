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
import BalanceService from '../services/BalanceService';

const service = new DetailsService();
const serviceBalance = new BalanceService();

export default class DayScreen extends Component {
  constructor() {
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      isAdmin: 'true',
      isDetails: 'true',
      isLoading: true,
      id: '',
      kcal: 0,
      b: 0,
      t: 0,
      w: 0,
      balance: 0,
      isDateBalance: false,
    };
  }
  forceUpdateHandler() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.getDateAsync();
    this.get();
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

  async get() {
    const id = await AsyncStorage.getItem('userId');

    try {
      const details = await service.getDetails(id);
      AsyncStorage.setItem('details', JSON.stringify(details));
      const balance = await serviceBalance.getBalanceDay(id);
      AsyncStorage.setItem('balance', JSON.stringify(balance));
      this.setState({weight: await AsyncStorage.getItem('weight')});
      console.log(await AsyncStorage.getItem('weight'));
      if (this.checkBalanceDay(balance)) {
        this.setState({isDateBalance: true});
      }
      this.setState({id: id, balance: balance});
    } catch (e) {
      console.log(e);
    }
  }

  getCurrentDate() {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return day + '/' + month + '/' + year;
  }

  checkBalanceDay(balance) {
    let check = false;
    balance.map(function (value, i) {
      if (
        value.date.day === new Date().getDate().toString() &&
        value.date.month === new Date().getMonth().toString() + 1 &&
        value.date.year === new Date().getFullYear().toString()
      ) {
        check = true;
      }
    });
    return check;
  }

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
    this.setState({kcal: 0, b: 0, t: 0, w: 0});
    this.forceUpdateHandler();
  }

  sumValue(kcal, b, t, w) {
    console.log((this.state.w += w));
    this.state.kcal += kcal;
    this.state.b += b;
    this.state.t += t;
    this.state.w += w;
  }

  async setAsync() {
    await AsyncStorage.setItem('b', this.state.t);
    await AsyncStorage.setItem('t', this.state.t);
    await AsyncStorage.setItem('w', this.state.w);
  }

  async createBalanceDay() {
    const data = await serviceBalance.postBalanceDay(
      this.state.id,
      {
        breakfast: this.state.bf,
        lunch: this.state.lunch,
        dinner: this.state.dinner,
      },
      {
        day: new Date().getDate().toString(),
        month: new Date().getMonth().toString() + 1,
        year: new Date().getFullYear().toString(),
      },
      this.state.b,
      this.state.t,
      this.state.w,
      this.state.kcal,
      this.state.weight,
    );
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
              fun={() => {
                this.setState({kcal: 0, b: 0, t: 0, w: 0});
                this.props.navigation.navigate('SearchMeal', {
                  date: 'ŚNIADANIE',
                });
              }}
            />
            {this.renderBreakfastList()}
            <Meals
              text="OBIAD [ 11.00 - 16.00 ] "
              fun={() => {
                this.setState({kcal: 0, b: 0, t: 0, w: 0});
                this.props.navigation.navigate('SearchMeal', {
                  date: 'OBIAD',
                });
              }}
            />
            {this.renderLunchList()}
            <Meals
              text="KOLACJA [ 16.00 - 19.00 ]"
              fun={() => {
                this.setState({kcal: 0, b: 0, t: 0, w: 0});
                this.props.navigation.navigate('SearchMeal', {
                  date: 'KOLACJA',
                });
              }}
            />
            {this.renderDinnerList()}
          </View>
        </ScrollView>
        <Footer
          kcal={Math.round(this.state.kcal)}
          kcalDetails={this.state.kcalDetails}
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
    backgroundColor: '#181818',
  },
  box: {
    margin: 10,
    marginBottom: 150,
  },
});

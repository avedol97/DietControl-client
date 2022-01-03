import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from '../Components/Header';
import MySpeedDial from '../Components/MySpeedDial';
import SwitchComponent from '../Components/SwitchComponent';
import ProductService from '../services/ProductService';
import {ProductItem} from '../Components/ProductItem';


const service = new ProductService();

export default class SearchMealScreen extends Component {
  constructor() {
    super();
    this.state = {
      productList: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getProductList().then(r => console.log('Oks'));
    console.log(this.state.productList);
  }

  async getProductList() {
    try {
      const data = await service.getAllProduct();
      this.setState({productList: data, isLoading: false,});
    } catch (e) {
      console.log(e);
    }
  }

  renderProductList = () => {
    return this.state.productList.map((product, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            this.props.navigation.navigate('DoReservation', {date: product})
          }>
          <ProductItem key={index} product={product} />
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <View>
        <Header name="Produkt" />
        <View style={styles.background}>
          <View>
            <SwitchComponent placeholder="Znajdź Produkt..." />
            <ScrollView style={styles.scrollView}>
              {!this.state.isLoading ? (
                this.renderProductList()
              ) : (
                <View style={styles.animation}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
            </ScrollView>
          </View>
          <View>
            <MySpeedDial navigation={this.props.navigation} />
          </View>

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
  animation: {
    marginTop: '60%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    height: '80%',
  },
});

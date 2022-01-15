import React, {Component} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../Components/HeaderBack';
import MySpeedDial from '../Components/MySpeedDial';
import ProductService from '../services/ProductService';
import {ProductItem} from '../Components/ProductItem';
import Icon from 'react-native-vector-icons/Ionicons';

const service = new ProductService();

export default class SearchMealScreen extends Component {
  constructor() {
    super();
    this.state = {
      productList: null,
      isLoading: true,
      date: null,
      productListFilter: null,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getProductList().then(r => console.log(r));
  }

  onRefresh = () => {
    this.setState({isFetching: true}, () => {
      this.setState({isFetching: false}), this.getProductList();
    });
  };

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ) {
    const {date} = this.props.route.params;
    if (this.state.date !== date) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({date: date});
    }
  }

  async getProductList() {
    try {
      const data = (await service.getAllProduct()).reverse();
      this.setState({
        productList: data,
        productListFilter: data,
        isLoading: false,
        search: '',
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderProductList = () => {
    return this.state.productListFilter.map((product, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            this.props.navigation.navigate('Calculate', {
              date: product,
              timeOfDayProduct: this.state.date,
            })
          }>
          <ProductItem key={index} product={product} />
        </TouchableOpacity>
      );
    });
  };

  async searchProduct(textToSearch) {
    this.setState({
      productListFilter: this.state.productList.filter(i =>
        i.name.toLowerCase().includes(textToSearch.toLowerCase()),
      ),
    });
  }

  render() {
    return (
      <View>
        <Header name="Produkt" navigation={this.props.navigation} />

        <View style={styles.eat}>
          <Text style={styles.eatText}>{this.state.date}</Text>
        </View>

        <View style={styles.background}>
          <View style={styles.search}>
            <View style={styles.iconBox}>
              <Icon
                style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}
                name="search"
              />
            </View>
            <TextInput
              style={styles.searchInput}
              // showSoftInputOnFocus={false}
              // keyboardType="numeric"
              placeholder="Wpisz"
              placeholderTextColor="black"
              onChangeText={textToSearch => {
                this.searchProduct(textToSearch).then(r => console.log(r));
              }}
            />
          </View>

          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isFetching}
                onRefresh={this.onRefresh}
              />
            }>

            {!this.state.isLoading ? (
              this.renderProductList()
            ) : (
              <View style={styles.animation}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
          </ScrollView>
        </View>
        <MySpeedDial navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '85%',
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
    height: '90%',
  },
  eat: {
    height: '4%',
    width: '100%',
    backgroundColor: '#ff8243',
    borderWidth: 2,
    marginTop: -10,
    borderColor: '#333333',
  },
  eatText: {
    color: 'white',
    textAlign: 'center',
    padding: 3,
    fontFamily: 'Domine-Regular',
  },
  search: {
    margin: 10,
    borderWidth: 2,
    height: '8%',
    width: '96%',
    backgroundColor: '#999999',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: '#999999',
    padding: 5,
    height: '100%',
    width: '80%',
    color: 'black',
    fontSize: 12,
    fontFamily: 'Domine-Medium',
  },
  iconBox: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
});

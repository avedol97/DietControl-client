import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export function ProductItem(props) {
  return (
    <TouchableOpacity>
      <View style={styles.productContainer}>
        <Text style={styles.productText}>{props.product.name}</Text>
        <Text style={styles.productText}>{props.product.calories}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: '#333333',
    borderWidth: 4,
    borderColor: '#999999',
    display: 'flex',
    padding: 5,
    marginTop: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  productText: {
    color: 'white',
    fontSize: 10,
  },
});

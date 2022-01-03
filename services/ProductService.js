import React, {Component} from 'react';

export default class ProductService extends Component {
  baseUrl = 'http://192.168.0.171:3000/';

  postProduct = async (
    id,
    name,
    category,
    protein,
    fat,
    carbohydrates,
    calories,
  ) => {
    await fetch(this.baseUrl + 'user/product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUser: id,
        name: name,
        category: category,
        protein: protein,
        fat: fat,
        carbohydrates: carbohydrates,
        calories: calories,
      }),
    }).then(response => console.log(response));
  };

  getAllProduct = async () => {
    return await fetch(this.baseUrl + 'user/product/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  };
}

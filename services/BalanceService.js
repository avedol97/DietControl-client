import React, {Component} from 'react';

export default class DetailsService extends Component {
  baseUrl = 'http://192.168.0.171:3000/';

  postBalanceDay = async (
    id,
    idProduct,
    date,
    protein,
    fat,
    carbohydrates,
    kcalToday,
    weight,
  ) => {
    await fetch(this.baseUrl + 'balance', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        idProduct: idProduct,
        date: date,
        protein: protein,
        fat: fat,
        carbohydrates: carbohydrates,
        kcalToday: kcalToday,
        weight: weight,
      }),
    }).then(response => console.log(response));
  };

  getBalanceDay = async id => {
    return await fetch(this.baseUrl + 'balance?id=' + id, {
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

import React, {Component} from 'react';

export default class DetailsService extends Component {
  baseUrl = 'http://192.168.0.171:3000/';

  postDetails = async (id, gender, date, height, weight, activity, type, somatotyp) => {
    await fetch(this.baseUrl + 'user/details', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        gender: gender,
        date: date,
        height: height,
        weight: weight,
        activity: activity,
        type: type,
        somatotyp: somatotyp,
      }),
    }).then(response => console.log(response));
  };
}

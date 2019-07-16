import React from 'react';
import { addCity, delCity } from '../actions'

import { getCityData } from '../apixu'
import { CityItem } from './CityItem'
import { store } from './Store'

import '../App.css';

const AppTitle = ({title}) => (
    <div className="AppTitle">{title}</div>
  )
  
  const CityInput = (props) => (
    <div>
      <input type="text" id="input-city-name" placeholder="Enter city name here" />
      <button onClick = {props.onPressButton}>Add city</button>
    </div>
  )
  
  export class Cities extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = { fetched: false };
      this.cityAddRequest = this.cityAddRequest.bind(this);
      this.cityRemoveRequest = this.cityRemoveRequest.bind(this);
    }
    cityAddRequest(event) {
      const cityName = document.getElementById("input-city-name").value
      if (!cityName) return;
  
      getCityData(
        e => console.log(e),
        () => store.dispatch(addCity(cityName)),
        cityName
      )
    }
    cityRemoveRequest(cityName) {
      store.dispatch(delCity(cityName));
    }
    render() {
      const onPressButton = event => { this.cityAddRequest(event); }
  
      return (
        <div>
          <AppTitle title="OTUS. Weather info application" />
          <CityInput onPressButton = {onPressButton}/>
          <div className="Cities">
            { (this.props.cities)
              ? this.props.cities.map((value, index) => <CityItem key={index} cityName={value} cityRemoveRequest={this.cityRemoveRequest}/>)
              : null
            }
          </div>
        </div>
      );
    }
  }
  
import React from 'react';
import { getCityData } from '../apixu'
import { CityForecastTable } from './CityForecast'

import '../App.css';

export class CityInfo extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = { fetched: false, json: {} }
    }
    componentDidMount() {
      getCityData(
        e => { this.setState({ fetched: false }); console.log(e); },
        json => this.setState({ fetched: true, json: json }),
        this.props.cityName
      )
    }
    render() {
  
      const data = this.state.json;
  
      return (
        (this.state.fetched)
        ? (
          <div>
            <div className="CityName">
              {this.props.cityName}
            </div>
            <div className="CityWeatherCell">
              <img src={this.state.json.current.condition.icon} alt={this.state.json.current.condition.text} />
              <div className="CityWeatherCellTemp">
                +{this.state.json.current.temp_c}&deg;C
              </div>
              <div className="CityWeatherCellWind">
                {this.state.json.current.wind_dir} {Math.round(this.state.json.current.wind_kph * 1000 /3600 * 10) / 10} м/с {this.state.json.current.humidity}%
              </div>
              <div className="CityWeatherCellCond">
                {this.state.json.current.condition.text}
              </div>
            </div>
            <div>
              <CityForecastTable data = {(data) ? data.forecast.forecastday : []} />
            </div>
          </div>
          )
        : null
      );
    }
  }
  
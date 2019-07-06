import React from 'react';
import '../App.css';

const CityForecastTableCell = (props) => (
    <div className="CityWeatherCell">
      <img src={props.day.condition.icon} alt={props.day.condition.text} />
      <div className="CityWeatherCellTemp">
        +{props.day.avgtemp_c}&deg;C
      </div>
      <div className="CityWeatherCellWind">
        {"?"} {Math.round(props.day.maxwind_kph * 1000 /3600 * 10) / 10} м/с {props.day.avghumidity}%
      </div>
      <div className="CityWeatherCellCond">
        {props.day.condition.text}
      </div>
    </div>
  )
  
  const CityForecastTableRow = (props) => (
    <div className="CityForecastRow">
      {props.data && props.data.map((value, index) => ( <CityForecastTableCell { ...value } key={index} />))}
    </div>
  )
  
  export const CityForecastTable = (props) => (
    <div className="CityForecastTable">
      <div className="CityForecastHeaderRow">
        <div className="CityForecastHeaderCell">
          Today
        </div>
        <div className="CityForecastHeaderCell">
          Tomorrow
        </div>
        <div className="CityForecastHeaderCell">
          + 2 days
        </div>
        <div className="CityForecastHeaderCell">
          + 3 days
        </div>
        <div className="CityForecastHeaderCell">
          + 4 days
        </div>
      </div>
  
      <CityForecastTableRow data = {(props.data) ? props.data : []} />
  
    </div>
  )
  
  
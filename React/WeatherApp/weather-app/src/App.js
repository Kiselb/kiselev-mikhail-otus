import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import { CitiesReducer } from './reducers'
import { addCity, delCity } from './actions'
import { loadState, saveState } from './localStorage'
import './App.css';

const persistedState = loadState();
const store = createStore(
  CitiesReducer,
  persistedState
);

store.subscribe(() => {
  saveState({ cities: store.getState().cities });
});

const APIXU_URL = (cityName) => (`http://api.apixu.com/v1/forecast.json?key=01b1d58699d7441eb7133613191006&q=${cityName}&days=5`);

const AppTitle = ({title}) => (
  <div style={{ fontSize: '32px', marginLeft: "10px"}}>{title}</div>
)

const CityInput = (props) => (
  <div>
    <input type="text" id="input-city-name" placeholder="Enter city name here" style={{ marginLeft: "10px", marginTop: "10px"}} />
    <button style={{ width: "80px"}} onClick = {props.onPressButton}>Add city</button>
  </div>
)

class CityItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { fetched: false, json: {} };
  }
  componentDidMount() {
    fetch(APIXU_URL(this.props.cityName))
      .then(response => {
        if (response.ok) return response.json();
        throw Error("Communication error");
      })
      .then(json => {
        this.setState( { fetched: true, json: json } );
      })
      .catch(e => (this.setState( { fetched: false })));
  }
  render() {

    const removeCity = () => (this.props.CityRemoveRequest(this.props.cityName));

    return (
      (this.state.fetched)
        ? (
          <div className="City">
            <div className="CityName">
              <a href={"/" + this.props.cityName}>{this.props.cityName}</a>
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
            <div className="CityName">
              <button style={{ top: "25px", left: "10px"}} onClick={removeCity}>Remove</button>
            </div>
          </div>
          )
        : null
    );
  }
}

class Cities extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { fetched: false };
    this.CityAddRequest = this.CityAddRequest.bind(this);
    this.CityRemoveRequest = this.CityRemoveRequest.bind(this);
  }
  CityAddRequest(event) {
    const cityName = document.getElementById("input-city-name").value
    if (!cityName) return;

    // Check city name (http request) on validity
    // If city name is valid then save city name 
    fetch(APIXU_URL(cityName))
      .then(response => {
        if (response.ok) return;
        throw Error("Invalid city name or communication error");
      })
      .then(() => {
        store.dispatch(addCity(cityName));
      })
      .catch(e => (console.log(e)));
  }
  CityRemoveRequest(cityName) {
    console.log(cityName);
    store.dispatch(delCity(cityName));
  }
  render() {
    const onPressButton = event => { this.CityAddRequest(event); }

    return (
      <div>
        <AppTitle title="OTUS. Weather info application" />
        <CityInput onPressButton = {onPressButton}/>
        <div className="Cities">
          { (this.props.cities)
            ? this.props.cities.map((value, index)=>(<CityItem key={index} cityName={value} CityRemoveRequest={this.CityRemoveRequest}/>))
            : null
          }
        </div>
      </div>
    );
  }
}

const CityForecastTableCell = (props) => (
  <div className="CityWeatherCell">
    <img src={props.day.condition.icon} alt={props.day.condition.text} />
    <div className="CityWeatherCellTemp">
      +{props.day.avgtemp_c}&deg;C
    </div>
    <div className="CityWeatherCellWind">
      {"E"} {Math.round(props.day.maxwind_kph * 1000 /3600 * 10) / 10} м/с {props.day.avghumidity}%
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

const CityForecastTable = (props) => (
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

class CityInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { fetched: false, json: {} }
  }
  componentDidMount() {
    fetch(APIXU_URL(this.props.cityName))
      .then(response => {
        if (response.ok) return response.json();
        throw Error("Communication error");
      })
      .then(json => {
        this.setState( { fetched: true, json: json } );
      })
      .catch(e => (this.setState( { fetched: false })));
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

const CitiesConnected = connect(state => ({ cities: state.cities }))(Cities);

const App = () => (
  <BrowserRouter>
    <Route exact path="/" render={() => { return (<Provider store={store}><CitiesConnected /></Provider>); }}></Route>
    <Route exact path="/:cityname" render={({ match }) => (<CityInfo cityName={ match.params.cityname }/>)}></Route>
  </BrowserRouter>
);

export default App;

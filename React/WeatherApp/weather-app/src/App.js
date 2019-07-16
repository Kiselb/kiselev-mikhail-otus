import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import { Cities } from './components/Cities'
import { CityInfo } from './components/CityInfo'
import { store } from './components/Store'

import './App.css';

const CitiesConnected = connect(state => ({ cities: state.cities }))(Cities);

const App = () => (
  <BrowserRouter>
    <Route exact path="/" render={() => <Provider store={store}><CitiesConnected /></Provider>}></Route>
    <Route path="/:cityname" render={({ match }) => <CityInfo cityName={ match.params.cityname }/>}></Route>
  </BrowserRouter>
);

export default App;

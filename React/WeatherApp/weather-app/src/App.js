import React from 'react';
import logo from './logo.svg';
import './App.css';

const AppTitle = ({title}) => (
  <div style={{ fontSize: '32px', marginLeft: "10px"}}>{title}</div>
)

const AddCity = (props) => (
  <div>
    <input type="text" placeholder="Введите название города" style={{ marginLeft: "10px", marginTop: "10px"}} />
    <button style={{ width: "80px"}} onClick = {props.onPressButton}>Добавить</button>
  </div>
)

const WeatherCell = (weather_state) => (
  <div style={{position: "relative", display: "table-cell", verticalAlign: "middle", textAlign: "center", width: "150px", minWidth: "150px", borderWidth: "1px", borderStyle: "solid", borderColor: "#C8C8C8", fontSize: "14px"}}>
    <div style={{position: "absolute", top: "5px", left: "5px", fontSize: "28px", display: "table-cell"}}>
      +{weather_state.temperature}&deg;C
    </div>
    <div style={{position: "absolute", top: "95px", left: "5px", fontSize: "16px", display: "table-cell"}}>
      {weather_state.wind_dir} {weather_state.wind_vel} м/с {weather_state.humidity}%
    </div>
    <div style={{position: "absolute", top: "5px", left: "95px", fontSize: "16px", display: "table-cell"}}>
      {weather_state.pressure} мм
    </div>
    {weather_state.description}
  </div>
)

const CityWeather = (city_weather_state) => (
  <div style={{ display: "table-row"}}>
    <div style={{ display: "table-cell", fontSize: "18px", height: "120px", borderWidth: "1px", borderStyle: "none", borderColor: "#C8C8C8", verticalAlign: "middle", paddingLeft: "10px", paddingRight: "10px"}}>
    {city_weather_state.city}
    </div>
    {city_weather_state.weather.map((value, index) => ( <WeatherCell { ...value} />))}
  </div>
)

const CityWeatherTable = ({data}) => (
  <div style={{ marginLeft: "10px", marginTop: "20px", borderCollapse: "collapse"}}>
    <div style={{ display: "table-row"}}>
      <div style={{ display: "table-cell", fontSize: "18px", height: "50px", borderWidth: "1px", borderStyle: "none", borderColor: "#C8C8C8", verticalAlign: "middle", paddingLeft: "10px", paddingRight: "10px"}}>
      </div>
      <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center", width: "150px", minWidth: "150px", borderWidth: "1px", borderStyle: "none", borderColor: "#C8C8C8"}}>
        Сегодня
      </div>
      <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center", width: "150px", minWidth: "150px", borderWidth: "1px", borderStyle: "none", borderColor: "#C8C8C8"}}>
        Завтра
      </div>
      <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center", width: "150px", minWidth: "150px", borderWidth: "1px", borderStyle: "none", borderColor: "#C8C8C8"}}>
        Послезавтра
      </div>
      <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center", width: "150px", minWidth: "150px", borderWidth: "1px", borderStyle: "none", borderColor: "#C8C8C8"}}>
        Послепослезавтра
      </div>
    </div>

    {data.map((value, index) => ( <CityWeather { ...value} />))}

  </div>
)

class AppWeather extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.data;
  }
  render() {

    const onPressButton = event => { alert('City added'); }

    return (
      <div>
      <AppTitle title="OTUS. Приложение погоды" />
      <AddCity onPressButton = {onPressButton}/>
      <CityWeatherTable data = {this.state}/>
    </div>
    );
  }
}

const weather_on_cities = [
  {
    city: 'Москва',
    weather: [
      { description: 'солнечно', temperature: 32, wind_dir: 'ЮЗ', wind_vel: 2, pressure: 765, humidity: 50},
      { description: 'солнечно', temperature: 31, wind_dir: 'ЮЗ', wind_vel: 2, pressure: 765, humidity: 50},
      { description: 'солнечно', temperature: 25, wind_dir: 'ЮЗ', wind_vel: 2, pressure: 765, humidity: 50},
      { description: 'солнечно', temperature: 25, wind_dir: 'ЮЗ', wind_vel: 2, pressure: 765, humidity: 50}
    ]
  },
  {
    city: 'Санкт-Петербург',
    weather: [
      { description: 'облачно', temperature: 24, wind_dir: 'Ю', wind_vel: 1, pressure: 760, humidity: 80},
      { description: 'облачно', temperature: 24, wind_dir: 'Ю', wind_vel: 1, pressure: 760, humidity: 80},
      { description: 'облачно', temperature: 24, wind_dir: 'Ю', wind_vel: 1, pressure: 760, humidity: 80},
      { description: 'облачно', temperature: 24, wind_dir: 'Ю', wind_vel: 1, pressure: 760, humidity: 80},
    ]
  },
  {
    city: 'Казань',
    weather: [
      { description: 'переменная облачность', temperature: 23, wind_dir: 'СЗ', wind_vel: 2.5, pressure: 755, humidity: 70},
      { description: 'переменная облачность', temperature: 23, wind_dir: 'СЗ', wind_vel: 2.5, pressure: 755, humidity: 70},
      { description: 'переменная облачность', temperature: 23, wind_dir: 'СЗ', wind_vel: 2.5, pressure: 755, humidity: 70},
      { description: 'переменная облачность', temperature: 23, wind_dir: 'СЗ', wind_vel: 2.5, pressure: 755, humidity: 70}
    ]
  },
  {
    city: 'Волгоград',
    weather: [
      { description: 'солнечно', temperature: 22, wind_dir: 'СВ', wind_vel: 2.1, pressure: 750, humidity: 60},
      { description: 'солнечно', temperature: 22, wind_dir: 'СВ', wind_vel: 2.1, pressure: 750, humidity: 60},
      { description: 'солнечно', temperature: 22, wind_dir: 'СВ', wind_vel: 2.1, pressure: 750, humidity: 60},
      { description: 'солнечно', temperature: 22, wind_dir: 'СВ', wind_vel: 2.1, pressure: 750, humidity: 60}
    ]
  },
  {
    city: 'Хабаровск',
    weather: [
      { description: 'облачно, незначительные осадки', temperature: 21, wind_dir: 'С', wind_vel: 1.1, pressure: 770, humidity: 80},
      { description: 'облачно, незначительные осадки', temperature: 21, wind_dir: 'С', wind_vel: 1.1, pressure: 770, humidity: 80},
      { description: 'облачно, незначительные осадки', temperature: 21, wind_dir: 'С', wind_vel: 1.1, pressure: 770, humidity: 80},
      { description: 'облачно, незначительные осадки', temperature: 21, wind_dir: 'С', wind_vel: 1.1, pressure: 770, humidity: 80}
    ]
  }
];

function App() {
  return (
    <AppWeather data={weather_on_cities} />
  );
}

export default App;

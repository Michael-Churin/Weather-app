import React from 'react';
import Moment from 'moment';
import Controls from './components/Controls/Controls';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import WeatherContainer from './components/WeatherContainer/WeatherContainer';
import {City} from './common/types/City';
import './App.css';
import 'moment/locale/ru';
Moment.locale('ru');

type Props = {
  cities: ReadonlyArray<City>;
}

const initialState = {
  cityId: 1,
  scaleType: "Celsius"
}
type State = Readonly<typeof initialState>

class App extends React.Component<Props, State> {
  public readonly state: State = initialState

  private get CityCoord() {
    const city = this.props.cities.find(city => city.id === this.state.cityId);
    if (!city)
      throw Error('Город не найден.');
    return city.coord;
  }

  public handleCityChange = (cityId: number) => {
    this.setState({cityId: cityId});
  }

  public handleScaleTypeChange = (scaleType: string) => {
    this.setState({scaleType: scaleType});
  }

  public render() {
    return (
      <div className="app">
        <header>
          <h1>Прогноз погоды</h1>
        </header>
        <main>
          <ErrorBoundary> 
            <Controls cities={this.props.cities} 
              cityId={this.state.cityId} scaleType={this.state.scaleType} 
              onCityChange={this.handleCityChange} onScaleTypeChange={this.handleScaleTypeChange} />
            <WeatherContainer coord={this.CityCoord} scaleType={this.state.scaleType} />
          </ErrorBoundary>
        </main>
        <footer>
          <p>Developed by React</p>
        </footer>
      </div>
    );
  }
}

export default App;

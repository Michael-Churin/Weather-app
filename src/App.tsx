import React from 'react';
import Moment from 'moment';
import './App.css';
import Controls from './components/Controls/Controls';
import WeatherContainer from './components/WeatherContainer/WeatherContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import 'moment/locale/ru';
Moment.locale('ru');

const initialState = {
  cityId: 1,
  scaleType: "Celsius"
}
type State = Readonly<typeof initialState>

class App extends React.Component<{}, State> {
  public readonly state: State = initialState

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
            <Controls cityId={this.state.cityId} scaleType={this.state.scaleType} 
              onCityChange={this.handleCityChange} onScaleTypeChange={this.handleScaleTypeChange} />

            <ErrorBoundary>  
              <WeatherContainer cityId={this.state.cityId} scaleType={this.state.scaleType} />
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

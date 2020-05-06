import React from 'react';
import Moment from 'moment';
import CurrentWeather from './../CurrentWeather/CurrentWeather';
import CurrentData from './../../common/types/CurrentData';
import WeekForecast from './../WeekForecast/WeekForecast';
import DayData from './../../common/types/DayData';
import {Coord} from './../../common/types/City';
import './WeatherContainer.css';

type Props = {
    coord: Coord;
    scaleType: string;
}

type State = Readonly<{
    prevCoord?: Coord;
    currentWeather?: CurrentData;
    daysWeather?: ReadonlyArray<DayData>;
}>

class WeatherContainer extends React.Component<Props, State> {
    public readonly state: State = {}

    public componentDidMount() {
        this.fetchData();
    }

    public static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
        const nextLon = nextProps.coord.lon;
        const nextLat = nextProps.coord.lat;
        const prevLon = prevState.prevCoord?.lon;
        const prevLat = prevState.prevCoord?.lat;

        if (nextLon !== prevLon || nextLat !== prevLat) {
            return {
                prevCoord: { 
                    lon: nextLon,
                    lat: nextLat
                },
                currentWeather: undefined,
                daysWeather: undefined        
            };
        }
        return {};
    }

    public componentDidUpdate(prevProps: Props, prevState: State) {
        if (!this.state.currentWeather || !this.state.daysWeather)
            this.fetchData();
    }

    private fetchData() {
        const lon = this.props.coord.lon;
        const lat = this.props.coord.lat;
        const appId = process.env.REACT_APP_OWM_API_KEY;
        const owmUrl = `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&units=metric&appid=${appId}&lang=ru`;

        fetch(owmUrl)
            .then(response => response.json())
            .then(json => 
                this.setState({
                    currentWeather: this.formatCurrentData(json.current),
                    daysWeather: this.formatDaysData(json.daily)
                })
            );
    }

    private formatCurrentData(current: any): CurrentData  {
        return { 
            temp: current.temp,
            icon: current.weather[0].icon,
            description: current.weather[0].description,
            pressure: Math.round(current.pressure * 0.750062),
            humidity: Math.round(current.humidity),
            wind: Math.round(current.wind_speed * 10) / 10
        }
    }

    private formatDaysData(daily: any): DayData[] {
        return daily.map((day: any) => {
            return {
                tempDay: day.temp.day,
                tempNight: day.temp.night,
                icon: day.weather[0].icon,
                description: day.weather[0].description,
                date: Moment(day.dt * 1000).toDate()
            } as DayData
        });
    }

    public render() {
        return (
            <div className="alignContainer">
                <div className="weatherContainer">
                    {!this.state.currentWeather || !this.state.daysWeather ? 
                        <img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="Загрузка..." /> :
                        <>
                            <CurrentWeather data={this.state.currentWeather} scaleType={this.props.scaleType} />
                            <WeekForecast data={this.state.daysWeather} scaleType={this.props.scaleType} />
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default WeatherContainer;
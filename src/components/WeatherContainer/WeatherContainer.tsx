import React from 'react';
import Moment from 'moment';
import CurrentWeather from './../CurrentWeather/CurrentWeather';
import CurrentData from './../../common/types/CurrentData';
import WeekForecast from './../WeekForecast/WeekForecast';
import DayData from './../../common/types/DayData';
import cities from './../../common/data/cities.json';
import './WeatherContainer.css';

type Props = {
    cityId: number;
    scaleType: string;
}

type State = Readonly<{
    prevCityId?: number;
    currentWeather?: CurrentData;
    daysWeather?: ReadonlyArray<DayData>;
}>

class WeatherContainer extends React.Component<Props, State> {
    public readonly state: State = {}

    public componentDidMount = async () => {
        await this.fetchData();
    }

    public static getDerivedStateFromProps = (nextProps: Props, prevState: State): State => {
        if (nextProps.cityId !== prevState.prevCityId) {
            return {
                prevCityId: nextProps.cityId,
                currentWeather: undefined,
                daysWeather: undefined        
            };
        }
        return {};
    }

    public componentDidUpdate = async (prevProps: Props, prevState: State) => {
        if (!this.state.currentWeather || !this.state.daysWeather)
            await this.fetchData();
    }

    private async fetchData() {
        const city = cities.find(city => city.id === (this.props.cityId));
        if (!city)
            throw new Error("Город не найден.");

        const appId = process.env.REACT_APP_OWM_API_KEY;
        const owmUrl = `https://api.openweathermap.org/data/2.5/onecall?lon=${city.coord.lon}&lat=${city.coord.lat}&units=metric&appid=${appId}&lang=ru`;

        let response = await fetch(owmUrl);
        let json = await response.json();

        this.setState({
            currentWeather: this.formatCurrentData(json.current),
            daysWeather: this.formatDaysData(json.daily)
        });
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
import React from 'react';
import DayWeather from './../DayWeather/DayWeather';
import DayData from './../../common/types/DayData';
import './WeekForecast.css';

type Props = {
    data: ReadonlyArray<DayData>;
    scaleType: string;
}

class WeekForecast extends React.Component<Props, {}> {
    public render() {
        return (
            <div className="weekForecast">
                {this.props.data.map(day => 
                    <DayWeather data={day} scaleType={this.props.scaleType} key={day.date.toDateString()} />)}
            </div>
        );
    }
}

export default WeekForecast;
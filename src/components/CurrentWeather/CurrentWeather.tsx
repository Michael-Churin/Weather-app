import React from 'react';
import Moment from 'moment';
import CurrentData from './../../common/types/CurrentData';
import Utils from './../../common/Utils';
import './CurrentWeather.css';

type Props = {
    data: CurrentData;
    scaleType: string;
}

class CurrentWeather extends React.Component<Props> {
    public render() {
        const current = Moment();
        const iconUrl = `http://openweathermap.org/img/wn/${this.props.data.icon}@2x.png`;
        const temp = Utils.formatTemp(this.props.data.temp, this.props.scaleType);
        const description = Utils.toProper(this.props.data.description);

        return (
            <div className="currentWeather">
                <h3>Сейчас</h3>
                <div><time dateTime={current.toISOString()}>{current.format('HH:mm')}</time></div>
                
                <div className="table main">
                    <div className="td"><img src={iconUrl} alt={description} /></div>
                    <div className="td temp">{temp}&deg;</div>
                </div>

                <div className="table details">
                    <div className="tr">
                        <div className="td">Давление</div>
                        <div className="td pressure">{this.props.data.pressure} мм</div>
                    </div>
                    <div className="tr">
                        <div className="td">Влажность</div>
                        <div className="td humidity">{this.props.data.humidity} %</div>
                    </div>
                    <div className="tr">
                        <div className="td">Ветер</div>
                        <div className="td wind">{this.props.data.wind} м/с</div>
                    </div>
                </div>
                
                <div className="description">{description}</div>
            </div>
        );
    }
}

export default CurrentWeather;
import React from 'react';
import Moment from 'moment';
import DayData from './../../common/types/DayData';
import Utils from './../../common/Utils';
import './DayWeather.css';

type Props = {
    data: DayData;
    scaleType: string;
}

class DayWeather extends React.Component<Props, {}> {
    public render() {
        const current = Moment();
        const date = Moment(this.props.data.date);
        const isCurrentDay =  date.isSame(current, 'day');

        const weekDay = isCurrentDay ? 'Сегодня' : Utils.toProper(date.format('dd'));
        const dayKind = date.weekday() > 4 ? "dayOff" : "workDay";
        const iconUrl = `http://openweathermap.org/img/wn/${this.props.data.icon}@2x.png`;
        const tempDay = (isCurrentDay ? "днем " : "") + Utils.formatTemp(this.props.data.tempDay, this.props.scaleType);
        const tempNight = (isCurrentDay ? "ночью " : "") + Utils.formatTemp(this.props.data.tempNight, this.props.scaleType);
        const description = Utils.toProper(this.props.data.description);

        return (
            <div className="dayWeather">
                <h3 className={dayKind}>{weekDay}</h3>
                <div><time dateTime={date.toISOString()}>{Utils.formatShortDate(date)}</time></div>
            
                <div className="icon"><img src={iconUrl} alt={description} /></div>

                <div>
                    <div className="tempDay">{tempDay}&deg;</div>
                    <div className="tempNight">{tempNight}&deg;</div>
                </div>
           
                <div className="description">{description}</div>
            </div>
        );
    }
}

export default DayWeather;
import React from 'react';
import cities from '../../common/data/cities.json';
import './Controls.css';

type Props = {
    cityId: number;
    scaleType: string;
    onCityChange: (cityId: number) => void;
    onScaleTypeChange: (scaleType: string) => void;
}

class Controls extends React.Component<Props, {}> {
    public handleCityChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.props.onCityChange(parseInt(event.currentTarget.value));
    }

    public handleScaleTypeChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.onScaleTypeChange(event.currentTarget.value);
    }

    public render() {
        const sortedCities = cities.sort((city1, city2) => {
            const name1 = city1.name.toLowerCase();
            const name2 = city2.name.toLowerCase();
            return name1 !== name2 ? (name1 > name2 ? 1 : -1) : 0;
        });

        const options = sortedCities.map(city => 
            <option key={city.id} value={city.id}>{city.name}</option>
        );

        return (
            <form className="controls">
                <div className="form-group">
                    <label>
                        <span className="title">Город</span>
                        <select className="form-control" value={this.props.cityId} onChange={this.handleCityChange}>
                            {options}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <span className="title">Шкала</span>
                    <div className="form-check form-check-inline">                
                        <label className="form-check-label">
                            <input className="form-check-input" name="scaleType" type="radio" value="Celsius" 
                                checked={this.props.scaleType === 'Celsius'} onChange={this.handleScaleTypeChange} />
                            Цельсия
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label">         
                            <input className="form-check-input" name="scaleType" type="radio" value="Farenheit" 
                                checked={this.props.scaleType === 'Farenheit'} onChange={this.handleScaleTypeChange} />
                            Фаренгейта
                        </label>
                    </div>
                </div>
            </form>
        );
    }
}

export default Controls;
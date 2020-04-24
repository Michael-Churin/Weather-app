import Moment from 'moment';

class Utils {
    public static convertTemp(value: number, scaleType: string): number {
        return Math.round(scaleType === 'Celsius' ? value : value / 5 * 9 + 32);
    }

    public static formatTemp(value: number, scaleType: string): string {
        const temp = this.convertTemp(value, scaleType);
        return `${temp > 0 ? '+': ''}${temp}`;
    }

    public static toProper(value: string): string {
        return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
    }

    public static formatShortDate(value: Moment.Moment): string {
        const short = value.format('D MMM');
        return short.substring(0, short.length -1);
    }
}

export default Utils;
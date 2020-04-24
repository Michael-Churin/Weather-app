type CurrentData = Readonly<{
    temp: number;
    icon: string;
    description: string;
    pressure: number;
    humidity: number;
    wind: number;
}>

export default CurrentData;
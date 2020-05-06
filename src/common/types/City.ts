export type Coord = Readonly<{
    lon: number;
    lat: number;
}>

export type City = Readonly<{
    id: number;
    name: string;
    coord: Coord
}>
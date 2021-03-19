import { CarImage } from "./carImage";


export interface Car {
    id: number;
    modelYear: number;
    dailyPrice: number;
    description: string;
    brand: string;
    carName: string;
    color: string;
    imagePath: CarImage[];
}
import { CarImage } from "./carImage";


export interface Car {
    id: number;
    modelYear: number;
    dailyPrice: number;
    description: string;
    brand: string;
    color: string;
    imagePath: CarImage[];
}
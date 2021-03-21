import { CarImage } from "./carImage";


export interface Car {
    id: number;
    modelYear: number;
    dailyPrice: number;
    description: string;
    brandId: number;
    brand: string;
    carName: string;
    color: string;
    imagePath: CarImage[];
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  images: CarImage[];

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.getDetail(params['id']);
      }
    })
  }

  getDetail(id: number){
    this.carService.getCar(id).subscribe(response=>{
      this.car = response.data;
      this.images = response.data.imagePath;
    })
  }

  setClassName(index:number){
    if(index == 0){
      return "carousel-item active";
    }
    else {
      return "carousel-item";
    }
  }


}

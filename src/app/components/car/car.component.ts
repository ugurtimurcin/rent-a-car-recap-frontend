import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[];
  filterText: string = '';
  selectedBrand: string = '';
  selectedColor: string = '';

  constructor(private carService: CarService, private brandService: BrandService, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.getByBrand(params['id'])
      }else{
        this.getCars();
      }
    })
    
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
    })
  }

  getByBrand(id: number){
    this.carService.getByBrands(id).subscribe(response=>{
      this.cars = response.data
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

  setBrand(){
    this.filterText = this.selectedBrand.toLocaleLowerCase();
  }
  setColor(){
    this.filterText = this.selectedColor.toLocaleLowerCase();
  }

}

import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  rental: Rental;
  car: Car;
  rentDay: number;
  totalPrice: number

  constructor(private activatedRoute: ActivatedRoute, private rentalService: RentalService, private carService: CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['rental']){
        this.rental = JSON.parse(params['rental']);
        this.getCarDetail();
      }
            
    })
    
  }

  getCarDetail(){
    this.carService.getCar(this.rental.carId).subscribe(response=>{
      this.car = response.data;
      this.totalPriceCalculator();
    })
  }

  totalPriceCalculator(){
    let rentDate = new Date(this.rental.rentDate)
    let returnDate = new Date(this.rental.returnDate)
    this.rentDay = returnDate.getDate() - rentDate.getDate();
    this.totalPrice = this.car.dailyPrice * this.rentDay
  }

  setRentAl(rental: Rental){
    console.log(rental);
  }

  


}

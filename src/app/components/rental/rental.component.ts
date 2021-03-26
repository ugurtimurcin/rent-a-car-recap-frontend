import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';


import { Customer } from 'src/app/models/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  car: Car;
  customers: Customer[];
  addRentalForm: FormGroup;
  
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder, private rentalService: RentalService, private customerService: CustomerService, private carService: CarService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.getCarDetail(params['id']);
      }
    })

    this.getCustomers();
    this.createAddRentalForm();
  }


    createAddRentalForm(){
    this.addRentalForm = this.formBuilder.group({
      carId: [''], 
      customerId :['', Validators.required], 
      rentDate :['', Validators.required], 
      returnDate :[''] 
    });
  }

  getCarDetail(id: number){
    this.carService.getCar(id).subscribe(response=>{
      this.car = response.data;
      
    })
  }

  getCustomers(){
    this.customerService.getAll().subscribe(response=>{
      this.customers = response.data;
    })
  }

  addRental(){
    this.addRentalForm.patchValue({
      carId : this.car.id
    });
    if(this.addRentalForm.valid){
      let carModel = Object.assign({}, this.addRentalForm.value)
        this.toastrService.success('Rental added.')
        this.route.navigate(['/payment/', JSON.stringify(carModel)]);
    }else{
      this.toastrService.error('Check fields.');
      
    }
  }

}

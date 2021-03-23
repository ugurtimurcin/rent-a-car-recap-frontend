import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RentalService } from 'src/app/services/rental.service';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  images: CarImage[];
  customers: Customer[];
  addRentalForm: FormGroup;
  
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private toastrService: ToastrService, private formBuilder: FormBuilder, private rentalService: RentalService, private customerService: CustomerService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.getDetail(params['id']);
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

  getDetail(id: number){
    this.carService.getCar(id).subscribe(response=>{
      this.car = response.data;
      this.images = response.data.imagePath;
      
    })
  }

  getCustomers(){
    this.customerService.getAll().subscribe(response=>{
      this.customers = response.data;
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

  demoAlert(){
    this.toastrService.success('Alertify');
  }

  addRental(){
    this.addRentalForm.patchValue({
      carId : this.car.id
    });
    if(this.addRentalForm.valid){
      let carModel = Object.assign({}, this.addRentalForm.value)
      this.rentalService.add(carModel).subscribe(response=>{
        this.toastrService.success('Rental added.')
      }, errorResponse => {
        if(errorResponse.error){
          this.toastrService.error(errorResponse.error.message)
        }else if(errorResponse.error.Errors.length>0){
          for(let i = 0; i<errorResponse.error.Errors.length; i++)
          this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage);
        }
      });
    }
  }
}

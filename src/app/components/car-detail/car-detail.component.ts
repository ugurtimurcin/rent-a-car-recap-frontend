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
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery'

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  images: CarImage[];
  
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  
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
      this.setGallery();
      
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

  

  addImage(){
    const gallery = [];
    for(let i=0; i<this.images.length; i++){
      gallery.push({
        small: `http://localhost:4797/carimages/${this.images[i].imagePath}.jpg`,
        medium: `http://localhost:4797/carimages/${this.images[i].imagePath}.jpg`,
        big: `http://localhost:4797/carimages/${this.images[i].imagePath}.jpg`
      })
    }

    return gallery;
  }

  setGallery(){
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.addImage();
  }
}

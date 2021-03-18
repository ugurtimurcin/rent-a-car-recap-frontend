import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private brandService: BrandService) { }
  brands: Brand[] = [];
  currentBrand = '';
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  getCurrentBrand(brand: Brand){
    this.currentBrand = brand.name;
  }

  setActiveClass(brand: Brand){
    if(brand.name === this.currentBrand){
      return 'list-group-item active'
    }else{
      return 'list-group-item'
    }
  }

  removeCurrentBrand(){
    this.currentBrand = ''
  }

  getAllBrands(){
    if(!this.currentBrand){
      return 'list-group-item active'
    }else{
      return 'list-group-item'
    }
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BrandComponent,
    CarComponent,
    FilterPipePipe,
    CarDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

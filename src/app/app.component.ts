import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { RentaldetailComponent } from './components/rentaldetail/rentaldetail.component';
import { CarComponent } from './components/car/car.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarAddComponent } from './components/car-add/car-add.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarFilterComponent, RouterOutlet, RouterLink, BrandComponent, NaviComponent,
    ColorComponent, CustomerComponent, CardetailComponent, RentaldetailComponent, CarAddComponent,
    CarComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rentacar';
}

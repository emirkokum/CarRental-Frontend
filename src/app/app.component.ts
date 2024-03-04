import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { RentaldetailComponent } from './components/rentaldetail/rentaldetail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BrandComponent,NaviComponent,ColorComponent,CustomerComponent,CardetailComponent,RentaldetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rentacar';
}

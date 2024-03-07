import { Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', component: CarComponent },
    { path: "cars", component: CarComponent },
    { path: "cars/color", component: CarComponent },
    { path: "cars/color/:colorId", component: CarComponent },
    { path: "cars/brand", component: CarComponent },
    { path: "cars/brand/:brandId", component: CarComponent },
    { path: "cardetail/", component: CarComponent },
    { path: "cardetail/:carId", component: CardetailComponent },
    { path: "cardetail/:carId/payment", component: PaymentComponent },
    { path: "cars/brand/:brandId/color/:colorId", component: CarComponent },
];

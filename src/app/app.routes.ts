import { Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorComponent } from './components/color/color.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuard } from './guards/admin.guard';

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
    { path: "cars/add", component: CarAddComponent,canActivate:[adminGuard]  },
    { path: "brands", component: BrandComponent },
    { path: "brands/add", component: BrandAddComponent,canActivate:[adminGuard]  },
    { path: "colors", component: ColorComponent },
    { path: "colors/add", component: ColorAddComponent,canActivate:[adminGuard] },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "admin", component: AdminComponent }
];

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarDetailService } from '../../services/cardetail.service';
import { CarDetail } from '../../models/carDetail';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarImage } from '../../models/carImage';


@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  cars: Car[] = [];
  cardetails: CarDetail[] = [];

  carImages: CarImage[] = [];
  imageUrl = "https://localhost:44387/CarImages/"

  constructor(private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarDetailsByBrandId(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarDetailsByColorId(params["colorId"])
      }
      else{
        this.getCarDetails();
      }
    })
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe(response => {
      this.cardetails = response.data
    })
  }

  getCarDetailsByColorId(colorId: number) {
    this.carDetailService.getCarDetailsByColorId(colorId).subscribe(response => {
      this.cardetails = response.data
    })
  }

  getCarDetailsByBrandId(brandId: number) {
    this.carDetailService.getCarDetailsByBrandId(brandId).subscribe(response => {
      this.cardetails = response.data
    })
  }

  getCarImageByCarId(carId:number){
    this.carDetailService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImages = response.data
    })
  }

  getImagePath(carImages:CarImage){
    let imagePath = this.imageUrl + carImages.imagePath;
    return imagePath
  }

}

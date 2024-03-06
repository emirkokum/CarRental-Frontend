import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/cardetail.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from '../../models/carImage';

@Component({
  selector: 'app-cardetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardetail.component.html',
  styleUrl: './cardetail.component.css'
})
export class CardetailComponent implements OnInit {
  cardetails: CarDetail[] = [];
  carImages: CarImage[] = [];
  imageUrl = "https://localhost:44387/CarImages/"

  constructor(private carDetailService : CarDetailService,private activatedRoute:ActivatedRoute) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsById(params["carId"])
        this.getCarImageByCarId(params["carId"])
      }
      else{
        this.getCarDetails();
      }
    })
  }
  
  getCarDetails(){
    this.carDetailService.getCarDetails().subscribe(response => {
      this.cardetails = response.data
    })
  }

  getCarDetailsById(carId:number){
    this.carDetailService.getCarDetailsById(carId).subscribe(response => {
      this.cardetails = response.data
    })
  }

  getCarImageByCarId(carId:number){
    this.carDetailService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImages = response.data
      console.log(this.carImages);
    })
  }

  getImagePath(carImages:CarImage){
    let imagePath = this.imageUrl + carImages.imagePath;
    return imagePath
  }


}

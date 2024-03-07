import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/cardetail.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarImage } from '../../models/carImage';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cardetail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cardetail.component.html',
  styleUrl: './cardetail.component.css'
})
export class CardetailComponent implements OnInit {
  cardetails: CarDetail[] = [];
  carImages: CarImage[] = [];
  currentCarId: number;
  url = "https://localhost:4200/cardetail/"
  imageUrl = "https://localhost:44387/CarImages/"
  rental: Rental;
  rentDate: Date
  returnDate: Date
  carsRentDate: Date
  carsReturnDate: Date

  constructor(private router: Router, private rentalService: RentalService, private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetailsById(params["carId"])
        this.getCarImageByCarId(params["carId"])
        this.getRentalDates(params["carId"])
      }
      else {
        this.getCarDetails();
      }
    })
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe(response => {
      this.cardetails = response.data
    })
  }

  async getCarDetailsById(carId: number) {
    await this.carDetailService.getCarDetailsById(carId).subscribe(response => {
      this.cardetails = response.data
      this.currentCarId = carId
    })
  }

  getCarImageByCarId(carId: number) {
    this.carDetailService.getCarImagesByCarId(carId).subscribe(response => {
      this.carImages = response.data
    })
  }

  getImagePath(carDetail: CarDetail) {
    let imagePath = this.imageUrl + carDetail.imagePath;
    return imagePath
  }

  getRentalDates(carId: number) {
    this.rentalService.getRentalByCarId(carId).subscribe(response => {
      this.rental = response
      this.carsRentDate = this.rental.rentDate
      this.carsReturnDate = this.rental.returnDate
    })
  }

  checkRentalDates(): boolean {
    if (!this.carsRentDate) {
      if (this.returnDate < this.rentDate) {
        console.log("Dönüş Tarihi Kiralama Tarihinden Önce Olamaz");
        return false
      } else if (!this.rentDate && !this.returnDate) {
        return false
      } else if (this.rentDate && this.returnDate) {
        this.router.navigate(['/cardetail/' + this.currentCarId + '/payment']);
        return true
      }
      else {
        console.log("Aracı kiralayamazsın");
        return false
      }
    } else {
      if (this.rentDate > this.carsRentDate && this.returnDate > this.carsReturnDate) {
        console.log("Aracı Kiralayabilirsin");
        this.router.navigate(['/cardetail/' + this.currentCarId + '/payment']);
        return true
      } else {
        console.log("Aracı kiralayamazsın");
        return false
      }
    }

  }


}

import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/cardetail.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarImage } from '../../models/carImage';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr:ToastrService,private router: Router, private rentalService: RentalService, private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute) { }

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
    if (!this.rentDate || !this.returnDate || this.returnDate < this.rentDate) {
      this.toastr.error("Geçersiz kiralama tarihleri. Lütfen doğru tarihleri girin.")
      this.router.navigate(['/cardetail/' + this.currentCarId]);
      return false;
    }
    if (this.carsRentDate && this.carsReturnDate) {
      if (!(this.returnDate < this.carsRentDate || this.rentDate > this.carsReturnDate)) {
        this.toastr.error("Seçilen tarih aralığı zaten başka bir kullanıcı tarafından kiralanmış.")
        this.router.navigate(['/cardetail/' + this.currentCarId]);
        return false;
      }
    }
    this.router.navigate(['/cardetail/' + this.currentCarId + '/payment']);
    this.toastr.success("Seçtiğiniz tarihler uygun")
    return true;
  }



}

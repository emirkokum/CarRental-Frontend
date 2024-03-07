import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { CarDetailService } from '../../services/cardetail.service';
import { CarDetail } from '../../models/carDetail';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarImage } from '../../models/carImage';
import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { CarFilterComponent } from '../car-filter/car-filter.component';


@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FilterPipePipe, CarFilterComponent],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  cars: Car[] = [];
  cardetails: CarDetail[] = [];
  carImages: CarImage[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  filterText = ""

  imageUrl = "https://localhost:44387/CarImages/"

  constructor(private colorSerice: ColorService, private brandService: BrandService, private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const brandId = params["brandId"];
      const colorId = params["colorId"];

      if (brandId && colorId) {
        this.getCarDetailsByBrandAndColorId(brandId, colorId);
        console.log(brandId,colorId);
      } else if (brandId) {
        this.getCarDetailsByBrandId(brandId);
      } else if (colorId) {
        this.getCarDetailsByColorId(colorId);
      } else {
        this.getCarDetails();
      }
    });
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

  getCarDetailsByBrandAndColorId(brandId: number, colorId: number) {
    this.carDetailService.getCarDetailsByBrandAndColorID(brandId, colorId).subscribe(response => {
      this.cardetails = response.data
      console.log(this.cardetails);      
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

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }


}

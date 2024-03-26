import { Component, OnInit, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from '../../services/car-image.service';
import { CarImage } from '../../models/carImage';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
import { Brand } from '../../models/brand';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent implements OnInit {
  colors: Color[] = []
  brands: Brand[] = []
  carAddForm: FormGroup;
  carId: number
  carImage: CarImage
  carImageFile: File

  constructor(private colorService: ColorService, private brandService: BrandService, private formBuilder: FormBuilder, private carService: CarService, private toastr: ToastrService, private carImageService: CarImageService, private router: Router) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      carName: ["", Validators.required],
      colorId: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      modelYear: ["", Validators.required],
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value) // Formdaki alanların karsiligini alir
      this.carService.add(carModel).subscribe(response => {
        this.toastr.success(response.message, "Success")
      }, responseError => {
        if (responseError.error?.Errors?.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
          }
        }
      })
    } else {
      this.toastr.error("Your inputs are not valid", "Not Valid")
    }
  }

  onChange(event: any) {
    this.carImageFile = event.target?.files[0]
  }

  async addwithCarImage() {

    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value)
      await this.carService.addwithCarImage(carModel, (response) => {
        let data = {
          file: this.carImageFile,
          carId: response.data
        }
        this.carImageService.add(data).subscribe(x => {
          this.toastr.success(response.message, "Success")
          this.router.navigate([""])
          this.createCarAddForm()
          this.getBrands()
          this.getColors()
        })
      }).catch(responseError => {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
        }
      })

    } else {
      this.toastr.error("Your inputs are not vaild", "Not valid")
    }
  }

}

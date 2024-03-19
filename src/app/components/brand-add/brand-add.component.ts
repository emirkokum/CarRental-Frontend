import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-brand-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.css'
})
export class BrandAddComponent implements OnInit {

  cars: Car[] = []
  brands: Brand[] = []
  brandAddForm: FormGroup;
  constructor(private carService:CarService,private toastr: ToastrService, private formBuilder: FormBuilder, private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands()
    this.createBrandAddForm()
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    })
  }

  deleteBrand(brand: Brand) {
    this.brandService.delete(brand).subscribe(reponse => {
      this.toastr.success(reponse.message, "Deleted")
    })
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ["", Validators.required],
    })
  }

  async add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      await this.brandService.add(brandModel, (response) => {
        this.toastr.success(response.message, "Success")
        this.createBrandAddForm()
        this.getBrands()
      }).catch(responseError => {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
        }
      })
    } else {
      this.toastr.error("Your inputs are not valid", "Not Valid")
    }
  }


}

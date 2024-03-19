import { Component } from '@angular/core';
import { Color } from '../../models/color';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../services/color.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './color-add.component.html',
  styleUrl: './color-add.component.css'
})
export class ColorAddComponent {

  colors: Color[] = []
  colorAddForm: FormGroup;
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private colorService: ColorService) { }

  ngOnInit(): void {
    this.getColors()
    this.createColorAddForm()
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  deleteColor(color: Color) {
    this.colorService.delete(color).subscribe(reponse => {
      this.toastr.success(reponse.message, "Deleted")
    })
  }
  
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", Validators.required],
    })
  }

  add() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response => {
        this.toastr.success(response.message, "Success")
      }, responseError => {
        if (responseError.error?.Errors?.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Validation Error")
          }
        }
      })
    } else {
      this.toastr.error("Your inputs are not valid","Not Valid")
    }
  }
}

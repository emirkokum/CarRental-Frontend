import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/cardetail.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardetail.component.html',
  styleUrl: './cardetail.component.css'
})
export class CardetailComponent implements OnInit {
  cardetails: CarDetail[] = [];

  constructor(private carDetailservice : CarDetailService) {  }

  ngOnInit():void{
    this.getCarDetails();
  }
  
  getCarDetails(){
    this.carDetailservice.getCarDetails().subscribe(response => {
      this.cardetails = response.data
    })
  }

}

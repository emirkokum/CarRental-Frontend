import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/cardetail.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {


  cardetails:CarDetail[] = [];

  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      
      if (params["carId"]) {
        this.getCarDetailsById(params["carId"])
        console.log(this.cardetails);
      }
    })
  }
  
  getCarDetailsById(carId: number) {
    this.carDetailService.getCarDetailsById(carId).subscribe(response => {
      this.cardetails = response.data
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { RentalDetail } from '../../models/rentalDetail';
import { RentalDetailService } from '../../services/rentaldetail.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rentaldetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rentaldetail.component.html',
  styleUrl: './rentaldetail.component.css'
})
export class RentaldetailComponent implements OnInit {
  rentaldetails:RentalDetail[] = [];

  constructor(private rentalDetailService:RentalDetailService) {}

  ngOnInit(): void {
    this.getRentalDetails()
  }

  getRentalDetails(){
    this.rentalDetailService.getRentalDetails().subscribe(response => {
      this.rentaldetails = response.data
    })
  }

}

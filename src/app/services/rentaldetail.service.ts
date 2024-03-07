import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { RentalDetail } from '../models/rentalDetail';


@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {
  apiUrl = 'https://localhost:44387/api/Rentals/getrentaldetails';

  constructor(private httpClient: HttpClient) { }

  getRentalDetails():Observable<DataResponseModel<RentalDetail>>{
    return this.httpClient.get<DataResponseModel<RentalDetail>>(this.apiUrl);
  }
  
}

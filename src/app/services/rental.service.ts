import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44387/api/Rentals/';

  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<DataResponseModel<Rental>>{
    return this.httpClient.get<DataResponseModel<Rental>>(this.apiUrl);
  }

  getRentalByCarId(carId:number){
    let newPath = this.apiUrl + "getbycarid?carId=" + carId
    return this.httpClient.get<Rental>(newPath);
  }
  
}

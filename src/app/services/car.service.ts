import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44387/api/Cars/getall';

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<DataResponseModel<Car>>{
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl);
  }
}

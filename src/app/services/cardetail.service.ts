import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = 'https://localhost:44387/api/Cars/getcardetails';

  constructor(private httpClient: HttpClient) { }

  getCarDetails():Observable<DataResponseModel<CarDetail>>{
    return this.httpClient.get<DataResponseModel<CarDetail>>(this.apiUrl);
  }
}

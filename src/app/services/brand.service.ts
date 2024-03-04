import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:44387/api/Brands/getall';

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<DataResponseModel<Brand>>{
    return this.httpClient.get<DataResponseModel<Brand>>(this.apiUrl);
  }
}

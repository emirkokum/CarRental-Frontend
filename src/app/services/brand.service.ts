import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, firstValueFrom } from 'rxjs';
import { Brand } from '../models/brand';
import { DataResponseModel } from '../models/dataResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:44387/api/Brands';

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<DataResponseModel<Brand>>{
    let newPath = this.apiUrl + "/getall"
    return this.httpClient.get<DataResponseModel<Brand>>(newPath);
  }

  //Observable<ResponseModel>
  add(brand:Brand,successCallBack?:(response)=>void):Promise<any>{
    const data = this.httpClient.post<ResponseModel>(this.apiUrl + "/add",brand)
    const promise = firstValueFrom(data)
    promise.then((response)=>{
      successCallBack && successCallBack(response)
    })
    return promise
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }
}

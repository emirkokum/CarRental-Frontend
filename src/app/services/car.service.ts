import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { CarImageService } from './car-image.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44387/api/Cars/';

  constructor(private httpClient: HttpClient,private carImageService:CarImageService) { }

  getCars():Observable<DataResponseModel<Car>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<DataResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath,car);
  }


  async addwithCarImage(car:Car,successCallBack?:(response:any)=>void):Promise<any>{
    let newPath = this.apiUrl + "addreturnsid"
    const x =  this.httpClient.post<DataResponseModel<number>>(newPath,car)
    const data = firstValueFrom(x)
    data.then((response)=>{
      successCallBack && successCallBack(response)
    })
    
    return (await data).data
  }
}

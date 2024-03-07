import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { CarDetail } from '../models/carDetail';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = 'https://localhost:44387/api/';

  constructor(private httpClient: HttpClient) { }

  getCarDetails():Observable<DataResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "Cars/getcardetails"
    console.log(newPath);
    return this.httpClient.get<DataResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsById(carId:number){
    let newPath = this.apiUrl + "Cars/getcardetailsbyid?carId=" + carId
    return this.httpClient.get<DataResponseModel<CarDetail>>(newPath)
  }

  getCarDetailsByColorId(colorId:number){
    let newPath = this.apiUrl + "Cars/getcardetailsbycolorid?colorId=" + colorId
    //console.log(newPath);
    return this.httpClient.get<DataResponseModel<CarDetail>>(newPath)
  }

  getCarDetailsByBrandId(brandId:number){
    let newPath = this.apiUrl + "Cars/getcardetailsbybrandid?brandId=" + brandId
    //console.log(newPath);
    return this.httpClient.get<DataResponseModel<CarDetail>>(newPath)
  }

  getCarDetailsByBrandAndColorID(brandId:number,colorId:number){
    let newPath = this.apiUrl + "Cars/getcardetailsbybrandandcolorid?brandId="+ brandId +"&carId=" + colorId
    console.log(newPath);
    return this.httpClient.get<DataResponseModel<CarDetail>>(newPath)
    
  }

  getCarImagesByCarId(carId:number){
    let newPath = this.apiUrl + "CarImages/getbycarid?Id=" + carId
    return this.httpClient.get<DataResponseModel<CarImage>>(newPath)
  }
}

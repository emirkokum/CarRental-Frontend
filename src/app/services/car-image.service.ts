import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class CarImageService {
  private apiUrl = 'https://localhost:44387/api/CarImages/';

  constructor(private httpClient: HttpClient) { }

  add(carImage: CarImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "add"
    const formData = new FormData();
    formData.append("carId", carImage.carId);
    formData.append("file", carImage.file);
    return this.httpClient.post<ResponseModel>(newPath, formData)
  }


}

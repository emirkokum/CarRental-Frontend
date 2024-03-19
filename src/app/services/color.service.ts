import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'https://localhost:44387/api/Colors';

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<DataResponseModel<Color>> {
    let newPath = this.apiUrl + "/getall"
    return this.httpClient.get<DataResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add",color)
  }

  delete(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }
}

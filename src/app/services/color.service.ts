import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'https://localhost:44387/api/Colors/getall';

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<DataResponseModel<Color>> {
    return this.httpClient.get<DataResponseModel<Color>>(this.apiUrl);
  }
}

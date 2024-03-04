import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:44387/api/Customers/getall';

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<DataResponseModel<Customer>> {
    return this.httpClient.get<DataResponseModel<Customer>>(this.apiUrl);
  }
}

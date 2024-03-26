import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DataResponseModel } from '../models/dataResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  user:User
  apiUrl = 'https://localhost:44387/api/Users/'

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }
  
  getUserNameByMail(email:string){
    return this.httpClient.get<DataResponseModel<string>>(this.apiUrl + "getusernamebymail?email=" + email)
  }

}

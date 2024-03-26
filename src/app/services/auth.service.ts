import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LoginModel } from '../models/loginModel';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44387/api/Auth/'

  constructor(private httpClient: HttpClient) { }

  register(registerModel: RegisterModel) {
    let newPath = this.apiUrl + "register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel)
  }

  login(loginModel: LoginModel) {
    let newPath = this.apiUrl + "login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel)
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  getUserEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userEmail: string = decodedToken.email;
      console.log(userEmail);
      return userEmail;
    } else {
      return null;
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/single-response-model';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4797/api/auth/'
  
  private currentUserName: string;
  private currentUserId: number;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private toastrService: ToastrService) { }

  login(loginModel: LoginModel){
    this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'login', loginModel).subscribe(response=>{
      if(response.success){
        this.localStorageService.setToken(response.data.token);        
        this.setCurrentUserId();
        this.setCurrentUserName();
        this.toastrService.success('Logged');
      }
    })
  }

  getCurrentUserId(){
    return this.currentUserId;
  }

  getCurrentUserName(){
    return this.currentUserName;
  }


  setCurrentUserName(){
    let decoded = this.getDecodedToken();
    var userName = Object.keys(decoded).filter(x => x.endsWith("/name"))[0];
    this.currentUserName = decoded[userName];
  }

  setCurrentUserId(){
    let decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
    this.currentUserId = Number(decoded[propUserId]);
  }

  getDecodedToken(){
    return this.jwtHelper.decodeToken(this.localStorageService.getToken()?.toString())
  }

  isAuthenticated(){
    if (localStorage.getItem('token')) {
      return true;
    }else{
      return false;
    }
  }
}

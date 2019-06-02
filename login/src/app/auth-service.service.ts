import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService) { 

      this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
      this.carregarToken();
    }

    login(usuario: string, senha: string): Promise<void>{
      
    }
}

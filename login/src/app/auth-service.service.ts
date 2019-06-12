import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

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
      const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

      const body = `username=${usuario}&password=${senha}&grant_type=password`;

      return this.http.post<any>(this.oauthTokenUrl, body, {headers, withCredentials: true})
        .toPromise()
        .then(response => {
          this.armazenarToken(response.access_token);
        })
        .catch(response => {
          if(response.status === 400) {
            if(response.error === 'invalid_grant') {
              return Promise.reject('Usuário ou senha Inválido');
            }
          }
          return Promise.reject(response);
        });

    }

    obterNovoAccessToken(): Promise<void> {
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
      const body = 'grant_type=refresh_token';

      return this.http.post<any>(this.oauthTokenUrl, body, {headers, withCredentials: true})
        .toPromise()
        .then(response => {
          this.armazenarToken(response.access_token);

          return Promise.resolve(null);
        })
        .catch(response => {
          return Promise.resolve(null);
        });
    }

    limparAccessToken() {
      localStorage.removeItem('token');
      this.jwtPayload = null;
    }

    isAccessTokenInvalid() {
      const token = localStorage.getItem('token');

      return !token || this.jwtHelper.isTokenExpired(token);
    }

    private armazenarToken(token: string) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
      localStorage.setItem('token', token);
    }

    private carregarToken() {
      const token = localStorage.getItem('token');
      if(token) {
        this.armazenarToken(token);
      }
    }
}

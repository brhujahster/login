import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { Observable, from as observableFromPromise } from 'rxjs';


export class NotAuthenticatedError {}

@Injectable({
  providedIn: 'root'
})
export class LoginHttpSecurityService extends HttpClient{

  constructor(
    private auth: AuthServiceService, 
    private httpHandler:HttpHandler) {
      super(httpHandler);
     }


  public delete<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
  }

  public patch<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
  }

  public head<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.head<T>(url, options));
  }

  public options<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.options<T>(url, options));
  }

  public get<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.get<T>(url, options));
  }

  public post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
  }

  public put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
  }

  private fazerRequisicao<T>(fn: Function): Observable<T> {
    if(this.auth.isAccessTokenInvalid()) {

      const novoToken = this.auth.obterNovoAccessToken()
        .then(() => {
          if(this.auth.isAccessTokenInvalid()) {
              throw new NotAuthenticatedError();
          }
          return fn().toPromise();
        })

        return observableFromPromise(novoToken);
    } else {
      return fn();
    }
  }
}

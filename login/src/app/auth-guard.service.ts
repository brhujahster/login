import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(
    private auth: AuthServiceService,
    private router: Router) { }
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      if(this.auth.isAccessTokenInvalid()) {

        return this.auth.obterNovoAccessToken()
          .then(() => {
            if(this.auth.isAccessTokenInvalid()) {
              this.router.navigate(['/login']);
              return false;
            }

            return true;
          })
      } else if(next.data.roles) {
        this.router.navigate(['/login']);
      }

      return true;
  }
}

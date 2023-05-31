import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private service: UserService,
    private router: Router) { }
   
  canActivate() {
    if (this.service.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login'])
    return false
  }
}

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }
    
  getToken() {
    return this.cookieService.get('jwtToken');
  }

  isLoggedIn() {
    return this.getToken() !== ''
  }

  register({ name, email, password }: any): Observable<any> {
    const data = { name, email, password }
    if (name && email && password) {
      return this.http.post('http://localhost:3000/api/register', data, { withCredentials: true })
    }
    return throwError(new Error('Failed to register'))
  }

  login({ email, password }: any): Observable<any> {
    const data = { email, password }
    if (email && password) {
      return this.http.post('http://localhost:3000/api/login', data, { withCredentials: true })
    }
    return throwError(new Error('Failed to loggin'))
  }

  logout() {
    console.log('service logout');
    if (this.cookieService.get('jwtToken')) {
      return this.http.post('http://localhost:3000/api/logout', { withCredentials: true })
    }
    return throwError(new Error('Failed to logout'))
  }
}

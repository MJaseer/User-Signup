import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

  constructor(private service: UserService,
    private router: Router,
    private cookieService: CookieService) { }

  logout() {
    this.service.logout().subscribe(
      (result) => {
        console.log('called', result);
        this.cookieService.deleteAll();
        this.router.navigate(['/login'])
      }, (err) => {
        console.log(err, 'logout error')
        this.router.navigate(['/login'])
      }
    )
  }

}

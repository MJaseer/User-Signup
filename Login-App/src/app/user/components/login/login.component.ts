import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    roleId: [1, Validators.required]
  })
  isSubmitted = false;
  roles = [
    { id: 1, title: 'Developer' },
    { id: 2, title: 'Manager' }
  ]

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: UserService
  ) { }

  authenticated = false


  ngOnInit(): void {
    // this.loginForm.get('roleId')?.valueChanges.subscribe(roleId => {
    //   console.log('Send Api',roleId);
    // })
    if (this.service.isLoggedIn()) {
      this.router.navigate(['/user'])
    }

  }

  login(): void {
    if (this.loginForm.invalid) {
      this.router.navigate(['/login'])
    } else {
      this.service.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result,'result');
          
          this.router.navigate(['/user'])
        }, (err: any) => {
          console.log(err,'error');
          
          this.router.navigate(['/login'])
        })
    }
    this.isSubmitted = true
  }

}

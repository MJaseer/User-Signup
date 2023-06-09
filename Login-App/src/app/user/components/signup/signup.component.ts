import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  isSubmitted = false

  constructor(private service: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
      this.router.navigate(['/user'])
    }
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.router.navigate(['signup'])
    } else {
      this.service.register(this.registerForm.value).subscribe(
        (result) => {
          console.log(result,'result signup');
          
          this.router.navigate(['login'])
        },(err:any)=>{
          console.log(err,'signup error');
          
        }
      )
    }
    this.isSubmitted = true
  }

}

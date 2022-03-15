import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorResponse } from './../../../services/api/dto/error';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  staffId: string;
  password: string;
  showPassword: boolean = false;
  loading: boolean = false;
  loginError: string;
  signInForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      staffId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLoginClicked() {
    this.loading = true;
    this.loginError = null;

    if (this.signInForm) {
      this.auth.login(this.signInForm.get('staffId').value, this.signInForm.get('password').value).then(
        res => {
          console.log('RESP: Login -> ', res);
          this.router.navigate(['']);
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log('FAILED: Login -> ', err);
          let error: ErrorResponse = err.error.error;
          this.loginError = error.message;
          return false;
        }
      );
    } else {
      this.loading = false;
    }

  }

}

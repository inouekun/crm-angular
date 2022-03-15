import { SuccessResponse } from './../../../services/api/dto/success';
import { ApiService } from 'src/app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorResponse } from 'src/app/services/api/dto/error';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  loading = false;

  errorResponse: ErrorResponse;
  successResponse: SuccessResponse;

  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  onForgotPasswordSubmitted() {
    this.loading = true;

    this.api.forgotPassword(this.forgotPasswordForm.get('email').value).subscribe(
      res => {
        console.log("SUCCESS: Forgot password -> ", res);
        let successResponse: SuccessResponse = {
          message: res.message
        };
        this.successResponse = successResponse;
        this.loading = false;
        this.errorResponse = {
          code: '',
          message: ''
        };
      },
      err => {
        console.log("FAILED: Forgot password -> ", err);
        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };
        this.errorResponse = response;
        this.loading = false;
        this.successResponse = {
          message: ''
        };
      }
    );
  }

}

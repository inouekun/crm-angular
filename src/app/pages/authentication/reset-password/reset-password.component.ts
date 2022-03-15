import { ErrorResponse } from './../../../services/api/dto/error';
import { ApiService } from './../../../services/api/api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordRequest } from 'src/app/services/api/dto/auth';
import { SuccessResponse } from 'src/app/services/api/dto/success';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  loading = false;

  resetPasswordForm: FormGroup;

  resetPassword: ResetPasswordRequest = {
    staffId: '',
    password: '',
    confirmPassword: '',
    token: ''
  };

  errorResponse: ErrorResponse;
  successResponse: SuccessResponse;

  constructor(private api: ApiService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.resetPassword.staffId = params.staffId;
      this.resetPassword.token = params.token;
    });
  }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  onResetPasswordSubmitted() {
    this.loading = true;

    this.resetPassword.password = this.resetPasswordForm.value.password;
    this.resetPassword.confirmPassword = this.resetPasswordForm.value.confirmPassword;

    this.api.resetPassword(this.resetPassword).subscribe(
      res => {
        console.log("SUCCESS: Reset password -> ", res);
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
        console.log("FAILED: Reset password -> ", err);
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

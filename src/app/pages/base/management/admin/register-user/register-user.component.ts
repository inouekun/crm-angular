import { Component, OnInit, ViewChild } from '@angular/core';
import { Routes } from './../../../../../constants/routes';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { GetUserResponse, CreateUserRequest } from 'src/app/services/api/dto/users';
import { MatDialog } from '@angular/material';
import { RouteInfo } from 'src/app/constants/routes';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { Role, Department, Departments } from 'src/app/constants/departments';
import { SuccessDialogComponent } from 'src/app/pages/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  pageAttrib: object;
  userDetailsFormGroup: FormGroup;

  user: CreateUserRequest = {
    staffId: '',
    name: '',
    email: '',
    designation: '',
    role: ''
  };

  departments: Department[] = [];
  routes: RouteInfo[] = [];
  loading: boolean = false;

  roles: Role[] = [];

  @ViewChild('stepper') stepper;

  get formArray(): AbstractControl | null { return this.userDetailsFormGroup.get('formArray'); }

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialog: MatDialog) {
    this.definePageAttrib();
  }


  ngOnInit() {
    this.userDetailsFormGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          nameCtrl: ['', Validators.required],
          staffIdCtrl: ['', Validators.required],
          staffEmailCtrl: ['', Validators.required],
          designationCtrl: ['', Validators.nullValidator]
        }),
        this.formBuilder.group({
          departmentCtrl: ['', Validators.nullValidator],
          roleCtrl: ['', Validators.required]
        })
      ])
    });
  }

  definePageAttrib() {
    this.routes = Routes.Admin.filter(
      route => {
        return route.name === 'User Registration';
      }
    );
    console.log("Value from Base Component -> ", this.routes);
  }

  onSubmitClicked() {
    this.loading = true;
    this.user = {
      staffId: this.userDetailsFormGroup.value.formArray[0].staffIdCtrl,
      name: this.userDetailsFormGroup.value.formArray[0].nameCtrl,
      email: this.userDetailsFormGroup.value.formArray[0].staffEmailCtrl,
      designation: this.userDetailsFormGroup.value.formArray[0].designationCtrl,
      role: this.userDetailsFormGroup.value.formArray[1].roleCtrl
    }

    console.log("User register: ", this.user);

    this.api.adminCreateUser(this.user).subscribe(
      res => {
        this.loading = false;
        console.log('RESP: Create user -> ', res);
        this.openSuccessDialog(res.message);
      },
      err => {
        this.loading = false;
        console.log('FAILED: Create user -> ', err);
        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.registerUserDialog(response);
      }
    );
  }

  changeRoleBasedOnDepartment(value: string) {
    (value) ? this.roles = Departments.getRolesFromDepartment(value) : this.roles = [];
  }

  openSuccessDialog(value: any) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { msg: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stepper.reset();
      console.log('Success dialog was closed');
    });
  }

  registerUserDialog(response: ErrorResponse) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { code: response.code, msg: response.message }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stepper.reset();
      console.log('Register user dialog was closed');
    });
  }

}

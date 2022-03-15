import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetUserResponse, EditUserRequest } from 'src/app/services/api/dto/users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departments, Role } from 'src/app/constants/departments';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  departmentRole: {
    roleName: string;
    department: string;
  };

  roles: Role[];
  department: string;
  editUserFormGroup: FormGroup;
  editUser: EditUserRequest = {
    staffId: '',
    name: '',
    email: '',
    designation: ''
  }

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: GetUserResponse, 
    private formBuilder: FormBuilder,
    private api: ApiService
    ) { }

  ngOnInit() {
    console.log(this.userData.role);
    this.editUserFormGroup = this.formBuilder.group({
      staffidCtrl: [{value:this.userData.staffId, disabled: true}, Validators.nullValidator],
      nameCtrl: [this.userData.name, Validators.required],
      emailCtrl: [this.userData.email, Validators.required],
      designationCtrl: [this.userData.designation, Validators.nullValidator],
      // departmentCtrl: ['', Validators.required],
      // roleCtrl: ['', Validators.required]
    });

    this.setDepartmentRoleDetails();
  
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  changeRoleBasedOnDepartment(value: string) {
    (value) ? this.roles = Departments.getRolesFromDepartment(value) : this.roles = [];    
  }

  setDepartmentRoleDetails() {
    this.departmentRole = Departments.getDepartmentRoleDetails(this.userData.role);
    console.log(this.departmentRole);
    
    // this.editUserFormGroup.controls['departmentCtrl'].setValue(this.departmentRole.department);
    // this.changeRoleBasedOnDepartment(this.departmentRole.department);
    // this.editUserFormGroup.controls['roleCtrl'].setValue(this.userData.role);
  }

  onEditUserClicked() {
    console.log("Edit user: ", this.editUserFormGroup.getRawValue());
    this.editUser = {
      staffId: this.editUserFormGroup.getRawValue().staffidCtrl,
      name: this.editUserFormGroup.getRawValue().nameCtrl,
      email: this.editUserFormGroup.getRawValue().emailCtrl,
      designation: this.editUserFormGroup.getRawValue().designationCtrl,
    };

    this.api.adminEditUser(this.editUser).subscribe(
      res => {
        console.log("RESP: Edit user -> ", res);
        this.dialogRef.close();
      },
      err => {
        console.log("FAILED: Edit user -> ", err);
      }          
    );    
  }

}

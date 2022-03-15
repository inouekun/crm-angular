import { element } from 'protractor';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { AddBranchesRequest, UpdateBranchesRequest } from './../../../../services/api/dto/clients';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-manage-branch-dialog',
  templateUrl: './manage-branch-dialog.component.html',
  styleUrls: ['./manage-branch-dialog.component.scss']
})
export class ManageBranchDialogComponent implements OnInit {

  dialogType: string;
  branchFormGroup: FormGroup;

  addBranchRequest: AddBranchesRequest = {
    name: "",
    branchAddressLine1: "",
    branchAddressLine2: "",
    branchAddressPostCode: "",
    branchAddressCity: "",
    branchAddressState: ""
  };

  editBranchRequest: UpdateBranchesRequest = {
    id: "",
    name: "",
    branchAddressLine1: "",
    branchAddressLine2: "",
    branchAddressPostCode: "",
    branchAddressCity: "",
    branchAddressState: ""
  };

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<ManageBranchDialogComponent>) { }

  ngOnInit() {
    this.branchFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      branchAddressLine1: ["", Validators.required],
      branchAddressLine2: [""],
      branchAddressPostCode: ["", Validators.required],
      branchAddressCity: ["", Validators.required],
      branchAddressState: ["", Validators.required]
    });
    this.dialogType = this.data.type;
    if (this.dialogType === "Edit") {
      this.branchFormGroup.patchValue(this.data.element)
    }
  }

  onSubmitClicked() {
    if (this.dialogType === "Add") {
      this.addBranchRequest = this.branchFormGroup.value;
      this.api.addBranches(this.data.id, this.addBranchRequest).subscribe(
        res => {
          console.log("SUCCESS: Add new branch -> ", res);
          this.dialog.close();
        }, err => {
          console.log("ERROR: Add new branch -> ", err);
          let response: ErrorResponse = {
            code: err.error.error.code,
            message: err.error.error.message
          };
          this.errorMessage = response;
        }
      );
    } else if (this.dialogType === "Edit") {

      this.editBranchRequest = {
        id: this.data.element.id,
        name: this.branchFormGroup.value.name,
        branchAddressLine1: this.branchFormGroup.value.branchAddressLine1,
        branchAddressLine2: this.branchFormGroup.value.branchAddressLine2,
        branchAddressPostCode: this.branchFormGroup.value.branchAddressPostCode,
        branchAddressCity: this.branchFormGroup.value.branchAddressCity,
        branchAddressState: this.branchFormGroup.value.branchAddressState
      };

      this.api.updateBranches(this.data.id, this.editBranchRequest).subscribe(
        res => {
          console.log("SUCCESS: Edit new branch -> ", res);
          this.dialog.close();
        }, err => {
          console.log("ERROR: Edit new branch -> ", err);
          let response: ErrorResponse = {
            code: err.error.error.code,
            message: err.error.error.message
          };
          this.errorMessage = response;
        }
      );
    }
  }

}

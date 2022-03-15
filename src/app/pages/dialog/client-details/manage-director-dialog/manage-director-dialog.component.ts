import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddDirectorRequest, EditDirectorRequest } from 'src/app/services/api/dto/clients';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-manage-director-dialog',
  templateUrl: './manage-director-dialog.component.html',
  styleUrls: ['./manage-director-dialog.component.scss']
})
export class ManageDirectorDialogComponent implements OnInit {

  addDirectorFormGroup: FormGroup;

  director: AddDirectorRequest = {
    name: ""
  };

  editDirector: EditDirectorRequest = {
    id: "",
    name: ""
  };

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  dialogType: string = "";
  nameDirector: string = "";

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<ManageDirectorDialogComponent>) { }

  ngOnInit() {
    this.addDirectorFormGroup = this.formBuilder.group({
      directorName: ["", Validators.required]
    });

    this.dialogType = this.data.type;
    if (this.dialogType == "Update") {
      this.nameDirector = this.data.element.name;

      this.addDirectorFormGroup.patchValue({ directorName: this.nameDirector });
    }
  }

  onBtnClicked() {
    if (this.dialogType == "Add") {
      this.director = {
        name: this.addDirectorFormGroup.value.directorName
      };

      this.api.addDirector(this.data.id, this.director).subscribe(res => {
        console.log("SUCCESS: Add new director -> ", res);
        this.dialog.close();
      }, err => {
        console.log("FAILED: Add new director -> ", err);

        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.errorMessage = response;
      });
    } else if (this.dialogType == "Update") {
      this.editDirector = {
        id: this.data.element.id,
        name: this.addDirectorFormGroup.value.directorName,
      };

      this.api.updateDirector(this.data.id, this.editDirector).subscribe(
        res => {
          console.log("SUCCESS: Update director -> ", res);
          this.dialog.close();
        }, err => {
          console.log("FAILED: Update director -> ", err);

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

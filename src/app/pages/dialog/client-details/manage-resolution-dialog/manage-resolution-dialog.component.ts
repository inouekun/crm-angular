import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { AddResolutionRequest, EditResolutionRequest } from 'src/app/services/api/dto/clients';

@Component({
  selector: 'app-manage-resolution-dialog',
  templateUrl: './manage-resolution-dialog.component.html',
  styleUrls: ['./manage-resolution-dialog.component.scss']
})
export class ManageResolutionDialogComponent implements OnInit {

  addResolutionFormGroup: FormGroup;

  addResolution: AddResolutionRequest = {
    title: '',
    resolutionDate: new Date()
  }

  editResolution: EditResolutionRequest = {
    id: '',
    title: '',
    resolutionDate: new Date()
  }

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  dialogType: string = "";
  titleResolution: string = "";
  dateResolution: string = "";

  constructor(private formBuilder : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA)public data : any, private dialog : MatDialogRef<ManageResolutionDialogComponent>) { }

  ngOnInit() {
    this.addResolutionFormGroup = this.formBuilder.group({
      resolutionTitle: [
        "", Validators.required
      ],
      resolutionDate: ["", Validators.required]
    });

    this.dialogType = this.data.type;
    if (this.dialogType == "Update") {
      this.titleResolution = this.data.element.title;
      this.dateResolution = this.data.element.resolutionDate;

      this.addResolutionFormGroup.patchValue({
        resolutionTitle: this.titleResolution,
        resolutionDate: this.dateResolution
      });
    }
  }

  onBtnClicked(){

    if (this.dialogType == "Add") {
      this.addResolution = {
        title: this.addResolutionFormGroup.value.resolutionTitle,
        resolutionDate: this.addResolutionFormGroup.value.resolutionDate
      };

      console.log("Add res: ", this.addResolution);


      this.api.addResolution(this.data.id, this.addResolution).subscribe(res => {
        console.log("SUCCESS: Add new resolution -> ", res);
        this.dialog.close();
      }, err => {
        console.log("FAILED: Add new resolution -> ", err);

        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.errorMessage = response;
      });
    } else if (this.dialogType == "Update") {

      this.editResolution = {
        id: this.data.element.id,
        title: this.addResolutionFormGroup.value.resolutionTitle,
        resolutionDate: this.addResolutionFormGroup.value.resolutionDate
      };

      this.api.updateResolution(this.data.id, this.editResolution).subscribe(
        res => {
          console.log("SUCCESS: Update resolution -> ", res);
          this.dialog.close();
        }, err => {
          console.log("FAILED: Update resolution -> ", err);

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

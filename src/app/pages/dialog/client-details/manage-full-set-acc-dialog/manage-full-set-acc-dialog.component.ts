import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddFullSetAccountRequest, UpdateFullSetAccountRequest } from 'src/app/services/api/dto/clients';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-manage-full-set-acc-dialog',
  templateUrl: './manage-full-set-acc-dialog.component.html',
  styleUrls: ['./manage-full-set-acc-dialog.component.scss']
})
export class ManageFullSetAccDialogComponent implements OnInit {

  addFullSetAccFormGroup: FormGroup;

  addFullSetAcc: AddFullSetAccountRequest = {
    title: '',
    date: new Date()
  }

  editFullSetAcc: UpdateFullSetAccountRequest = {
    id: '',
    title: '',
    date: new Date()
  }

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  dialogType: string = "";
  titleFullSetAcc: string = "";
  dateFullSetAcc: string = "";

  constructor(private formBuilder : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA)public data : any, private dialog : MatDialogRef<ManageFullSetAccDialogComponent>) { }

  ngOnInit() {
    this.addFullSetAccFormGroup = this.formBuilder.group({
      fullSetAccTitle: ["", Validators.required],
      fullSetAccDate: ["", Validators.required]
    });

    this.dialogType = this.data.type;
    if (this.dialogType == "Update") {
      this.titleFullSetAcc = this.data.element.title;
      this.dateFullSetAcc = this.data.element.date;

      this.addFullSetAccFormGroup.patchValue({
        fullSetAccTitle: this.titleFullSetAcc,
        fullSetAccDate: this.dateFullSetAcc
      });
    }
  }

  onBtnClicked(){

    if (this.dialogType == "Add") {
      this.addFullSetAcc = {
        title: this.addFullSetAccFormGroup.value.fullSetAccTitle,
        date: this.addFullSetAccFormGroup.value.fullSetAccDate
      };

      console.log("Add res: ", this.addFullSetAcc);


      this.api.addFullSetAccount(this.data.id, this.addFullSetAcc).subscribe(res => {
        console.log("SUCCESS: Add new full set account -> ", res);
        this.dialog.close();
      }, err => {
        console.log("FAILED: Add new full set account -> ", err);

        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.errorMessage = response;
      });
    } else if (this.dialogType == "Update") {

      this.editFullSetAcc = {
        id: this.data.element.id,
        title: this.addFullSetAccFormGroup.value.fullSetAccTitle,
        date: this.addFullSetAccFormGroup.value.fullSetAccDate
      };

      this.api.updateFullSetAccount(this.data.id, this.editFullSetAcc).subscribe(
        res => {
          console.log("SUCCESS: Update full set account -> ", res);
          this.dialog.close();
        }, err => {
          console.log("FAILED: Update full set account -> ", err);

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

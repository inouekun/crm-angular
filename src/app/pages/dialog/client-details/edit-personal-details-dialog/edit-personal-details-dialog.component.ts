import { Component, OnInit, Inject } from '@angular/core';
import { GetClientResponse, UpdateClientPersonalRequest } from 'src/app/services/api/dto/clients';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-edit-personal-details-dialog',
  templateUrl: './edit-personal-details-dialog.component.html',
  styleUrls: ['./edit-personal-details-dialog.component.scss']
})
export class EditPersonalDetailsDialogComponent implements OnInit {

  UpdatePersonalDetailsFormGroup: FormGroup;
  personalData: GetClientResponse;

  updatePersonal: UpdateClientPersonalRequest = {
    id: "",
    name: "",
    icNo: "",
    businessType: "",
    contactNo: "",
    remark: "",
    contactPerson: "",
    email: "",
    taxPayerInfo: "",
    incomeTaxNo: "",
    employerNo: "",
    lastTaxSubmittedYear: null,
    lastTaxSubmittedDate: null,
    postalAddrLine1: "",
    postalAddrLine2: "",
    postalAddrCity: "",
    postalAddrPostCode: "",
    postalAddrState: ""
  };

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditPersonalDetailsDialogComponent>,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.personalData = this.data.clientData;

    this.UpdatePersonalDetailsFormGroup = this.formBuilder.group({
      postAddrLine1Ctrl: ["", Validators.required],
      postAddrLine2Ctrl: ["", Validators.nullValidator],
      postAddrCityCtrl: ["", Validators.required],
      postAddrPostcodeCtrl: ["", Validators.required],
      postAddrStateCtrl: ["", Validators.required]
    });

    this.setClientData();
  }

  setClientData() {
    this.UpdatePersonalDetailsFormGroup.patchValue({
      postAddrLine1Ctrl: this.data.clientData.postalAddrLine1,
      postAddrLine2Ctrl: this.data.clientData.postalAddrLine2,
      postAddrCityCtrl: this.data.clientData.postalAddrCity,
      postAddrPostcodeCtrl: this.data.clientData.postalAddrPostCode,
      postAddrStateCtrl: this.data.clientData.postalAddrState
    });
  }

  onUpdateBtnClicked() {
    this.updatePersonal = {
      id: this.data.clientData.id,
      name: this.data.clientData.name,
      icNo: this.data.clientData.personalDetails.icNo,
      businessType: this.data.clientData.businessType,
      contactNo: this.data.clientData.contactNo,
      contactPerson: this.data.clientData.contactPerson,
      email: this.data.clientData.email,
      remark: this.data.clientData.remark,
      taxPayerInfo: this.data.clientData.taxPayerInfo,
      incomeTaxNo: this.data.clientData.incomeTaxNo,
      employerNo: this.data.clientData.employerNo,
      lastTaxSubmittedYear: this.data.clientData.lastTaxSubmittedYear,
      lastTaxSubmittedDate: this.data.clientData.lastTaxSubmittedDate,
      postalAddrLine1: this.UpdatePersonalDetailsFormGroup.value.postAddrLine1Ctrl,
      postalAddrLine2: this.UpdatePersonalDetailsFormGroup.value.postAddrLine2Ctrl,
      postalAddrCity: this.UpdatePersonalDetailsFormGroup.value.postAddrCityCtrl,
      postalAddrPostCode: this.UpdatePersonalDetailsFormGroup.value.postAddrPostcodeCtrl,
      postalAddrState: this.UpdatePersonalDetailsFormGroup.value.postAddrStateCtrl
    };

    this.api.updateClientPersonal(this.updatePersonal).subscribe(res => {
      this.dialogRef.close();
      console.log("RESP: Update client personal -> ", res);
      this.successSnackBar(res);
      // this.openSuccessDialog(res.message);
    }, err => {
      this.dialogRef.close();
      console.log("FAILED: Update client personal -> ", err);
      let response: ErrorResponse = {
        code: err.error.error.code,
        message: err.error.error.message
      };

      this.openErrorDialog(response);
    });
  }

  // openSuccessDialog(value: any) {
  //   const dialogRef = this.dialog.open(SuccessDialogComponent, {
  //     width: "400px",
  //     position: {
  //       top: "0px"
  //     },
  //     disableClose: true,
  //     data: {
  //       msg: value
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("Success dialog was closed");
  //   });
  // }

  successSnackBar(message) {
    let snackBarRef = this.snackBar.open(message.message, 'DISMISS', {
      duration: 4000
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

  openErrorDialog(response: ErrorResponse) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: "400px",
      position: {
        top: "0px"
      },
      disableClose: true,
      data: {
        code: response.code,
        msg: response.message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Error dialog was closed");
    });
  }


}

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { GetClientResponse, UpdateClientCompanyRequest } from 'src/app/services/api/dto/clients';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-edit-resolution-remark-dialog',
  templateUrl: './edit-resolution-remark-dialog.component.html',
  styleUrls: ['./edit-resolution-remark-dialog.component.scss']
})
export class EditResolutionRemarkDialogComponent implements OnInit {

  updateResRemarkFormGroup: FormGroup;
  companyData: GetClientResponse;

  updateCompany: UpdateClientCompanyRequest = {
    id: "",
    name: "",
    companyNo: "",
    businessType: "",
    contactNo: "",
    contactPerson: "",
    email: "",
    remarks: "",
    taxPayerInfo: "",
    businessAddrLine1: "",
    businessAddrLine2: "",
    businessAddrCity: "",
    businessAddrPostCode: "",
    businessAddrState: "",
    postalAddrLine1: "",
    postalAddrLine2: "",
    postalAddrCity: "",
    postalAddrPostCode: "",
    postalAddrState: "",
    incorporationDate: null,
    natureOfBusiness: "",
    annualYearEndDate: null,
    annualReturnsDate: null,
    agmDate: null,
    annualReturnsPaidDate: null,
    annualReturnsSubmittedDate: null,
    annualReturnsLastAuditedDate: null,
    financialStatementsPaidDate: null,
    financialStatementsSubmittedDate: null,
    lastAuditedReportDate: null,
    incomeTaxNo: "",
    employerNo: "",
    lastTaxSubmittedYear: null,
    lastTaxSubmittedDate: null
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
    private dialogRef: MatDialogRef<EditResolutionRemarkDialogComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.companyData = this.data.clientData;

    this.updateResRemarkFormGroup = this.formBuilder.group({
      remark: ["", Validators.required]
    });

    this.setClientData();
  }

  setClientData() {
    this.updateResRemarkFormGroup.patchValue({
      remark: this.data.clientData.remarks
    });
  }

  onUpdateBtnClicked() {
    this.updateCompany = {
      id: this.data.clientData.id,
      name: this.data.clientData.name,
      companyNo: this.data.clientData.companyDetails.companyNoCtrl,
      businessType: this.data.clientData.businessType,
      businessAddrLine1: this.data.clientData.companyDetails.businessAddrLine1,
      businessAddrLine2: this.data.clientData.companyDetails.businessAddrLine2,
      businessAddrCity: this.data.clientData.companyDetails.businessAddrCity,
      businessAddrPostCode: this.data.clientData.companyDetails.businessAddrPostCode,
      businessAddrState: this.data.clientData.companyDetails.businessAddrState,
      postalAddrLine1: this.data.clientData.postalAddrLine1,
      postalAddrLine2: this.data.clientData.postalAddrLine2,
      postalAddrCity: this.data.clientData.postalAddrCity,
      postalAddrPostCode: this.data.clientData.postalAddrPostCode,
      postalAddrState: this.data.clientData.postalAddrState,
      employerNo: this.data.clientData.employerNo,
      contactNo: this.data.clientData.contactNo,
      contactPerson: this.data.clientData.contactPerson,
      email: this.data.clientData.email,
      remarks: this.updateResRemarkFormGroup.value.remark,
      incorporationDate: this.data.clientData.companyDetails.incorporationDate,
      natureOfBusiness: this.data.clientData.companyDetails.natureOfBusiness,
      annualYearEndDate: this.data.clientData.companyDetails.annualYearEndDate,
      annualReturnsDate: this.data.clientData.companyDetails.annualReturnsDate,
      agmDate: this.data.clientData.companyDetails.agmDate,
      annualReturnsPaidDate: this.data.clientData.companyDetails.annualReturnsPaidDate,
      annualReturnsSubmittedDate: this.data.clientData.companyDetails.annualReturnsSubmittedDate,
      annualReturnsLastAuditedDate: this.data.clientData.companyDetails.annualReturnsLastAuditedDate,
      financialStatementsPaidDate: this.data.clientData.companyDetails.financialStatementsPaidDate,
      financialStatementsSubmittedDate: this.data.clientData.companyDetails.financialStatementsSubmittedDate,
      lastAuditedReportDate: this.data.clientData.lastAuditedReportDate,
      taxPayerInfo: this.data.clientData.taxPayerInfo,
      incomeTaxNo: this.data.clientData.incomeTaxNo,
      lastTaxSubmittedYear: this.data.clientData.companyDetails.lastTaxSubmittedYear,
      lastTaxSubmittedDate: this.data.clientData.companyDetails.lastTaxSubmittedDate
    };

    this.api.updateClientCompany(this.updateCompany).subscribe(res => {
      this.dialogRef.close();
      console.log("RESP: Update resolution remark -> ", res);
      this.successSnackBar(res);
      // this.openSuccessDialog(res.message);
    }, err => {
      this.dialogRef.close();
      console.log("FAILED: Update resolution remark -> ", err);
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

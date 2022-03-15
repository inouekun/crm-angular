import { Component, OnInit, Inject } from "@angular/core";
import { UpdateClientCompanyRequest, GetClientResponse } from "src/app/services/api/dto/clients";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api/api.service";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { ErrorResponse } from "src/app/services/api/dto/error";
import { SuccessDialogComponent } from "../../success-dialog/success-dialog.component";
import { ErrorDialogComponent } from "../../error-dialog/error-dialog.component";

@Component({ selector: "app-edit-company-details-dialog", templateUrl: "./edit-company-details-dialog.component.html", styleUrls: ["./edit-company-details-dialog.component.scss"] })
export class EditCompanyDetailsDialogComponent implements OnInit {
  UpdateCompanyDetailsFormGroup: FormGroup;
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

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private dialogRef: MatDialogRef<EditCompanyDetailsDialogComponent>) { }

  ngOnInit() {
    this.companyData = this.data.clientData;

    this.UpdateCompanyDetailsFormGroup = this.formBuilder.group({
      companyNoCtrl: ["", Validators.nullValidator],
      addrLine1Ctrl: ["", Validators.required],
      addrLine2Ctrl: ["", Validators.nullValidator],
      addrCityCtrl: ["", Validators.required],
      addrPostcodeCtrl: ["", Validators.required],
      addrStateCtrl: ["", Validators.required],
      postAddrLine1Ctrl: ["", Validators.required],
      postAddrLine2Ctrl: ["", Validators.nullValidator],
      postAddrCityCtrl: ["", Validators.required],
      postAddrPostcodeCtrl: ["", Validators.required],
      postAddrStateCtrl: ["", Validators.required]
    });

    this.setClientData();
  }

  setClientData() {
    this.UpdateCompanyDetailsFormGroup.patchValue({
      companyNoCtrl: this.data.clientData.companyDetails.companyNo,
      addrLine1Ctrl: this.data.clientData.companyDetails.businessAddrLine1,
      addrLine2Ctrl: this.data.clientData.companyDetails.businessAddrLine2,
      addrCityCtrl: this.data.clientData.companyDetails.businessAddrCity,
      addrPostcodeCtrl: this.data.clientData.companyDetails.businessAddrPostCode,
      addrStateCtrl: this.data.clientData.companyDetails.businessAddrState,
      postAddrLine1Ctrl: this.data.clientData.postalAddrLine1,
      postAddrLine2Ctrl: this.data.clientData.postalAddrLine2,
      postAddrCityCtrl: this.data.clientData.postalAddrCity,
      postAddrPostcodeCtrl: this.data.clientData.postalAddrPostCode,
      postAddrStateCtrl: this.data.clientData.postalAddrState
    });
  }

  onUpdateBtnClicked() {
    this.updateCompany = {
      id: this.data.clientData.id,
      name: this.data.clientData.name,
      companyNo: this.UpdateCompanyDetailsFormGroup.value.companyNoCtrl,
      businessType: this.data.clientData.businessType,
      taxPayerInfo: this.data.clientData.taxPayerInfo,
      businessAddrLine1: this.UpdateCompanyDetailsFormGroup.value.addrLine1Ctrl,
      businessAddrLine2: this.UpdateCompanyDetailsFormGroup.value.addrLine2Ctrl,
      businessAddrCity: this.UpdateCompanyDetailsFormGroup.value.addrCityCtrl,
      businessAddrPostCode: this.UpdateCompanyDetailsFormGroup.value.addrPostcodeCtrl,
      businessAddrState: this.UpdateCompanyDetailsFormGroup.value.addrStateCtrl,
      postalAddrLine1: this.UpdateCompanyDetailsFormGroup.value.postAddrLine1Ctrl,
      postalAddrLine2: this.UpdateCompanyDetailsFormGroup.value.postAddrLine2Ctrl,
      postalAddrCity: this.UpdateCompanyDetailsFormGroup.value.postAddrCityCtrl,
      postalAddrPostCode: this.UpdateCompanyDetailsFormGroup.value.postAddrPostcodeCtrl,
      postalAddrState: this.UpdateCompanyDetailsFormGroup.value.postAddrStateCtrl,
      employerNo: this.data.clientData.employerNo,
      contactNo: this.data.clientData.contactNo,
      contactPerson: this.data.clientData.contactPerson,
      email: this.data.clientData.email,
      remarks: this.data.clientData.remarks,
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
      incomeTaxNo: this.data.clientData.incomeTaxNo,
      lastTaxSubmittedYear: this.data.clientData.companyDetails.lastTaxSubmittedYear,
      lastTaxSubmittedDate: this.data.clientData.companyDetails.lastTaxSubmittedDate
    };

    this.api.updateClientCompany(this.updateCompany).subscribe(res => {
      this.dialogRef.close();
      console.log("RESP: Update company details -> ", res);
      this.successSnackBar(res);
      // this.openSuccessDialog(res.message);
    }, err => {
      this.dialogRef.close();
      console.log("FAILED: Update company details -> ", err);
      let response: ErrorResponse = {
        code: err.error.error.code,
        message: err.error.error.message
      };

      this.openErrorDialog(response);
    });
  }

  // openSuccessDialog(value : any) {
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

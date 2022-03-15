import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { GetClientResponse, UpdateClientCompanyRequest, UpdateClientPersonalRequest } from 'src/app/services/api/dto/clients';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';

@Component({
  selector: 'app-edit-tax-details-dialog',
  templateUrl: './edit-tax-details-dialog.component.html',
  styleUrls: ['./edit-tax-details-dialog.component.scss']
})
export class EditTaxDetailsDialogComponent implements OnInit {

  updateTaxDetailsFormGroup: FormGroup;
  clientData: GetClientResponse;

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
  }

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA)public data : any,
    private dialog : MatDialog,
    private dialogRef : MatDialogRef<EditTaxDetailsDialogComponent>
  ) { }

  ngOnInit() {
    this.clientData = this.data.clientData;

    this.updateTaxDetailsFormGroup = this.formBuilder.group({
      incomeTaxNo: ["", Validators.nullValidator],
      employerNo: ["", Validators.nullValidator],
      taxSubmitDate: ["", Validators.nullValidator],
      taxPayerInfo: ["", Validators.nullValidator]
    });

    this.setClientData();
  }

  setClientData() {
    this.updateTaxDetailsFormGroup.patchValue({
      incomeTaxNo: this.data.clientData.incomeTaxNo,
      employerNo: this.data.clientData.employerNo,
      taxSubmitDate: this.data.clientData.lastTaxSubmittedDate,
      taxPayerInfo: this.data.clientData.taxPayerInfo,
    });
  }

  onUpdateBtnClicked(){
    if (this.data.clientData.businessType != "personal") {
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
        employerNo: this.updateTaxDetailsFormGroup.value.employerNo,
        contactNo: this.data.clientData.cntcNo,
        contactPerson: this.data.clientData.name,
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
        taxPayerInfo: this.updateTaxDetailsFormGroup.value.taxPayerInfo,
        incomeTaxNo: this.updateTaxDetailsFormGroup.value.incomeTaxNo,
        lastTaxSubmittedYear: this.data.clientData.companyDetails.lastTaxSubmittedYear,
        lastTaxSubmittedDate: this.updateTaxDetailsFormGroup.value.taxSubmitDate
      };

      this.api.updateClientCompany(this.updateCompany).subscribe(res => {
        this.dialogRef.close();
        console.log("RESP: Update contact details -> ", res);
        this.openSuccessDialog(res.message);
      }, err => {
        this.dialogRef.close();
        console.log("FAILED: Update contact details -> ", err);
        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.openErrorDialog(response);
      });

    }else if(this.data.clientData.businessType == "personal"){
      this.updatePersonal = {
        id: this.data.clientData.id,
        name: this.data.clientData.name,
        icNo: this.data.clientData.personalDetails.icNo,
        businessType: this.data.clientData.businessType,
        contactNo: this.data.clientData.contactNo,
        remark: this.data.clientData.remark,
        contactPerson: this.data.clientData.contactPerson,
        email: this.data.clientData.email,
        taxPayerInfo: this.updateTaxDetailsFormGroup.value.taxPayerInfo,
        incomeTaxNo: this.updateTaxDetailsFormGroup.value.incomeTaxNo,
        employerNo: this.updateTaxDetailsFormGroup.value.employerNo,
        lastTaxSubmittedYear: this.data.clientData.lastTaxSubmittedYear,
        lastTaxSubmittedDate: this.updateTaxDetailsFormGroup.value.taxSubmitDate,
        postalAddrLine1: this.data.clientData.postalAddrLine1,
        postalAddrLine2: this.data.clientData.postalAddrLine2,
        postalAddrCity: this.data.clientData.postalAddrCity,
        postalAddrPostCode: this.data.clientData.postalAddrPostCode,
        postalAddrState: this.data.clientData.postalAddrState
      }

      this.api.updateClientPersonal(this.updatePersonal).subscribe(res => {
        this.dialogRef.close();
        console.log("RESP: Update contact details -> ", res);
        this.openSuccessDialog(res.message);
      }, err => {
        this.dialogRef.close();
        console.log("FAILED: Update contact details -> ", err);
        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.openErrorDialog(response);
      });
    }
  }

  openSuccessDialog(value : any) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: "400px",
      position: {
        top: "0px"
      },
      disableClose: true,
      data: {
        msg: value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Success dialog was closed");
    });
  }

  openErrorDialog(response : ErrorResponse) {
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

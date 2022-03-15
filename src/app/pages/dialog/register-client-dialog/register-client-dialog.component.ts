import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatDialog, MatRadioChange, MatDialogRef, MatSnackBar } from "@angular/material";
import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ApiService } from "src/app/services/api/api.service";
import { ErrorResponse } from "src/app/services/api/dto/error";
import { SuccessDialogComponent } from "../success-dialog/success-dialog.component";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
import { AddClientCompanyRequest, AddClientPersonalRequest } from 'src/app/services/api/dto/clients';

@Component({ selector: "app-register-client-dialog", templateUrl: "./register-client-dialog.component.html", styleUrls: ["./register-client-dialog.component.scss"] })
export class RegisterClientDialogComponent implements OnInit {
  @ViewChild("stepper") stepper;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  get addClientFormArray(): AbstractControl | null {
    return this.addClientFormGroup.get("addClientFormArray");
  }

  addClientFormGroup: FormGroup;

  personal: AddClientPersonalRequest = {
    name: "",
    icNo: "",
    businessType: "",
    contactNo: "",
    contactPerson: "",
    email: "",
    postalAddrLine1: "",
    postalAddrLine2: "",
    postalAddrCity: "",
    postalAddrPostCode: "",
    postalAddrState: ""
  };

  companyClient: AddClientCompanyRequest = {
    name: "",
    companyNo: "",
    businessType: "",
    contactNo: "",
    contactPerson: "",
    email: "",
    businessAddrLine1: "",
    businessAddrLine2: "",
    businessAddrCity: "",
    businessAddrPostCode: "",
    businessAddrState: "",
    postalAddrLine1: "",
    postalAddrLine2: "",
    postalAddrCity: "",
    postalAddrPostCode: "",
    postalAddrState: ""
  };

  loading: boolean = false;
  isDisabled: boolean = false;
  btnCopyUndo: string = 'Same as postal address';

  addrLine1: string = '';
  addrLine2: string = '';
  addrCity: string = '';
  addrPostcode: string = '';
  addrState: string = '';

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder, private api: ApiService, private dialog: MatDialog, private dialogRef: MatDialogRef<RegisterClientDialogComponent>) { }

  ngOnInit() {
    this.addClientFormGroup = this.formBuilder.group({
      addClientFormArray: this.formBuilder.array([
        this.formBuilder.group({
          clientTypeCtrl: ["", [Validators.required]]
        }),
        this.formBuilder.group({
          personalNameCtrl: ["", [Validators.required]],
          icNoCtrl: ["", [Validators.required]],
          addrLine1Ctrl: ["", [Validators.required]],
          addrLine2Ctrl: ["", [Validators.nullValidator]],
          addrCityCtrl: ["", [Validators.required]],
          addrPostcodeCtrl: ["", [Validators.required]],
          addrStateCtrl: ["", [Validators.required]],
        }),
        this.formBuilder.group({
          companyNameCtrl: ["", [Validators.required]],
          companyNoCtrl: ["", [Validators.nullValidator]],
          postalAddrLine1Ctrl: ["", [Validators.required]],
          postalAddrLine2Ctrl: ["", [Validators.nullValidator]],
          postalAddrCityCtrl: ["", [Validators.required]],
          postalAddrPostcodeCtrl: ["", [Validators.required]],
          postalAddrStateCtrl: ["", [Validators.required]],
          businessAddrLine1Ctrl: ["", [Validators.required]],
          businessAddrLine2Ctrl: ["", [Validators.nullValidator]],
          businessAddrCityCtrl: ["", [Validators.required]],
          businessAddrPostcodeCtrl: ["", [Validators.required]],
          businessAddrStateCtrl: ["", [Validators.required]]
        }),
        this.formBuilder.group({
          cntcPersonNameCtrl: ["", [Validators.required]],
          emailCtrl: ["", [Validators.required, Validators.email]],
          cntcNoCtrl: ["", [Validators.required, Validators.pattern("[0-9]*")]]
        })
      ])
    });
  }

  onAddClientClicked() {
    // this.loading = true;

    let clientType = this.addClientFormGroup.value.addClientFormArray[0].clientTypeCtrl;

    if (clientType == "personal") {
      this.personal = {
        name: this.addClientFormGroup.value.addClientFormArray[1].personalNameCtrl,
        icNo: this.addClientFormGroup.value.addClientFormArray[1].icNoCtrl,
        businessType: "personal",
        contactNo: this.addClientFormGroup.value.addClientFormArray[3].cntcNoCtrl,
        contactPerson: this.addClientFormGroup.value.addClientFormArray[3].cntcPersonNameCtrl,
        email: this.addClientFormGroup.value.addClientFormArray[3].emailCtrl,
        postalAddrLine1: this.addClientFormGroup.value.addClientFormArray[1].addrLine1Ctrl,
        postalAddrLine2: this.addClientFormGroup.value.addClientFormArray[1].addrLine2Ctrl,
        postalAddrCity: this.addClientFormGroup.value.addClientFormArray[1].addrCityCtrl,
        postalAddrPostCode: this.addClientFormGroup.value.addClientFormArray[1].addrPostcodeCtrl,
        postalAddrState: this.addClientFormGroup.value.addClientFormArray[1].addrStateCtrl
      };

      this.api.addClientPersonal(this.personal).subscribe(
        res => {
          this.loading = false;
          console.log('RESP: Create client personal -> ', res);
          // this.openSuccessDialog("Client personal successfully created.");
          this.successSnackBar();
        },
        err => {
          this.loading = false;
          console.log('FAILED: Create client personal -> ', err);
          let response: ErrorResponse = {
            code: err.error.error.code,
            message: err.error.error.message
          };

          this.openErrorDialog(response);
        }
      );

    } else {
      this.companyClient = {
        name: this.addClientFormGroup.value.addClientFormArray[2].companyNameCtrl,
        companyNo: this.addClientFormGroup.value.addClientFormArray[2].companyNoCtrl,
        businessType: this.addClientFormGroup.value.addClientFormArray[0].clientTypeCtrl,
        contactNo: this.addClientFormGroup.value.addClientFormArray[3].cntcNoCtrl,
        contactPerson: this.addClientFormGroup.value.addClientFormArray[3].cntcPersonNameCtrl,
        email: this.addClientFormGroup.value.addClientFormArray[3].emailCtrl,
        businessAddrLine1: this.addClientFormGroup.value.addClientFormArray[2].businessAddrLine1Ctrl,
        businessAddrLine2: this.addClientFormGroup.value.addClientFormArray[2].businessAddrLine2Ctrl,
        businessAddrCity: this.addClientFormGroup.value.addClientFormArray[2].businessAddrCityCtrl,
        businessAddrPostCode: this.addClientFormGroup.value.addClientFormArray[2].businessAddrPostcodeCtrl,
        businessAddrState: this.addClientFormGroup.value.addClientFormArray[2].businessAddrStateCtrl,
        postalAddrLine1: this.addClientFormGroup.value.addClientFormArray[2].postalAddrLine1Ctrl,
        postalAddrLine2: this.addClientFormGroup.value.addClientFormArray[2].postalAddrLine2Ctrl,
        postalAddrCity: this.addClientFormGroup.value.addClientFormArray[2].postalAddrCityCtrl,
        postalAddrPostCode: this.addClientFormGroup.value.addClientFormArray[2].postalAddrPostcodeCtrl,
        postalAddrState: this.addClientFormGroup.value.addClientFormArray[2].postalAddrStateCtrl
      };

      this.api.addClientCompany(this.companyClient).subscribe(
        res => {
          this.loading = false;
          console.log('RESP: Create client company -> ', res);
          this.dialogRef.close();
          // this.openSuccessDialog("Client company successfully created.");
          this.successSnackBar();
        },
        err => {
          this.loading = false;
          console.log('FAILED: Create client company -> ', err);
          let response: ErrorResponse = {
            code: err.error.error.code,
            message: err.error.error.message
          };

          this.dialogRef.close();
          this.openErrorDialog(response);
        }
      );
    }

    // clientType == "individual" ? console.log("Personal: ", this.personal) : console.log("Company: ", this.companyClient);

    // this.api.addClient(this.client).subscribe(
    //   res => {
    //     this.loading = false;
    //     console.log('RESP: Create client -> ', res);
    //     this.openSuccessDialog(res.message);
    //   },
    //   err => {
    //     this.loading = false;
    //     console.log('FAILED: Create client -> ', err);
    //     let response: ErrorResponse = {
    //       code: err.error.error.code,
    //       message: err.error.error.message
    //     };

    //     this.openErrorDialog(response);
    //   }
    // );
  }

  onChangeClientType(event: MatRadioChange) {
    this.addClientFormArray.get([1]).reset();
    this.addClientFormArray.get([2]).reset();
    this.addClientFormArray.get([3]).reset();

    // if (event.value != "privateLimited") {
    //   this.isDisabled = true;
    // } else {
    //   this.isDisabled = false;
    // }
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
  //     this.stepper.reset();
  //     console.log("Success dialog was closed");
  //   });
  // }

  successSnackBar() {
    let snackBarRef = this.snackBar.open("Client company successfully created.", 'DISMISS', {
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
      this.stepper.reset();
      console.log("Error dialog was closed");
    });
  }

  onBtnCopyUndoClicked() {
    if (this.btnCopyUndo == 'Same as postal address') {
      this.btnCopyUndo = 'Undo';

      this.addrLine1 = this.addClientFormGroup.value.addClientFormArray[2].postalAddrLine1Ctrl;
      this.addrLine2 = this.addClientFormGroup.value.addClientFormArray[2].postalAddrLine2Ctrl;
      this.addrCity = this.addClientFormGroup.value.addClientFormArray[2].postalAddrCityCtrl;
      this.addrPostcode = this.addClientFormGroup.value.addClientFormArray[2].postalAddrPostcodeCtrl;
      this.addrState = this.addClientFormGroup.value.addClientFormArray[2].postalAddrStateCtrl;

      console.log("Addr postcode:", this.addrPostcode);
      console.log("Addr state:", this.addrState);

      this.addClientFormArray.get([2]).setValue({
        companyNameCtrl: this.addClientFormGroup.value.addClientFormArray[2].companyNameCtrl,
        companyNoCtrl: this.addClientFormGroup.value.addClientFormArray[2].companyNoCtrl,
        businessAddrLine1Ctrl: this.addrLine1,
        businessAddrLine2Ctrl: this.addrLine2,
        businessAddrCityCtrl: this.addrCity,
        businessAddrPostcodeCtrl: this.addrPostcode,
        businessAddrStateCtrl: this.addrState,
        postalAddrLine1Ctrl: this.addrLine1,
        postalAddrLine2Ctrl: this.addrLine2,
        postalAddrCityCtrl: this.addrCity,
        postalAddrPostcodeCtrl: this.addrPostcode,
        postalAddrStateCtrl: this.addrState
      });

      this.isDisabled = true;

    } else if (this.btnCopyUndo == 'Undo') {
      this.btnCopyUndo = 'Same as postal address';

      this.addrLine1 = '';
      this.addrLine2 = '';
      this.addrCity = '';
      this.addrPostcode = '';
      this.addrState = '';

      this.addClientFormArray.get([2]).setValue({
        companyNameCtrl: this.addClientFormGroup.value.addClientFormArray[2].companyNameCtrl,
        companyNoCtrl: this.addClientFormGroup.value.addClientFormArray[2].companyNoCtrl,
        businessAddrLine1Ctrl: '',
        businessAddrLine2Ctrl: '',
        businessAddrCityCtrl: '',
        businessAddrPostcodeCtrl: '',
        businessAddrStateCtrl: '',
        postalAddrLine1Ctrl: this.addClientFormGroup.value.addClientFormArray[2].postalAddrLine1Ctrl,
        postalAddrLine2Ctrl: this.addClientFormGroup.value.addClientFormArray[2].postalAddrLine2Ctrl,
        postalAddrCityCtrl: this.addClientFormGroup.value.addClientFormArray[2].postalAddrCityCtrl,
        postalAddrPostcodeCtrl: this.addClientFormGroup.value.addClientFormArray[2].postalAddrPostcodeCtrl,
        postalAddrStateCtrl: this.addClientFormGroup.value.addClientFormArray[2].postalAddrStateCtrl
      });

      this.isDisabled = false;

    }
  }
}

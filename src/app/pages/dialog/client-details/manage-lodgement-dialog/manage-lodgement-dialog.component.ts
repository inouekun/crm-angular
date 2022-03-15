import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddLodgementRequest, EditLodgementRequest } from 'src/app/services/api/dto/clients';
import { ErrorResponse } from 'src/app/services/api/dto/error';

@Component({
  selector: 'app-manage-lodgement-dialog',
  templateUrl: './manage-lodgement-dialog.component.html',
  styleUrls: ['./manage-lodgement-dialog.component.scss']
})
export class ManageLodgementDialogComponent implements OnInit {

  addLodgementFormGroup: FormGroup;

  addLodgement: AddLodgementRequest = {
    year: 0,
    financialYearEndDate: new Date(),
    annualReturnDate: new Date()
  }

  editLodgement: EditLodgementRequest = {
    id: '',
    year: 0,
    financialYearEndDate: new Date(),
    annualReturnDate: new Date()
  }

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  dialogType: string = "";
  yearLodgement: number = null;
  dateFinancialYearEnd: Date = null;
  dateAnnualReturn: Date = null;

  constructor(private formBuilder : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA)public data : any, private dialog : MatDialogRef<ManageLodgementDialogComponent>) { }

  ngOnInit() {
    this.addLodgementFormGroup = this.formBuilder.group({
      lodgementYear: ["", [Validators.required, Validators.min(1970), Validators.max(9999)]],
      endDate: ["", Validators.required],
      annualReturnDate: ["", Validators.required]
    });

    this.dialogType = this.data.type;
    if (this.dialogType === "Update") {
      this.yearLodgement = this.data.element.year;
      this.dateFinancialYearEnd = this.data.element.financialYearEndDate;
      this.dateAnnualReturn = this.data.element.annualReturnDate;

      this.addLodgementFormGroup.patchValue({
        lodgementYear: this.yearLodgement,
        endDate: this.dateFinancialYearEnd,
        annualReturnDate: this.dateAnnualReturn
      });
    }
  }

  onBtnClicked(){

    if (this.dialogType === "Add") {
      this.addLodgement = {
        year: this.addLodgementFormGroup.value.lodgementYear,
        financialYearEndDate: this.addLodgementFormGroup.value.endDate,
        annualReturnDate: this.addLodgementFormGroup.value.annualReturnDate
      };

      this.api.addLodgementYears(this.data.id, this.addLodgement).subscribe(res => {
        console.log("SUCCESS: Add new lodgement -> ", res);
        this.dialog.close();
      }, err => {
        console.log("FAILED: Add new lodgement -> ", err);

        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.errorMessage = response;
      });
    } else if (this.dialogType === "Update") {

      this.editLodgement = {
        id: this.data.element.id,
        year: this.addLodgementFormGroup.value.lodgementYear,
        financialYearEndDate: this.addLodgementFormGroup.value.endDate,
        annualReturnDate: this.addLodgementFormGroup.value.annualReturnDate
      };

      this.api.updateLodgementYears(this.data.id, this.editLodgement).subscribe(
        res => {
          console.log("SUCCESS: Update lodgement -> ", res);
          this.dialog.close();
        }, err => {
          console.log("FAILED: Update lodgement -> ", err);

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

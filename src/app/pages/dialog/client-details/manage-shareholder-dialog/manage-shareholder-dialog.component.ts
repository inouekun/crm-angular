import {Component, OnInit, Inject} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ErrorResponse} from "src/app/services/api/dto/error";
import {ApiService} from "src/app/services/api/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AddShareholderRequest, EditShareholderRequest} from "src/app/services/api/dto/clients";

@Component({
  selector: 'app-manage-shareholder-dialog',
  templateUrl: './manage-shareholder-dialog.component.html',
  styleUrls: ['./manage-shareholder-dialog.component.scss']
})
export class ManageShareholderDialogComponent implements OnInit {

  addShareholderFormGroup: FormGroup;

  shareholder: AddShareholderRequest = {
    name: "",
    shareValue: 0
  };

  editShareholder: EditShareholderRequest = {
    id: "",
    name: "",
    shareValue: 0
  };

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  dialogType: string = "";
  nameShareholder: string = "";
  amountShareholder: string = "";

  constructor(private formBuilder : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA)public data : any, private dialog : MatDialogRef<ManageShareholderDialogComponent>) {}

  ngOnInit() {
    this.addShareholderFormGroup = this.formBuilder.group({
      shareholderName: [
        "", Validators.required
      ],
      shareAmount: ["", Validators.required]
    });

    this.dialogType = this.data.type;
    if (this.dialogType == "Update") {
      this.nameShareholder = this.data.element.name;
      this.amountShareholder = this.data.element.shareValue;

      this.addShareholderFormGroup.patchValue({
        shareholderName: this.nameShareholder,
        shareAmount: this.amountShareholder
      });
    }
  }

  onBtnClicked() {
    if (this.dialogType == "Add") {
      this.shareholder = {
        name: this.addShareholderFormGroup.value.shareholderName,
        shareValue: this.addShareholderFormGroup.value.shareAmount
      };

      this.api.addShareholder(this.data.id, this.shareholder).subscribe(res => {
        console.log("SUCCESS: Add new shareholder -> ", res);
        this.dialog.close();
      }, err => {
        console.log("FAILED: Add new shareholder -> ", err);

        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.errorMessage = response;
      });
    } else if (this.dialogType == "Update") {

      this.editShareholder = {
        id: this.data.element.id,
        name: this.addShareholderFormGroup.value.shareholderName,
        shareValue: this.addShareholderFormGroup.value.shareAmount
      };

      this.api.updateShareholder(this.data.id, this.editShareholder).subscribe(
        res => {
          console.log("SUCCESS: Update shareholder -> ", res);
          this.dialog.close();
        }, err => {
          console.log("FAILED: Update shareholder -> ", err);

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

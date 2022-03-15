import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddAssetListCommitmentsRequest, UpdateAssetListCommitmentsRequest } from 'src/app/services/api/dto/clients';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-manage-asset-list-commitments',
  templateUrl: './manage-asset-list-commitments.component.html',
  styleUrls: ['./manage-asset-list-commitments.component.scss']
})
export class ManageAssetListCommitmentsComponent implements OnInit {

  addAssetListFormGroup: FormGroup;

  AddAssetList: AddAssetListCommitmentsRequest = {
    title: "",
    value: 0
  };

  UpdateAssetList: UpdateAssetListCommitmentsRequest = {
    id: "",
    title: "",
    value: 0
  };

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  dialogType: string = "";
  titleAsset: string = "";
  valueAsset: string = "";

  constructor(private formBuilder : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA)public data : any, private dialog : MatDialogRef<ManageAssetListCommitmentsComponent>) {}

  ngOnInit() {
    this.addAssetListFormGroup = this.formBuilder.group({
      assetTitle: ["", Validators.required],
      assetValue: ["", Validators.required]
    });

    this.dialogType = this.data.type;
    if (this.dialogType == "Update") {
      this.titleAsset = this.data.element.title;
      this.valueAsset = this.data.element.value;

      this.addAssetListFormGroup.patchValue({
        assetTitle: this.titleAsset,
        assetValue: this.valueAsset
      });
    }
  }

  onBtnClicked() {
    if (this.dialogType == "Add") {
      this.AddAssetList = {
        title: this.addAssetListFormGroup.value.assetTitle,
        value: this.addAssetListFormGroup.value.assetValue
      };

      this.api.addAssetListCommitments(this.data.id, this.AddAssetList).subscribe(res => {
        console.log("SUCCESS: Add new asset list commitments -> ", res);
        this.dialog.close();
      }, err => {
        console.log("FAILED: Add new asset list commitments -> ", err);

        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.errorMessage = response;
      });
    } else if (this.dialogType == "Update") {

      this.UpdateAssetList = {
        id: this.data.element.id,
        title: this.addAssetListFormGroup.value.assetTitle,
        value: this.addAssetListFormGroup.value.assetValue
      };

      this.api.updateAssetListCommitments(this.data.id, this.UpdateAssetList).subscribe(
        res => {
          console.log("SUCCESS: Update asset list commitments -> ", res);
          this.dialog.close();
        }, err => {
          console.log("FAILED: Update asset list commitments -> ", err);

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

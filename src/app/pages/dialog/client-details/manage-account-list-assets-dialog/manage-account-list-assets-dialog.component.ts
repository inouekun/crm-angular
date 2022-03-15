import { element } from 'protractor';
import { AddAssetListHirePurchaseRequest, UpdateAssetListHirePurchaseRequest } from './../../../../services/api/dto/clients';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ProfilePictureDialogComponent } from '../../user-details/profile-picture-dialog/profile-picture-dialog.component';

@Component({
  selector: 'app-manage-account-list-assets-dialog',
  templateUrl: './manage-account-list-assets-dialog.component.html',
  styleUrls: ['./manage-account-list-assets-dialog.component.scss']
})
export class ManageAccountListAssetsDialogComponent implements OnInit {

  dialogType: string = "";
  assetValue: string = "";

  addAssetHirePurchaseFormGroup: FormGroup;
  errorMessage: ErrorResponse;

  addAssetListHirePurchaseRequest: AddAssetListHirePurchaseRequest = {
    title: ""
  };

  updateAssetListHirePurchaseRequest: UpdateAssetListHirePurchaseRequest = {
    id: "",
    title: ""
  };

  constructor(private api: ApiService, private dialog: MatDialogRef<ProfilePictureDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addAssetHirePurchaseFormGroup = this.formBuilder.group({
      assetName: ["", Validators.required]
    });

    this.dialogType = this.data.type;
    if (this.dialogType === "Update") {

      this.assetValue = this.data.element.title;

      this.addAssetHirePurchaseFormGroup.patchValue({ assetName: this.assetValue });
    }
  }

  onBtnClicked() {
    if (this.dialogType === "Add") {
      this.addAssetListHirePurchaseRequest.title = this.addAssetHirePurchaseFormGroup.value.assetName;
      this.addAssetListHirePurchase();
    } else if (this.dialogType === "Update") {
      this.updateAssetListHirePurchaseRequest = {
        id: this.data.element.id,
        title: this.addAssetHirePurchaseFormGroup.value.assetName
      };
      this.editAssetListHirePurchase();
    }
  }

  addAssetListHirePurchase() {
    this.api.addAssetListHirePurchase(this.data.id, this.addAssetListHirePurchaseRequest).subscribe(
      res => {
        console.log("SUCCESS: Add new asset list -> ", res);
        this.dialog.close();
      }, err => {
        console.log("ERROR: Add new asset list -> ", err);
        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.errorMessage = response;
      }
    );
  }

  editAssetListHirePurchase() {
    this.api.updateAssetListHirePurchase(this.data.id, this.updateAssetListHirePurchaseRequest).subscribe(
      res => {
        console.log("SUCCESS: Update asset list -> ", res);
        this.dialog.close();
      }, err => {
        console.log("ERROR: Update asset list -> ", err);

        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.errorMessage = response;
      }
    );
  }

}

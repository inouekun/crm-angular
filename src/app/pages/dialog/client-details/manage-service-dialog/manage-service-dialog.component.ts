import {Component, OnInit, Inject} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "src/app/services/api/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AddServiceRequest} from "src/app/services/api/dto/clients";
import { ErrorResponse } from 'src/app/services/api/dto/error';


@Component({
  selector: 'app-manage-service-dialog',
  templateUrl: './manage-service-dialog.component.html',
  styleUrls: ['./manage-service-dialog.component.scss']
})
export class ManageServiceDialogComponent implements OnInit {

  addServiceFormGroup: FormGroup;

  serviceRequest: AddServiceRequest = {
    service: ""
  };

  errorMessage: ErrorResponse = {
    code: '',
    message: ''
  };

  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA)public data : any,
    private dialog : MatDialogRef<ManageServiceDialogComponent>
    ) {}

  ngOnInit() {
    this.addServiceFormGroup = this.formBuilder.group({
      serviceCtrl: ["", Validators.required]
    });
  }

  onAddServiceClicked() {
    this.serviceRequest.service = this.addServiceFormGroup.value.serviceCtrl;

    this.api.addServiceSubscription(this.data.id, this.serviceRequest).subscribe(
      res => {
      console.log("SUCCESS: Add new service -> ", res);
      this.dialog.close();

    }, err => {
      console.log("FAILED: Add new service -> ", err);

      let response: ErrorResponse = {
        code: err.error.error.code,
        message: err.error.error.message
      };

      this.errorMessage = response;
    });
  }

}

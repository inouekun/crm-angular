import { Validators } from '@angular/forms';
import { AddMemorandumRequest, EditMemorandumRequest } from './../../../../services/api/dto/clients';
import { ErrorResponse } from './../../../../services/api/dto/error';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './../../../../services/api/api.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-memorandum-dialog',
  templateUrl: './manage-memorandum-dialog.component.html',
  styleUrls: ['./manage-memorandum-dialog.component.scss']
})
export class ManageMemorandumDialogComponent implements OnInit {

  addMemorandumFormGroup: FormGroup;
  editMemorandumFormGroup: FormGroup;

  loading = false;
  dialogType: string;
  memorandumName: string;
  fileUploaded: any;
  readerResult;

  memorandumsData: AddMemorandumRequest = {
    title: "",
    media: {
      fileName: "",
      dataUrl: "",
      extension: ""
    }
  };

  editMemorandumsData: EditMemorandumRequest = {
    id: "",
    title: ""
  };

  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };

  constructor(private api: ApiService, private formBuilder: FormBuilder, private dialog: MatDialogRef<ManageMemorandumDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);

    this.dialogType = this.data.type;

    this.addMemorandumFormGroup = this.formBuilder.group({
      memorandumName: ["", Validators.required],
      document: ["", Validators.required]
    });

    this.editMemorandumFormGroup = this.formBuilder.group({
      memorandumName: ["", Validators.required]
    });

    if (this.dialogType === "Edit") {
      this.memorandumName = this.data.element.name;
      this.editMemorandumFormGroup.patchValue({ memorandumName: this.memorandumName });
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileUploaded = event.target.files[0];
      this.addMemorandumFormGroup.get('document').setValue(this.fileUploaded);
      console.log(this.addMemorandumFormGroup.get('document').value);

      this.memorandumsData.title = this.addMemorandumFormGroup.get('memorandumName').value;
      this.memorandumsData.media.fileName = this.addMemorandumFormGroup.get('document').value.name;
      this.memorandumsData.media.extension = this.addMemorandumFormGroup.get('document').value.type;

      var file: File = this.fileUploaded;
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.readerResult = myReader.result;
        this.memorandumsData.media.dataUrl = this.readerResult;
      };
      myReader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.dialogType === "Add") {
      if (this.addMemorandumFormGroup.invalid) {
        if (this.addMemorandumFormGroup.get('memorandumName').value && !this.addMemorandumFormGroup.get('document').value) {
          this.errorMessage.message = "Please choose file.";
        }
        return;
      }
      this.loading = true;
      console.log(this.memorandumsData);

      this.api.addMemorandum(this.data.id, this.memorandumsData).subscribe(
        res => {
          this.loading = false;
          console.log("SUCCESS: Add Memorandums -> ", res);
          this.dialog.close();
        }, err => {
          this.loading = false;
          console.log("ERROR: Add Memorandums -> ", err);
          let response: ErrorResponse = {
            code: err.error.error.code,
            message: err.error.error.message
          };

          this.errorMessage = response;
        }
      );
    } else if (this.dialogType === "Edit") {
      this.editMemorandumsData = {
        id: this.data.element.id,
        title: this.editMemorandumFormGroup.value.memorandumName
      };
      this.api.updateMemorandum(this.data.id, this.editMemorandumsData).subscribe(
        res => {
          console.log("SUCCESS: Update Memorandums -> ", res);
          this.dialog.close();
        }, err => {
          console.log("FAILED: Update Memorandums -> ", err);
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

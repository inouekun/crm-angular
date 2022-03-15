import { ErrorResponse } from 'src/app/services/api/dto/error';
import { Validators } from '@angular/forms';
import { ApiService } from './../../../../services/api/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddFullSetDocumentRequest, EditFullSetDocumentRequest } from './../../../../services/api/dto/clients';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-manage-documents-dialog',
  templateUrl: './manage-documents-dialog.component.html',
  styleUrls: ['./manage-documents-dialog.component.scss']
})
export class ManageDocumentsDialogComponent implements OnInit {

  addDocumentFormGroup: FormGroup;
  editDocumentFormGroup: FormGroup;
  uploadStatus: string;
  fileUploaded: any;
  readerResult;
  loading = false;
  errorMessage: ErrorResponse = {
    code: "",
    message: ""
  };
  dialogType: string;
  documentName: string;

  documentsData: AddFullSetDocumentRequest = {
    documentType: "",
    media: {
      fileName: "",
      dataUrl: "",
      extension: ""
    }
  };

  editDocumentsData: EditFullSetDocumentRequest = {
    id: "",
    documentType: ""
  };

  constructor(private api: ApiService, private formBuilder: FormBuilder, private dialog: MatDialogRef<ManageDocumentsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);

    this.dialogType = this.data.type;

    this.addDocumentFormGroup = this.formBuilder.group({
      documentName: ["", Validators.required],
      document: ["", Validators.required]
    });

    this.editDocumentFormGroup = this.formBuilder.group({
      documentName: ["", Validators.required]
    });

    if (this.dialogType === "Edit") {
      this.documentName = this.data.element.name;
      this.editDocumentFormGroup.patchValue({ documentName: this.documentName });
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileUploaded = event.target.files[0];
      this.addDocumentFormGroup.get('document').setValue(this.fileUploaded);
      console.log(this.addDocumentFormGroup.get('document').value);

      this.documentsData.documentType = this.addDocumentFormGroup.get('documentName').value;
      this.documentsData.media.fileName = this.addDocumentFormGroup.get('document').value.name;
      this.documentsData.media.extension = this.addDocumentFormGroup.get('document').value.type;

      var file: File = this.fileUploaded;
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.readerResult = myReader.result;
        this.documentsData.media.dataUrl = this.readerResult;
      };
      myReader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.dialogType === "Add") {
      if (this.addDocumentFormGroup.invalid) {
        if (this.addDocumentFormGroup.get('documentName').value && !this.addDocumentFormGroup.get('document').value) {
          this.errorMessage.message = "Please choose file.";
        }
        return;
      }
      this.loading = true;
      console.log(this.documentsData);

      this.api.addFullSetDocument(this.data.id, this.documentsData).subscribe(
        res => {
          this.loading = false;
          console.log("SUCCESS: Add Documents -> ", res);
          this.dialog.close();
        }, err => {
          this.loading = false;
          console.log("ERROR: Add Documents -> ", err);
          let response: ErrorResponse = {
            code: err.error.error.code,
            message: err.error.error.message
          };

          this.errorMessage = response;
        }
      );
    } else if (this.dialogType === "Edit") {
      this.editDocumentsData = {
        id: this.data.element.id,
        documentType: this.editDocumentFormGroup.value.documentName
      };
      this.api.updateFullSetDocument(this.data.id, this.editDocumentsData).subscribe(
        res => {
          console.log("SUCCESS: Update documents -> ", res);
          this.dialog.close();
        }, err => {
          console.log("FAILED: Update documents -> ", err);
          let response: ErrorResponse = {
            code: err.error.error.code,
            message: err.error.error.message
          };

          this.errorMessage = response;
        }
      )
    }

  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.readerResult = reader.result;
  }

}

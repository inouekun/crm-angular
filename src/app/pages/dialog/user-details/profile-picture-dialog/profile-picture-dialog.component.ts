import { AddProfilePictureRequest } from './../../../../services/api/dto/users';
import { ApiService } from 'src/app/services/api/api.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-picture-dialog',
  templateUrl: './profile-picture-dialog.component.html',
  styleUrls: ['./profile-picture-dialog.component.scss']
})
export class ProfilePictureDialogComponent implements OnInit {

  pictureUploadStatus: string;
  picturePath: any;
  pictureData: AddProfilePictureRequest = {
    fileName: '',
    dataUrl: '',
    extension: ''
  };

  constructor(private api: ApiService, private dialog: MatDialogRef<ProfilePictureDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseClicked() {
    this.dialog.close();
  }

  previewPicture(files: any) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.pictureUploadStatus = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    this.picturePath = files[0];

    this.pictureData.fileName = this.picturePath.name;
    this.pictureData.extension = this.picturePath.type;

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.pictureData.dataUrl = reader.result;
    };
  }

  onChangePicture() {
    if (!this.pictureData.dataUrl) {
      this.pictureUploadStatus = "Please upload a new picture profile.";
    } else {
      this.api.addProfilePicture(this.pictureData).subscribe(
        res => {
          console.log("SUCCESS: Profile Picture -> ", res);
          location.reload();
        },
        err => {
          console.log("ERROR: Profile Picture -> ", err);
        }
      );
    }
  }

}

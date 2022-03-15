import { MatDialog } from '@angular/material';
import { Departments } from './../../../constants/departments';
import { ApiService } from './../../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { GetUserResponse } from 'src/app/services/api/dto/users';
import { ProfilePictureDialogComponent } from '../../dialog/user-details/profile-picture-dialog/profile-picture-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  routes: object[] = [{
    name: 'Profile',
    breadcrumb: 'Home / Profile'
  }];

  userData: GetUserResponse = {
    id: '',
    staffId: '',
    name: '',
    email: '',
    designation: '',
    role: ''
  };

  userPic: any;
  defaultPic = "/assets/images/default_avatar.png";
  uploadedPic: any;
  pictureUploadStatus: string;

  departmentRoleDetails = {
    roleName: '',
    department: ''
  };

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUserDetails();
    this.getProfilePicture();
  }

  getUserDetails() {
    this.api.getUserDetails().subscribe(
      user => {
        this.userData = user;
        this.departmentRoleDetails = Departments.getDepartmentRoleDetails(user.role);
        console.log('User Details -> ', user);
        console.log('Department Role Details -> ', this.departmentRoleDetails);
      }
    );
  }

  getProfilePicture() {
    this.api.getProfilePicture().subscribe(
      picture => {
        console.log("SUCCESS: Profile Picture -> ", picture);
        this.userPic = picture;
      },
      err => {
        console.log("ERROR: Profile Picture -> ", err);
      }
    );
  }

  onChangePictureClicked() {
    this.dialog.open(ProfilePictureDialogComponent, {
      width: '400px',
      data: {
        defaultPic: this.defaultPic,
        userPic: this.userPic
      }
    });
  }



}

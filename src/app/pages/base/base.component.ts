import { Departments } from 'src/app/constants/departments';
import { ApiService } from './../../services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TokenExpiredDialogComponent } from '../dialog/token-expired-dialog/token-expired-dialog.component';
import { Routes, RouteInfo } from 'src/app/constants/routes';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private api: ApiService, private dialog: MatDialog) { }

  onAuthChangeSubscription: Subscription;

  routes: RouteInfo[] = [];

  userPic: any;
  defaultPic = "/assets/images/default_avatar.png";

  currentPageTitle: string;
  currentBreadcrumb: string;
  currentRole = {
    roleName: '',
    department: ''
  };

  ngOnInit() {
    this.checkRole();
    this.getProfilePicture();
    this.onAuthChangeSubscription = this.auth.onAuthChange.subscribe((authState) => {
      if (!authState.loggedIn) {
        if (authState.tokenExpired) {
          this.showTokenExpiredDialog();
        } else {
          this.onLoggedOut();
        }
      }
    });
  }

  onActivate(event) {
    console.log('Value from child component -> ', event);
    this.currentPageTitle = event.routes[0].name;
    this.currentBreadcrumb = event.routes[0].breadcrumb;
  }

  checkRole() {
    const role = this.auth.getRole();
    this.currentRole = Departments.getDepartmentRoleDetails(role);
    console.log('This is current ROLE -> ', this.currentRole);

    switch (role) {
      case 'super-admin':
        this.routes = Routes.SuperAdmin;
        break;
      case 'mgmt-admin':
        this.routes = Routes.Admin;
        break;
      case 'mgmt-ceo':
        this.routes = Routes.CEO;
        break;
      case 'sec-staff':
        this.routes = Routes.SecretaryStaff;
        break;
      default:
        break;
    }
  }

  onLoggedOut() {
    this.onAuthChangeSubscription.unsubscribe();
    this.router.navigate(['sign-in']);
  }

  onSignOutClicked() {
    this.auth.logout();
  }

  showTokenExpiredDialog() {
    const accountBlockedDialogRef = this.dialog.open(TokenExpiredDialogComponent, {
      width: '400px',
      position: { top: '0%' },
      disableClose: true
    });

    accountBlockedDialogRef.afterClosed().subscribe(
      res => {
        console.log("Token Expired Dialog was closed");
        this.onLoggedOut();
      });
  }

  onClickSideNavSetTitle(value) {
    this.currentPageTitle = value.name;
    this.currentBreadcrumb = value.breadcrumb;
  }

  getProfilePicture() {
    this.api.getProfilePicture().subscribe(
      res => {
        console.log("SUCCESS: Profile picture response -> ", res);
        this.userPic = res;
      },
      err => {
        console.log("ERROR: Profile picture response -> ", err);
      }
    )
  }

}

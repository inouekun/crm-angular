import { MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { MatSort } from '@angular/material';
import { ApiService } from 'src/app/services/api/api.service';
import { MatTableDataSource } from '@angular/material';
import { GetFullSetAccountsResponse, UpdateFullSetAccountRequest, GetAssetListHirePurchaseResponse } from './../../../../services/api/dto/clients';
import { ErrorResponse } from './../../../../services/api/dto/error';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageFullSetAccDialogComponent } from 'src/app/pages/dialog/client-details/manage-full-set-acc-dialog/manage-full-set-acc-dialog.component';
import { ManageAccountListAssetsDialogComponent } from 'src/app/pages/dialog/client-details/manage-account-list-assets-dialog/manage-account-list-assets-dialog.component';
import { SuccessDialogComponent } from 'src/app/pages/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() clientId: string;

  displayedFullSetAccountColumns: string[] = ['fullSetAccountTitle', 'fullSetAccountDate', 'fullSetAccountAction'];
  fullSetAccountsDataSource: MatTableDataSource<GetFullSetAccountsResponse>;

  displayedAccountAssetColumns: string[] = ['accountAssetTitle', 'accountAssetAction'];
  accountAssetsDataSource: MatTableDataSource<GetAssetListHirePurchaseResponse>;
  accountAssetsData: GetAssetListHirePurchaseResponse[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('fullSetAccPaginator') fullSetAccPaginator: MatPaginator;
  @ViewChild('accAssetPaginator') accAssetPaginator: MatPaginator;

  disabledEdit: boolean = false;

  constructor(private api: ApiService, private dialog: MatDialog, private route: ActivatedRoute, private snackBar: MatSnackBar, private auth: AuthService) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get("id");
    this.getFullSetAccounts();
    this.getAssetListHirePurchase();
    this.disabledEditBasedOnRole();
  }

  getFullSetAccounts() {
    this.api.getFullSetAccounts(this.clientId).subscribe(
      fullSetAccountsData => {
        console.log("SUCCESS: Full Set Accounts Details -> ", fullSetAccountsData);
        this.fullSetAccountsDataSource = new MatTableDataSource(fullSetAccountsData);
        this.fullSetAccountsDataSource.sort = this.sort;
        this.fullSetAccountsDataSource.paginator = this.fullSetAccPaginator;
      },
      err => {
        console.log("FAILED: Full Set Accounts Details -> ", err);
      }
    );
  }

  getAssetListHirePurchase() {
    this.api.getAssetListHirePurchases(this.clientId).subscribe(
      accountAssetsData => {
        console.log("SUCCESS: Asset Listing & Hire Purchases Details -> ", accountAssetsData);
        this.accountAssetsDataSource = new MatTableDataSource(accountAssetsData);
        this.accountAssetsDataSource.sort = this.sort;
        this.accountAssetsDataSource.paginator = this.accAssetPaginator;
      },
      err => {
        console.log("FAILED: Asset Listing & Hire Purchases Details -> ", err);
      }
    );
  }

  onAddFullSetAccClicked() {
    const dialogRef = this.dialog.open(ManageFullSetAccDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        type: "Add",
        id: this.clientId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add full set account dialog was closed");
      this.getFullSetAccounts();
    });
  }

  onAddAssetHirePurchaseClicked() {
    const dialogRef = this.dialog.open(ManageAccountListAssetsDialogComponent, {
      width: "400px",
      data: {
        id: this.clientId,
        type: "Add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add asset hire purchase dialog was closed");
      this.getAssetListHirePurchase();
    });
  }

  onEditFullSetAccClicked(element: UpdateFullSetAccountRequest) {
    const dialogRef = this.dialog.open(ManageFullSetAccDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        id: this.clientId,
        type: "Update",
        element: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edit full set account dialog was closed");
      this.getFullSetAccounts();
    });
  }

  onEditAssetHirePurchaseClicked(element: GetAssetListHirePurchaseResponse) {
    const dialogRef = this.dialog.open(ManageAccountListAssetsDialogComponent, {
      width: "400px",
      data: {
        id: this.clientId,
        type: "Update",
        element: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edit asset hire purchase dialog was closed");
      this.getAssetListHirePurchase();
    });
  }

  onDeleteFullSetAccClicked(id: string) {
    this.api.deleteFullSetAccount(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete full set account -> ", res);
        this.successSnackBar(res);
        // this.openSuccessDialog(res.message);
      },
      err => {
        console.log("FAILED: Delete full set account -> ", err);
        this.getAssetListHirePurchase();
      });
  }

  onDeleteAssetHirePurchaseClicked(id: string) {
    this.api.deleteAssetListHirePurchase(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete  Asset Hire Purchase -> ", res);
        this.successSnackBar(res);
        // this.openSuccessDialog(res.message);
      },
      err => {
        console.log("FAILED: Delete  Asset Hire Purchase -> ", err);
        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.openErrorDialog(response);
      }
    );
  }

  openSuccessDialog(value: any) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { msg: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Success dialog was closed');
      this.getFullSetAccounts();
      this.getAssetListHirePurchase();
    });
  }

  successSnackBar(message) {
    this.getFullSetAccounts();
    this.getAssetListHirePurchase();
    let snackBarRef = this.snackBar.open(message.message, 'DISMISS', {
      duration: 4000
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

  openErrorDialog(response: ErrorResponse) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { code: response.code, msg: response.message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Error dialog was closed');
      this.getFullSetAccounts();
      this.getAssetListHirePurchase();
    });
  }

  disabledEditBasedOnRole(){
    let role = this.auth.getRole();

    if(role != "mgmt-ceo" && role != "sec-hod" && role != "sec-staff" && role != "acc-hod")
      this.disabledEdit = true;
  }

}

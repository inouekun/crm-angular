import { GetClientResponse } from 'src/app/services/api/dto/clients';
import { ClientDataService } from 'src/app/services/data/client-data.service';
import { GetAssetListCommitmentsResponse, UpdateAssetListCommitmentsRequest } from './../../../../services/api/dto/clients';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ManageAssetListCommitmentsComponent } from 'src/app/pages/dialog/client-details/manage-asset-list-commitments/manage-asset-list-commitments.component';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { SuccessDialogComponent } from 'src/app/pages/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';
import { EditTaxDetailsDialogComponent } from 'src/app/pages/dialog/client-details/edit-tax-details-dialog/edit-tax-details-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  @Input() clientId: string;

  clientDetailsData: GetClientResponse;

  displayedTaxAssetColumns: string[] = ['taxAssetTitle', 'taxAssetValue', 'taxAssetAction'];
  taxAssetsDataSource: MatTableDataSource<GetAssetListCommitmentsResponse>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  disabledEdit: boolean = false;

  constructor(private api: ApiService, private dialog: MatDialog, private route: ActivatedRoute, private clientData: ClientDataService, private snackBar: MatSnackBar, private auth: AuthService) { }

  ngOnInit() {
    this.getClientData();
    this.getAssetListCommitments();
    this.disabledEditBasedOnRole();
  }

  getClientData() {
    this.clientData.currentClientData.subscribe(
      res => {
        console.log("Client Details in Tax -> ", res);
        this.clientDetailsData = res;
      }
    );
  }

  refreshClientData() {
    this.api.getClient(this.clientId).subscribe(res => {
      console.log("SUCCESS: Refresh client data -> ", res);
      this.clientDetailsData = res;
    }, err => {
      console.log("FAILED: Refresh client data -> ", err);
    });
  }

  getAssetListCommitments() {
    this.api.getAssetListCommitments(this.clientId).subscribe(
      assetList => {
        console.log("SUCCESS: Asset List Commitments Details -> ", assetList);
        this.taxAssetsDataSource = new MatTableDataSource(assetList);
        this.taxAssetsDataSource.sort = this.sort;
        this.taxAssetsDataSource.paginator = this.paginator;
      },
      err => {
        console.log("FAILED: Asset List Commitments Details -> ", err);
      }
    );
  }

  onAddAssetListCommitmentsClicked() {
    const dialogRef = this.dialog.open(ManageAssetListCommitmentsComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        id: this.clientId,
        type: "Add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add asset list commitments dialog was closed");
      this.getAssetListCommitments();
    });
  }

  onUpdateAssetListCommitmentsClicked(element: UpdateAssetListCommitmentsRequest) {
    const dialogRef = this.dialog.open(ManageAssetListCommitmentsComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        id: this.clientId,
        type: "Update",
        element: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edit asset list commitments dialog was closed");
      this.getAssetListCommitments();
    });
  }

  onDeleteAssetListCommitmentsClicked(id: string) {
    this.api.deleteAssetListCommitments(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete asset list commitments -> ", res);
        // this.openSuccessDialog(res.message);
        this.successSnackBar(res);
      },
      err => {
        console.log("FAILED: Delete asset list commitments -> ", err);
        this.getAssetListCommitments();
      });
  }

  openSuccessDialog(value: any) {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { msg: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Success dialog was closed');
      this.getAssetListCommitments();
    });
  }

  successSnackBar(message) {
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
      this.getAssetListCommitments();
    });
  }

  onUpdateTaxDetailsClicked() {
    const dialogRef = this.dialog.open(EditTaxDetailsDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: { clientData: this.clientDetailsData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Update audit details dialog was closed");
      this.getClientData();
      this.refreshClientData();
    });
  }

  disabledEditBasedOnRole(){
    let role = this.auth.getRole();

    if(role != "mgmt-ceo" && role != "sec-hod" && role != "sec-staff" && role != "tax-hod" && role != "tax-senior")
      this.disabledEdit = true;
  }

}

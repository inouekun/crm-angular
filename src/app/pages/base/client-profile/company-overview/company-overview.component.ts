import { EditCompanyDetailsDialogComponent } from './../../../dialog/client-details/edit-company-details-dialog/edit-company-details-dialog.component';
import { ManageBranchDialogComponent } from './../../../dialog/client-details/manage-branch-dialog/manage-branch-dialog.component';
import { GetBranchesResponse, GetShareholderResponse } from './../../../../services/api/dto/clients';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { GetClientResponse, GetServiceResponse } from 'src/app/services/api/dto/clients';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { ClientDataService } from 'src/app/services/data/client-data.service';
import { ManageServiceDialogComponent } from 'src/app/pages/dialog/client-details/manage-service-dialog/manage-service-dialog.component';
import { SuccessDialogComponent } from 'src/app/pages/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

  clientDetailsData: GetClientResponse;

  clientId: string;

  displayedBranchColumns: string[] = ['branchName', 'branchAddress', 'branchAction'];
  branchesDataSource: MatTableDataSource<GetBranchesResponse>;

  displayedServiceColumns: string[] = ['serviceName', 'serviceAction'];
  serviceDataSource: MatTableDataSource<GetServiceResponse>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private snackBar: MatSnackBar, private api: ApiService, private route: ActivatedRoute, private dialog: MatDialog, private clientData: ClientDataService) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get("id");
    this.getClient();
    this.getServices();
    this.getBranches();
  }

  getClient() {
    this.clientData.currentClientData.subscribe(
      res => {
        console.log(res);
        this.clientDetailsData = res;
      }
    );
  }

  getAllClient() {
    this.api.getClient(this.clientId).subscribe(res => {
      console.log("SUCCESS: Client Details -> ", res);
      this.clientDetailsData = res;
    }, err => {
      console.log("FAILED: Client Details -> ", err);
    });
  }

  getServices() {
    this.api.getServicesSubscription(this.clientId).subscribe(
      res => {
        console.log("SUCCESS: Service subscription -> ", res);
        this.serviceDataSource = new MatTableDataSource(res);
        this.serviceDataSource.sort = this.sort;
        this.serviceDataSource.paginator = this.paginator;
      },
      err => {
        console.log("FAILED: Service subscription -> ", err);
      }
    );
  }

  getBranches() {
    this.api.getBranches(this.clientId).subscribe(
      res => {
        console.log("SUCCESS: Branches -> ", res);
        this.branchesDataSource = new MatTableDataSource(res);
        this.branchesDataSource.sort = this.sort;
        this.branchesDataSource.paginator = this.paginator;

      }, err => {
        console.log("ERROR: Branches -> ", err);
      }
    )
  }

  onAddBranchClicked() {
    const dialogRef = this.dialog.open(ManageBranchDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        type: "Add",
        id: this.clientId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Add branch dialog was closed");
      this.getBranches();
    });
  }

  onEditBranchClicked(element: GetShareholderResponse) {
    const dialogRef = this.dialog.open(ManageBranchDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        type: "Edit",
        id: this.clientId,
        element: element
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Add branch dialog was closed");
      this.getBranches();
    });
  }

  onDeleteBranchClicked(id: string) {
    this.api.deleteBranches(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete branch -> ", res);
        this.successSnackBar(res);
        // this.openSuccessDialog(res.message);
      },
      err => {
        console.log("FAILED: Delete branch -> ", err);
        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };
        this.openErrorDialog(response);
      }
    );
  }

  onAddServiceClicked() {
    const dialogRef = this.dialog.open(ManageServiceDialogComponent, {
      minWidth: '350px',
      width: '400px',
      data: { id: this.clientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Add service dialog was closed');
      this.getServices();
      window.location.reload();
    });
  }

  onDeleteServiceClicked(id: string) {
    this.api.deleteServiceSubscription(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete service -> ", res);
        this.successSnackBar(res);
        // this.openSuccessDialog(res.message);
        this.getServices();
        window.location.reload();
      },
      err => {
        console.log("FAILED: Delete service -> ", err);
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
      this.getServices();
      this.getBranches();
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
      console.log('Register user dialog was closed');
      this.getServices();
      this.getBranches();
    });
  }

  onUpdateCompanyDetailsClicked() {
    const dialogRef = this.dialog.open(EditCompanyDetailsDialogComponent, {
      width: '600px',
      data: { clientData: this.clientDetailsData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Update Company Details dialog was closed');
      this.getAllClient();
    });
  }


}

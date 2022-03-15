import { GetClientResponse } from 'src/app/services/api/dto/clients';
import { ClientDataService } from './../../../../services/data/client-data.service';
import { GetResolutionsResponse, EditResolutionRequest } from "./../../../../services/api/dto/clients";
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatSnackBar } from "@angular/material";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ApiService } from "src/app/services/api/api.service";
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { ManageResolutionDialogComponent } from 'src/app/pages/dialog/client-details/manage-resolution-dialog/manage-resolution-dialog.component';
import { SuccessDialogComponent } from 'src/app/pages/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';
import { EditResolutionRemarkDialogComponent } from 'src/app/pages/dialog/client-details/edit-resolution-remark-dialog/edit-resolution-remark-dialog.component';

@Component({
  selector: "app-resolutions",
  templateUrl: "./resolutions.component.html",
  styleUrls: ["./resolutions.component.scss"]
})
export class ResolutionsComponent implements OnInit {

  displayedResolutionColumns: string[] = ["resolutionTitle", "resolutionDate", "resolutionAction"];
  resolutionsDataSource: MatTableDataSource<GetResolutionsResponse>;

  clientDetailsData: GetClientResponse;

  @Input() clientId: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, private dialog: MatDialog, private clientData: ClientDataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getClientData();
    this.getResolutions();
  }

  getClientData() {
    this.clientData.currentClientData.subscribe(
      res => {
        console.log("Client Details in Resolutions -> ", res);
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

  getResolutions() {
    this.api.getResolutions(this.clientId).subscribe(res => {
      console.log("SUCCESS: Resolutions Details -> ", res);

      this.resolutionsDataSource = new MatTableDataSource(res);
      this.resolutionsDataSource.sort = this.sort;
      this.resolutionsDataSource.paginator = this.paginator;
    }, err => {
      console.log("FAILED: Resolutions Details -> ", err);
    });
  }

  onAddResClicked() {
    const dialogRef = this.dialog.open(ManageResolutionDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        type: "Add",
        id: this.clientId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add resolution dialog was closed");
      this.getResolutions();
    });
  }

  onEditResClicked(element: EditResolutionRequest) {
    const dialogRef = this.dialog.open(ManageResolutionDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        id: this.clientId,
        type: "Update",
        element: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edit resolution dialog was closed");
      this.getResolutions();
    });
  }

  onDeleteResClicked(id: string) {
    this.api.deleteResolution(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete resolution -> ", res);
        // this.openSuccessDialog(res.message);
        this.successSnackBar(res);
      },
      err => {
        console.log("FAILED: Delete resolution -> ", err);
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
      this.getResolutions();
    });
  }

  successSnackBar(message) {
    this.getResolutions();
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
      this.getResolutions();
    });
  }

  onUpdateRemarkClicked() {
    const dialogRef = this.dialog.open(EditResolutionRemarkDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: { clientData: this.clientDetailsData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Update remark dialog was closed");
      this.getClientData();
      this.refreshClientData();
    });
  }

}

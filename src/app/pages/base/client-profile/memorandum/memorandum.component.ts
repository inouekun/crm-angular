import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';
import { ErrorResponse } from './../../../../services/api/dto/error';
import { MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { GetClientResponse, GetMemorandumsResponse } from './../../../../services/api/dto/clients';
import { ClientDataService } from 'src/app/services/data/client-data.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EditNatureBusinessDialogComponent } from 'src/app/pages/dialog/client-details/edit-nature-business-dialog/edit-nature-business-dialog.component';
import { ApiService } from 'src/app/services/api/api.service';
import { ManageMemorandumDialogComponent } from 'src/app/pages/dialog/client-details/manage-memorandum-dialog/manage-memorandum-dialog.component';

@Component({
  selector: 'app-memorandum',
  templateUrl: './memorandum.component.html',
  styleUrls: ['./memorandum.component.scss']
})
export class MemorandumComponent implements OnInit {

  @Input() clientId;

  clientDetailsData: GetClientResponse;
  loading: boolean = false;

  displayedMemorandumColumns: string[] = ['memorandumName', 'memorandumDate', 'memorandumAction'];
  memorandumsDataSource: MatTableDataSource<GetMemorandumsResponse>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientData: ClientDataService, private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getClientData();
    this.getMemorandums();
  }

  getClientData() {
    this.clientData.currentClientData.subscribe(
      res => {
        console.log("Client Details in Nature of Business & Memorandum -> ", res);
        this.clientDetailsData = res;
      }
    );
  }

  getMemorandums() {
    this.loading = true;
    this.api.getMemorandums(this.clientId).subscribe(res => {
      this.loading = false;
      console.log("SUCCESS: Memorandums Details -> ", res);

      this.memorandumsDataSource = new MatTableDataSource(res);
      this.memorandumsDataSource.sort = this.sort;
      this.memorandumsDataSource.paginator = this.paginator;
    }, err => {
      this.loading = false;
      console.log("FAILED: Memorandums Details -> ", err);
    });
  }

  refreshClientData() {
    this.api.getClient(this.clientId).subscribe(res => {
      console.log("SUCCESS: Refresh client data -> ", res);
      this.clientDetailsData = res;
    }, err => {
      console.log("FAILED: Refresh client data -> ", err);
    });
  }

  onUpdateNatureBizClicked() {
    const dialogRef = this.dialog.open(EditNatureBusinessDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: { clientData: this.clientDetailsData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Update nature of business dialog was closed");
      this.getClientData();
      this.refreshClientData();
      this.getMemorandums();
    });
  }

  onAddMemorandumClicked() {
    const dialogRef = this.dialog.open(ManageMemorandumDialogComponent, {
      width: '400px',
      data: {
        id: this.clientId,
        type: "Add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add memorandum dialog was closed");
      this.getClientData();
      this.refreshClientData();
      this.getMemorandums();
    });
  }

  onDeleteMemorandumsClicked(id: string) {
    this.api.deleteMemorandum(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete shareholder -> ", res);
        // this.openSuccessDialog(res.message);
        this.successSnackBar(res);
      },
      err => {
        console.log("FAILED: Delete shareholder -> ", err);
        let response: ErrorResponse = {
          code: err.error.error.code,
          message: err.error.error.message
        };

        this.openErrorDialog(response);
      }
    );
  }

  successSnackBar(message) {
    this.getMemorandums();
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
      this.getMemorandums();
    });
  }

}

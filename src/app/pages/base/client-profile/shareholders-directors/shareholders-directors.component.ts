import { MatPaginator, MatDialog, MatSnackBar } from "@angular/material";
import { MatSort } from "@angular/material";
import { ApiService } from "./../../../../services/api/api.service";
import { GetDirectorsResponse, GetShareholderResponse, EditDirectorRequest } from "./../../../../services/api/dto/clients";
import { MatTableDataSource } from "@angular/material";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { ManageDirectorDialogComponent } from 'src/app/pages/dialog/client-details/manage-director-dialog/manage-director-dialog.component';
import { ManageShareholderDialogComponent } from 'src/app/pages/dialog/client-details/manage-shareholder-dialog/manage-shareholder-dialog.component';
import { SuccessDialogComponent } from 'src/app/pages/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';

@Component({
  selector: "app-shareholders-directors",
  templateUrl: "./shareholders-directors.component.html",
  styleUrls: ["./shareholders-directors.component.scss"]
})
export class ShareholdersDirectorsComponent implements OnInit {

  @Input() clientId: string;

  displayedShareholderColumns: string[] = ["shareholderName", "shareholderValue", "shareholderAction"];
  shareholdersDataSource: MatTableDataSource<GetShareholderResponse>;

  displayedDirectorsColumns: string[] = ["directorName", "directorAction"];
  directorsDataSource: MatTableDataSource<GetDirectorsResponse>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('directorPaginator') directorPaginator: MatPaginator;
  @ViewChild(MatSort) shareholderSort: MatSort;
  @ViewChild('shareholderPaginator') shareholderPaginator: MatPaginator;


  constructor(private api: ApiService, private dialog: MatDialog, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get("id");
    this.getShareholders();
    this.getDirectors();
  }

  getShareholders() {
    this.api.getShareholders(this.clientId).subscribe(shareholdersList => {
      console.log("SUCCESS: Shareholders Details -> ", shareholdersList);

      this.shareholdersDataSource = new MatTableDataSource(shareholdersList);
      this.shareholdersDataSource.sort = this.shareholderSort;
      this.shareholdersDataSource.paginator = this.shareholderPaginator;
    }, err => {
      console.log("FAILED: Shareholders Details -> ", err);
    });
  }

  getDirectors() {
    this.api.getDirectors(this.clientId).subscribe(directorsList => {
      console.log("SUCCESS: Directors Details -> ", directorsList);

      this.directorsDataSource = new MatTableDataSource(directorsList);
      this.directorsDataSource.sort = this.sort;
      this.directorsDataSource.paginator = this.directorPaginator;
    }, err => {
      console.log("FAILED: Directors Details -> ", err);
    });
  }

  onAddShareholderClicked() {
    const dialogRef = this.dialog.open(ManageShareholderDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        type: "Add",
        id: this.clientId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add shareholder dialog was closed");
      this.getShareholders();
    });
  }

  onAddDirectorClicked() {
    const dialogRef = this.dialog.open(ManageDirectorDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        type: "Add",
        id: this.clientId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add director dialog was closed");
      this.getDirectors();
    });
  }

  onEditShareholderClicked(element: GetShareholderResponse) {
    const dialogRef = this.dialog.open(ManageShareholderDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        id: this.clientId,
        type: "Update",
        element: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edit shareholder dialog was closed");
      this.getShareholders();
    });
  }

  onEditDirectorClicked(element: EditDirectorRequest) {
    const dialogRef = this.dialog.open(ManageDirectorDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        type: "Update",
        id: this.clientId,
        element: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edit director dialog was closed");
      this.getDirectors();
    });
  }

  onDeleteShareholderClicked(id: string) {
    this.api.deleteShareholder(this.clientId, id).subscribe(
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

  onDeleteDirectorClicked(id: string) {
    this.api.deleteDirector(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete director -> ", res);
        // this.openSuccessDialog(res.message);
        this.successSnackBar(res);
      },
      err => {
        console.log("FAILED: Delete director -> ", err);
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
      this.getShareholders();
      this.getDirectors();
    });
  }

  successSnackBar(message) {
    this.getShareholders();
    this.getDirectors();
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
      this.getShareholders();
      this.getDirectors();
    });
  }
}

import { Input } from '@angular/core';
import { EditLodgementRequest, GetLodgementResponse } from './../../../../services/api/dto/clients';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { ManageLodgementDialogComponent } from 'src/app/pages/dialog/client-details/manage-lodgement-dialog/manage-lodgement-dialog.component';
import { SuccessDialogComponent } from 'src/app/pages/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-lodgement',
  templateUrl: './lodgement.component.html',
  styleUrls: ['./lodgement.component.scss']
})
export class LodgementComponent implements OnInit {

  displayedLodgementYearColumns: string[] = ['lodgementYearEndDate', 'lodgementFinancialYearEndDate', 'lodgementYearAnnualReturnDate', 'lodgementAction'];
  lodgementYearsDataSource: MatTableDataSource<GetLodgementResponse>;

  @Input() clientId: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, private dialog: MatDialog, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get("id");
    this.getLodgementYears();
  }

  getLodgementYears() {
    this.api.getLodgmentYears(this.clientId).subscribe(res => {
      console.log("SUCCESS: Lodgement Years Details -> ", res);

      this.lodgementYearsDataSource = new MatTableDataSource(res);
      this.lodgementYearsDataSource.sort = this.sort;
      this.lodgementYearsDataSource.paginator = this.paginator;
    }, err => {
      console.log("FAILED: Lodgement Years Details -> ", err);
    });
  }

  onAddLodgementClicked() {
    const dialogRef = this.dialog.open(ManageLodgementDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        type: "Add",
        id: this.clientId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add lodgement dialog was closed");
      this.getLodgementYears();
    });
  }

  onEditLodgementClicked(element: EditLodgementRequest) {
    const dialogRef = this.dialog.open(ManageLodgementDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: {
        id: this.clientId,
        type: "Update",
        element: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Edit lodgement dialog was closed");
      this.getLodgementYears();
    });
  }

  onDeleteLodgementClicked(id: string) {
    this.api.deleteLodgementYears(this.clientId, id).subscribe(
      res => {
        console.log("SUCCESS: Delete lodgement -> ", res);
        // this.openSuccessDialog(res.message);
        this.successSnackBar(res);
      },
      err => {
        console.log("FAILED: Delete lodgement -> ", err);
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
      this.getLodgementYears();
    });
  }

  successSnackBar(message) {
    this.getLodgementYears();
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
      this.getLodgementYears();
    });
  }

}

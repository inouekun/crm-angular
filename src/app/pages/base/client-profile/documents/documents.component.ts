import { ManageDocumentsDialogComponent } from './../../../dialog/client-details/manage-documents-dialog/manage-documents-dialog.component';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { GetFullSetDocumentsResponse } from './../../../../services/api/dto/clients';
import { MatTableDataSource } from '@angular/material';
import { ApiService } from './../../../../services/api/api.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SuccessDialogComponent } from 'src/app/pages/dialog/success-dialog/success-dialog.component';
import { RegisterClientDialogComponent } from 'src/app/pages/dialog/register-client-dialog/register-client-dialog.component';
import { ErrorDialogComponent } from 'src/app/pages/dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  @Input() clientId: string;

  documentType: string;

  displayedFullSetDocumentColumns: string[] = ['fullSetDocumentName', 'fullSetDocumentDate', 'fullSetDocumentAction'];
  fullSetDocumentsDataSource: MatTableDataSource<GetFullSetDocumentsResponse>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getFullSetDocuments();
  }

  getFullSetDocuments() {
    this.api.getFullSetDocuments(this.clientId).subscribe(
      fullSetDocumentsData => {
        console.log("SUCCESS: Full set documents -> ", fullSetDocumentsData);
        this.fullSetDocumentsDataSource = new MatTableDataSource(fullSetDocumentsData);
        this.fullSetDocumentsDataSource.sort = this.sort;
        this.fullSetDocumentsDataSource.paginator = this.paginator;
      },
      err => {
        console.log("FAILED: Full set documents -> ", err);
      }
    );
  }

  onAddDocumentsClicked() {
    const dialogRef = this.dialog.open(ManageDocumentsDialogComponent, {
      width: '400px',
      data: {
        id: this.clientId,
        type: "Add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Add document dialog was closed");
      this.getFullSetDocuments();
    });
  }

  // onEditDocumentsClicked(element: GetFullSetDocumentsResponse) {
  //   const dialogRef = this.dialog.open(ManageDocumentsDialogComponent, {
  //     width: '400px',
  //     data: {
  //       id: this.clientId,
  //       type: "Edit",
  //       element: { element }
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("Edit document dialog was closed");
  //     this.getFullSetDocuments();
  //   });
  // }

  onDeleteDocumentsClicked(id: string) {
    this.api.deleteFullSetDocument(this.clientId, id).subscribe(
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

  onViewDocumentsClicked(element) {
    this.api.getFullSetDocumentMedia(this.clientId, element.id).subscribe(
      res => {
        console.log("SUCCESS: View documents -> ", res);

        const linkSource = res.data;
        const downloadLink = document.createElement("a");
        const fileName = res.fileName;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

      }, err => {
        console.log("ERROR: View documents -> ", err);
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
      this.getFullSetDocuments();
    });
  }

  successSnackBar(message) {
    this.getFullSetDocuments();
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
      this.getFullSetDocuments();
    });
  }


}

import { GetClientsRequest, GetClientsResponse, Client } from './../../../services/api/dto/clients';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/services/api/api.service';
import { ErrorResponse } from 'src/app/services/api/dto/error';
import { RegisterClientDialogComponent } from '../../dialog/register-client-dialog/register-client-dialog.component';
import { SuccessDialogComponent } from '../../dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialog/error-dialog/error-dialog.component';
import { DeleteConfirmDialogComponent } from '../../dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import { ReminderDialogComponent } from '../../dialog/reminder-dialog/reminder-dialog.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  routes: object[] = [{
    name: 'List of Clients',
    breadcrumb: 'Home / Client Lists'
  }];

  loading: boolean = false;

  reminder: number = 2;
  reminderTooltip = ['1st Reminder', '2nd Reminder', '3rd Reminder', 'Penalty'];

  displayedColumns: string[] = ['name', 'type', 'email', 'action'];
  dataSource: MatTableDataSource<Client>;
  pageSizeOption = [3, 5, 10];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  getClientsResponse: GetClientsResponse = {
    totalCount: 0,
    pageIndex: 0,
    totalPage: 0,
    clients: [{
      id: "",
      businessType: "",
      contactNo: "",
      contactPerson: "",
      email: "",
      name: ""
    }]
  };

  getClientsRequest: GetClientsRequest = {
    filter: "",
    sortOrder: "asc",
    pageIndex: 0,
    pageSize: 3
  };

  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAllClients(this.getClientsRequest);
  }

  onSort(event) {
    console.log("Sort Event -> ", event);
    let sort = event.direction;
    let size = this.getClientsRequest.pageSize;
    let index = this.getClientsRequest.pageIndex;
    let filter = this.getClientsRequest.filter;
    this.refreshGetAllClients(size, index, sort, filter);
  }

  onPaginate(event) {
    console.log("Pagination Event -> ", event);
    let sort = this.getClientsRequest.sortOrder;
    let size = event.pageSize;
    let index = event.pageIndex;
    let filter = this.getClientsRequest.filter;
    this.refreshGetAllClients(size, index, sort, filter);
  }

  onFilter(event) {
    console.log("Filtering Event -> ", event);
    let sort = this.getClientsRequest.sortOrder;
    let size = this.getClientsRequest.pageSize;
    let index = this.getClientsRequest.pageIndex;
    let filter = event;
    this.refreshGetAllClients(size, index, sort, filter);
  }

  onRefresh() {
    console.log("Refresh client list");
    let sort = this.getClientsRequest.sortOrder;
    let size = this.getClientsRequest.pageSize;
    let index = this.getClientsRequest.pageIndex;
    let filter = this.getClientsRequest.filter;
    this.refreshGetAllClients(size, index, sort, filter);
  }

  refreshGetAllClients(size, index, sort, filter) {
    this.loading = true;
    this.getClientsRequest.pageSize = size;
    this.getClientsRequest.pageIndex = index;
    this.getClientsRequest.sortOrder = sort;
    this.getClientsRequest.filter = filter;
    this.api.getClients(this.getClientsRequest).subscribe(
      res => {
        this.loading = false;
        console.log("SUCCESS: Refresh clients -> ", res);
        this.dataSource = new MatTableDataSource(res.clients);
      },
      err => {
        this.loading = false;
        console.log("FAILED: Refresh clients -> ", err);
      }
    );
  }

  getAllClients(client) {
    this.loading = true;
    this.api.getClients(client).subscribe(
      res => {
        this.loading = false;
        console.log("SUCCESS: Get clients -> ", res);
        this.getClientsResponse = res;
        this.dataSource = new MatTableDataSource(this.getClientsResponse.clients);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        this.loading = false;
        console.log("FAILED: Get clients -> ", err);
      }
    );
  }

  onAddClientClicked() {
    const dialogRef = this.dialog.open(RegisterClientDialogComponent, {
      minWidth: '600px',
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Register client dialog was closed');
      this.onRefresh();
    });
  }

  onDeleteBtnClicked(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { clientId: id, msg: 'Are you sure to delete this client?', remark: 'deleteClient' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete confirm dialog was closed');
      this.onRefresh();
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
      this.onRefresh();
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
      this.onRefresh();
    });
  }

  viewClient(id) {
    this.router.navigateByUrl('client/' + id);
  }

  onDocumentTrack(id) {
    console.log("ACTION: Open document tracking");
  }

  onReminder(id) {
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      minWidth: "450px",
      width: "500px",
      data: { reminder: "1st reminder" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Reminder dialog was closed');
      this.onRefresh();
    });
  }

}

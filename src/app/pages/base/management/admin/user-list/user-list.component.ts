import { GetUserResponse } from './../../../../../services/api/dto/users';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/services/api/api.service';
import { EditUserDialogComponent } from 'src/app/pages/dialog/edit-user-dialog/edit-user-dialog.component';
import { RouteInfo, Routes } from 'src/app/constants/routes';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private _paginator: MatPaginator;

  loading: boolean = false;

  dataSource: MatTableDataSource<GetUserResponse>;
  displayedColumns: string[] = ['position', 'staffId', 'name', 'email', 'designation', 'action'];

  routes: RouteInfo[] = [];

  @ViewChild(MatPaginator)
  get paginator(): MatPaginator {
    return this._paginator;
  }

  set paginator(val: MatPaginator) {
    this._paginator = val;
    this.paginateTable();
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.definePageAttrib();
  }

  ngOnInit() {
    this.refreshUserList();
  }

  refreshUserList() {
    this.loading = true;
    this.api.getAllUsers().subscribe(
      users => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.paginateTable();
      }
    )
  }

  definePageAttrib() {
    this.routes = Routes.Admin.filter(
      route => {
        return route.name === 'List of Users';
      }
    );
    console.log("Value from Base Component -> ", this.routes);
  }

  private paginateTable() {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onEditUserClicked(user: GetUserResponse) {
    const editUserDialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { staffId: user.staffId, name: user.name, email: user.email, designation: user.designation, role: user.role }
    });

    editUserDialogRef.afterClosed().subscribe(
      result => {
        this.refreshUserList();
      }
    );
  }

}

import { RouteInfo, Routes } from './../../../constants/routes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

export interface emailClient {
  from:string;
  subject:string;
  reminder:string;
  date: string;
}

const EMAIL_CLIENT: emailClient[] = [
  {from: 'Nur Atiqah', subject: 'SUBMISSION FOR REVIEW - Thundermatch Sdn Bhd', reminder:'N/A', date: '02/04/2019'},
  {from: 'Saniza', subject: 'SUBMISSION FOR REVIEW - Thundermatch Sdn Bhd', reminder:'N/A', date: '03/04/2019'},
  {from: 'Zakaria', subject: 'SUBMISSION FOR REVIEW - Thundermatch Sdn Bhd', reminder:'N/A', date: '04/04/2019'},
  {from: 'Ahmad', subject: 'SUBMISSION FOR REVIEW - Thundermatch Sdn Bhd', reminder:'N/A', date: '05/04/2019'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  routes: RouteInfo[] = [];
  role:string;
  displayedColumns: string[] = ['from', 'subject', 'reminder', 'date'];
  dataSource = new MatTableDataSource(EMAIL_CLIENT);

  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.definePageAttrib();
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.role = localStorage.getItem("role");
  }

  // Check role from Base Component
  definePageAttrib() {
    this.routes = Routes.Admin.filter(
      route => {
        return route.name === 'Dashboard';
      }
    );
    console.log("Value from Base Component -> ", this.routes);
  }

}

import { ClientDataService } from './../../../../services/data/client-data.service';
import { GetClientResponse } from 'src/app/services/api/dto/clients';
import { Component, OnInit, Input } from '@angular/core';
import { EditImportantDateDialogComponent } from 'src/app/pages/dialog/client-details/edit-important-date-dialog/edit-important-date-dialog.component';
import { ApiService } from 'src/app/services/api/api.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-important-date',
  templateUrl: './important-date.component.html',
  styleUrls: ['./important-date.component.scss']
})
export class ImportantDateComponent implements OnInit {

  @Input() clientId;

  clientDetailsData: GetClientResponse;

  constructor(private clientData: ClientDataService, private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getClientData();
  }

  getClientData() {
    this.clientData.currentClientData.subscribe(
      res => {
        console.log("Client Details in Important Date -> ", res);
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

  onUpdateImportantDateClicked() {
    const dialogRef = this.dialog.open(EditImportantDateDialogComponent, {
      minWidth: "500px",
      width: "500px",
      data: { clientData: this.clientDetailsData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Update important date dialog was closed");
      this.getClientData();
      this.refreshClientData();
    });
  }

}

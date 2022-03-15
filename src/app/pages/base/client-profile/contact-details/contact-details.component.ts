import { ClientDataService } from './../../../../services/data/client-data.service';
import { GetClientResponse } from 'src/app/services/api/dto/clients';
import { Component, OnInit, Input } from '@angular/core';
import { EditContactDetailDialogComponent } from 'src/app/pages/dialog/client-details/edit-contact-detail-dialog/edit-contact-detail-dialog.component';
import { MatDialog } from '@angular/material';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  @Input() clientId;

  clientDetailsData: GetClientResponse;

  constructor(private clientData: ClientDataService, private dialog: MatDialog, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get("id");
    this.getClientData();
  }

  getClientData() {
    this.clientData.currentClientData.subscribe(
      res => {
        console.log("Client Data in Contact Details -> ", res);
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

  onUpdateContactDetailsClicked() {
    const dialogRef = this.dialog.open(EditContactDetailDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: { clientData: this.clientDetailsData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Update contact details dialog was closed");
      this.refreshClientData();
    });
  }

}

import { GetClientResponse } from 'src/app/services/api/dto/clients';
import { ClientDataService } from './../../../../services/data/client-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { MatDialog } from '@angular/material';
import { EditAuditDetailsDialogComponent } from 'src/app/pages/dialog/client-details/edit-audit-details-dialog/edit-audit-details-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  @Input() clientId: string;

  clientDetailsData: GetClientResponse;
  disabledEdit:boolean = false;

  constructor(private clientData: ClientDataService, private api: ApiService, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.getClientData();
    this.disabledEditBasedOnRole();
  }

  getClientData() {
    this.clientData.currentClientData.subscribe(
      res => {
        console.log("Client Details in Audit -> ", res);
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

  onUpdateAuditDetailsClicked() {
    const dialogRef = this.dialog.open(EditAuditDetailsDialogComponent, {
      minWidth: "350px",
      width: "400px",
      data: { clientData: this.clientDetailsData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Update audit details dialog was closed");
      this.getClientData();
      this.refreshClientData();
    });
  }

  disabledEditBasedOnRole(){
    let role = this.auth.getRole();

    if(role != "mgmt-ceo" && role != "sec-hod" && role != "sec-staff" && role != "aud-hod")
      this.disabledEdit = true;
  }

}

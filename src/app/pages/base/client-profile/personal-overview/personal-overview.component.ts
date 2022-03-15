import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ClientDataService } from 'src/app/services/data/client-data.service';
import { GetClientResponse } from 'src/app/services/api/dto/clients';
import { EditPersonalDetailsDialogComponent } from 'src/app/pages/dialog/client-details/edit-personal-details-dialog/edit-personal-details-dialog.component';

@Component({
  selector: 'app-personal-overview',
  templateUrl: './personal-overview.component.html',
  styleUrls: ['./personal-overview.component.scss']
})
export class PersonalOverviewComponent implements OnInit {

  clientDetailsData: GetClientResponse;
  clientId: string;

  constructor(private api: ApiService, private route: ActivatedRoute, private dialog: MatDialog, private clientData: ClientDataService) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get("id");
    this.getClient();
  }

  getClient() {
    this.clientData.currentClientData.subscribe(
      res => {
        console.log(res);
        this.clientDetailsData = res;
      }
    );
  }

  refreshCLientData() {
    this.api.getClient(this.clientId).subscribe(res => {
      console.log("SUCCESS: Client Details -> ", res);
      this.clientDetailsData = res;
    }, err => {
      console.log("FAILED: Client Details -> ", err);
    });
  }

  onUpdatePersonalDetailsClicked() {
    const dialogRef = this.dialog.open(EditPersonalDetailsDialogComponent, {
      width: '600px',
      data: { clientData: this.clientDetailsData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Update personal details dialog was closed');
      this.refreshCLientData();
    });
  }

}

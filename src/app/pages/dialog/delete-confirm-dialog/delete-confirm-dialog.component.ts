import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data : any, private api: ApiService, private dialogRef : MatDialogRef<DeleteConfirmDialogComponent>) { }

  ngOnInit() {
  }

  onConfirmBtnClicked(){
    switch (this.data.remark) {
      case 'deleteClient':
        this.api.deleteClient(this.data.clientId).subscribe(
          res => {
            console.log("RESP: Delete client -> ", res);
            this.dialogRef.close();
          },
          err => {
            console.log("FAILED: Delete client -> ", err);
          }
        );
        break;

      default:
        console.log("Remark is not defined.");
        break;
    }


  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ResolveReminderDialogComponent } from '../resolve-reminder-dialog/resolve-reminder-dialog.component';

export interface Comment {
  id: string;
  text: string;
  date: Date;
}

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.scss']
})
export class ReminderDialogComponent implements OnInit {

  reminderFormGroup: FormGroup;
  controls: FormArray;

  commentList: Comment[] = [
    {
      id:'1',
      text: 'This is first comment',
      date: new Date('10 June 2019')
    },
    {
      id:'2',
      text: 'This is second comment',
      date: new Date('11 June 2019')
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ReminderDialogComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reminderFormGroup = this.formBuilder.group({
      comment: ["", Validators.nullValidator]
    });
  }

  addComment(){
    let newComment: Comment = {
      id: (this.commentList.length+1).toString(),
      text: this.reminderFormGroup.value.comment,
      date: new Date
    }

    this.commentList.push(newComment);
    this.reminderFormGroup.reset();
  }

  onDeleteClicked(id: string){
    let comment: Comment;
    this.commentList.forEach(element => {
      if(element.id == id)
        comment = element;
    });
    this.commentList.splice(this.commentList.indexOf(comment), 1);
  }

  onResolveBtnClicked(){
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ResolveReminderDialogComponent, {
      minWidth: "450px",
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Resolve reminder dialog was closed');
    });
  }

}

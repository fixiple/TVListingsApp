import { Component } from '@angular/core';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogTitle,
    MatDialogContent,
    MatDialogRef,
    MatDialogClose} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle, MatDialogClose],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
    //SEE https://material.angular.io/components/dialog/overview
    constructor(public dialog: MatDialogRef<MatDialog>){}

}

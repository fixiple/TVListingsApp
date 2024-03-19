import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { DialogBoxComponent } from './_components/dialog-box/dialog-box.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
constructor(public dialog: MatDialog){}
  title = 'front';
  //READ : https://v6.material.angular.io/components/dialog/overview AND https://itnext.io/angular-and-pure-html-dialogs-da79a37ac1e7 
  // AND https://material.angular.io/components/dialog/overview
  //For backdropclass (change background...) see here: https://stackoverflow.com/a/55110911 AND HERE: https://material.angular.io/components/dialog/api#MatDialogConfig
  //used to open and close Modal Dialog windows
  openModalView(){
        this.dialog.open(DialogBoxComponent, {
            width: '250px',
          data: {
            animal: 'panda',
          },
          backdropClass: 'backdropBackground'
        });
    }
}


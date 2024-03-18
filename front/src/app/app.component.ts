import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
  //READ : https://v6.material.angular.io/components/dialog/overview AND https://itnext.io/angular-and-pure-html-dialogs-da79a37ac1e7
  //used to open and close Modal Dialog windows
  openModalView(){
    console.log("Dialog box opened")
  }

}

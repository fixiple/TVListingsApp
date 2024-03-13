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
  //READ : https://v6.material.angular.io/components/dialog/overview
  //used to open and close Modal Dialog windows
  openModalView(){
//element[i].nativeElement.Children[1].offsetWidth
    console.log("Dialog box opened")
  }

}

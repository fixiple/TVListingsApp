import { Component } from '@angular/core';
import API  from '../service/API.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
    response: any;
    constructor(private API: API) {}
    ngOnInit() {
        this.response=this.API.get("The Apothecary Diary")
        // console.log(this.response.toString())
    }
}

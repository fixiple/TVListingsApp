import { Component } from '@angular/core';
import API from '../service/API.service';
import { CommonModule} from '@angular/common';
import { map} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [API],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
    
    /**
     * The response variable after making the API request.
     * It contains the data of the API request, allowing interactivity with the API in the front-end.
     * ex: getting the name of a TV Show or anime: {{response.name}}
    **/
    response: any;

    // done: boolean = false;
    // /!\ we need to declare the list variables (= []) so that we can push data into them
    // titles: string[] = [];
    // ids: number[] = []; 
    // mediaTypes: string[] = [];

    constructor(private API: API,  private router : Router) {
        //this.searchCall("The apothecary")
        
    }

    clickme(cat: string, id: number){
        // console.log(id)
        this.router.navigate(['/details',cat,id]);
    }

    

    searchCall(req: string){

        this.API.searchQuery(req)
        .pipe(
            map((data:any) => {
                //console.log(data.results)
                
                // we fetch the results part of the json and assign it to response variable
                
                this.response=data
            })
        )
        .subscribe(
            (val: any) => {},
            (err: any) => console.error(err),
        )
        
    }
    
}

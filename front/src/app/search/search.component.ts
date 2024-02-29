import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import API from '../_service/API.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  providers: [API],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
    response : any = {};
    query: string = "";
    baseImageURL: string="https://image.tmdb.org/t/p/original";
    fallBackImage: string="assets/img/fallBackImage.svg"

    constructor(private API: API,  private router : Router, private route : ActivatedRoute){}


    ngOnInit(): void {
        //this will check in the sended request for any params in the "q", in queryParams parameter from the parent function (Home) (??) 
        this.route.queryParams
        .subscribe((params: Params) => {
            this.query=params['q']
            this.query.replace("-", " ").trim()
            this.searchCall(this.query)
        });

    }

    toDetailsPage(cat: string, id: number) : void{
        // console.log(id)
        this.router.navigate(['/details',cat,id]);
    }

    toHomePage() : void{
        this.router.navigate(['/']);
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

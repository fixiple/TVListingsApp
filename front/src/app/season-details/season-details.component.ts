import { Component } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule, Location} from '@angular/common';
import { map } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import localStr from '../_service/localStr';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';

@Component({
  selector: 'app-season-details',
  standalone: true,
  imports: [CommonModule, PosterIMGComponent],
  providers: [API, localStr],
  templateUrl: './season-details.component.html',
  styleUrl: './season-details.component.css'
})

export class SeasonDetailsComponent {
    details : any;
    seasonNum: number = 0;
    id: number = 0;
    posterImage= "";
    /**
     * The response variable after making the API request.
     * It contains the data of the API request, allowing interactivity with the API in the front-end.
     * ex: getting the name of a TV Show or anime: {{response.name}}
    **/
    response: any = {};

    constructor(private API : API, private route : ActivatedRoute, private router : Router, private localStr : localStr, private _location: Location){}
    ngOnInit(){
        this.details = this.route.queryParams
        .subscribe((params: Params) => {
            let id = +params['id'];
            let seasonNum = +params['num'];
            console.log(id)
            console.log(seasonNum)


            this.getSeasonDetailsCall(id, seasonNum)
            
        });

         
    }
      ngOnDestroy() {
        this.details.unsubscribe();
    }


    getSeasonDetailsCall(req: number, season_number: number){
        this.API.getDetailsTvSeason(req, season_number)
        .pipe(
            map((data:any) => {
                //console.log(data)
                this.response=data
                this.posterImage='https://image.tmdb.org/t/p/original'+data?.poster_path
            })
        )
        .subscribe(
            (val: any) => {},
            (err: any) => console.error(err),
        )
    }
    

    /**
     * This Method allows the user to go back a page
     * (it's like using the previous page button on any browser ^^)
     */
    backClicked() {
        this._location.back();
    }

}

import { Component } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule, DatePipe, Location} from '@angular/common';
import { map, switchMapTo } from 'rxjs';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import localStr from '../_service/localStr';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';
import SavedI from '../_types/SavedI';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, PosterIMGComponent,RouterOutlet],
  providers: [API, localStr],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
    Objects: any[] = this.localStr.getDataObject("Saved") || [];
    details : any;
    id : number = 0;
    media_type : string = "";
    existsLS: boolean = false;
    nextEpisodeImage="";
    pastEpisodeAirDate="";
    posterImage='';
    seasons: any=[]

    /**
     * The response variable after making the API request.
     * It contains the data of the API request, allowing interactivity with the API in the front-end.
     * ex: getting the name of a TV Show or anime: {{response.name}}
    **/
    response: any = {};

    constructor(private API : API, private route : ActivatedRoute, private router : Router, private localStr : localStr, private _location: Location, public datePipe: DatePipe){}
    ngOnInit(){
        this.posterImage
        const currentDate = this.datePipe.transform(new Date(), 'dd/MM/YYYY')!;
        
        this.details = this.route.params.subscribe((params: any) => {
            this.media_type = params['cat'];
            this.id = +params['id']; //+ transforms string into integer/number, see: https://stackoverflow.com/a/41969665
            
            
            this.AlreadyInLS();
            // console.log(media_type)
            // console.log(id); 
            // this will be called every time route changes
            // so you can perform your functionality here
            if (!this.existsLS) 
            {
                this.getDetailsCall(this.id, this.media_type)
            } else {
                this.updateLS();
            }
            // console.log(this.existsLS)
        });

         
    }
      ngOnDestroy() {
        this.details.unsubscribe();
    }


    getDetailsCall(req: number, media_type: string){
        if (media_type=="tv"){
            this.API.getDetailsTv(req)
            .pipe(
                map((data:any) => {
                    //console.log(data)
                    this.response=data
                    this.nextEpisodeImage=data.next_episode_to_air?.still_path!=null ? "https://image.tmdb.org/t/p/original"+data.next_episode_to_air?.still_path : "assets/img/fallbackIMG.svg"  
                    this.posterImage="https://image.tmdb.org/t/p/original"+data.poster_path
                    this.seasons=data.seasons
                    //console.log(this.seasons)
                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        } else {
            this.API.getDetailsMovies(req)
            .pipe(
                map((data:any) => {
                    console.log(data)
                    this.response=data
                    this.posterImage="https://image.tmdb.org/t/p/original"+data.poster_path
                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        }
    }

    /**
     * This Method allows the user to go back a page
     * (it's like using the previous page button on any browser ^^)
    **/
    backClicked() {
        this._location.back();
    }


    /**
     * This Method allows the user to go to the corresponding seasonPage
     * @param {number} seaN - Season Number of the tv series (Number 0 = special episodes/fillers, n+0=canon season)
    **/
    toSeasonDetailsPage(seaN: number) : void{
        // console.log(id)
        this.router.navigate(['season'],             
        {
            queryParams: {"id" : this.id, "num" : seaN}, 
            queryParamsHandling: 'merge'
        })
    }

    /**
     * This method saves the current data's ID and MediaType in localStorage (Object Format)
     */
    AddIntoLS(){
        this.saveObject();
        window.location.reload();
    }

    /**
    * This method verifies if the current object is in Localstorage
    **/
    ItemInLS() : SavedI{
        return this.Objects.find((object) => {
            if (object.id === this.id){
                this.existsLS=true;
                return object;
            } else {
                this.existsLS=false;
                return undefined;
            }
        });

    }

    /*
    * Saves an Item in LocalStorage
    */
    saveObject(){
        let Object : SavedI|undefined=this.ItemInLS()
        if(!Object){

            var newObject: SavedI = {
                "id": this.id,
                "media_type": this.media_type,
                "name" : this.response.name || this.response.title || undefined,
                "overview" : this.response.overview || undefined,
                "tagline": this.response.tagline || undefined,
                "original_name" : this.response.original_name || this.response.original_title || undefined,
                "original_language": this.response.original_language || undefined,
                "number_of_episodes": this.response.number_of_episodes || undefined, 
                "current_episode": this.response.last_episode_to_air || undefined,
                "next_episode_to_air": this.response.next_episode_to_air || undefined,
                "seasons": this.response.seasons || undefined,
                "poster_path" : this.response.poster_path || undefined,
                "status": this.response.status || undefined,
                "genres": this.response.genres || undefined,  
                "release_date": this.response.release_date || undefined, 
            }
            this.Objects.push(newObject)
            this.localStr.saveDataObject("Saved", this.Objects)
        }
    }


    /**
     * This methos updates the object with new populated data 
     */
    updateLS(){
        const currentDate = this.datePipe.transform(new Date(), 'dd/MM/YYYY')!;
        if(this.pastEpisodeAirDate < currentDate){
            console.log("date past")
            this.getDetailsCall(this.id, this.media_type)
            this.saveObject()
        }
    }

    /**
     * This methos verifies if the Object ID matches the URL ID, if true: changes the HTML button to 'Remove from ...' 
     */
    AlreadyInLS(){
        let Object: SavedI|undefined = this.ItemInLS();
        switch (this.existsLS) {
            case true:
                console.log("case true")
                this.response=Object;
                this.pastEpisodeAirDate = this.datePipe.transform(this.response.current_episode?.air_date, 'dd/MM/YYYY')!;
                this.posterImage="https://image.tmdb.org/t/p/original"+this.response.poster_path;
                
                if (this.response.next_episode_to_air?.still_path=='' || this.response.next_episode_to_air?.still_path==undefined){
                    this.nextEpisodeImage="assets/img/fallbackIMG.svg";
                }
                else{
                    this.nextEpisodeImage=this.response.next_episode_to_air.still_path!='' ? "https://image.tmdb.org/t/p/original"+this.response.next_episode_to_air.still_path : "assets/img/fallbackIMG.svg"
                }
                break;
            case false:
                console.log("case false")
                this.getDetailsCall(this.id, this.media_type)
                this.pastEpisodeAirDate = this.datePipe.transform(this.response.current_episode?.air_date, 'dd/MM/YYYY')!;
                this.posterImage="https://image.tmdb.org/t/p/original"+this.response.poster_path;
                
                if (this.response.next_episode_to_air?.still_path=='' || this.response.next_episode_to_air?.still_path==undefined){
                    this.nextEpisodeImage="assets/img/fallbackIMG.svg";
                }
                else{
                    this.nextEpisodeImage=this.response.next_episode_to_air?.still_path!='' ? "https://image.tmdb.org/t/p/original"+this.response.next_episode_to_air?.still_path : "assets/img/fallbackIMG.svg"
                }
                break;
            
        }

    } 


    /**
     * This method deletes the current data's ID and MediaType in localStorage (Object Format)
     */
    //See: https://sentry.io/answers/remove-specific-item-from-array/#combining-indexof-and-splice-methods
    DeleteFromLS(){
        let Object: SavedI|undefined = this.ItemInLS();
        this.Objects.splice(this.Objects.indexOf(Object.id), 1)
        this.localStr.saveDataObject("Saved", this.Objects)
        window.location.reload();
    }
}

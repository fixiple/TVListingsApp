import { Component } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule, Location} from '@angular/common';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import localStr from '../_service/localStr';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';
import SavedI from '../_types/SavedI';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, PosterIMGComponent],
  providers: [API, localStr],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

    details : any;
    id : number = 0;
    media_type : string = "";
    existsLS: boolean = false;
    nextEpisodeImage="";

    /**
     * The response variable after making the API request.
     * It contains the data of the API request, allowing interactivity with the API in the front-end.
     * ex: getting the name of a TV Show or anime: {{response.name}}
    **/
    response: any = {};

    constructor(private API : API, private route : ActivatedRoute, private localStr : localStr, private _location: Location){}
    ngOnInit(){
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
                    this.nextEpisodeImage=data.next_episode_to_air.still_path!=null ? "https://image.tmdb.org/t/p/original"+data.next_episode_to_air.still_path : "assets/img/fallbackIMG.svg"  
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
     */
    backClicked() {
        this._location.back();
    }

    /**
     * This method saves the current data's ID and MediaType in localStorage (Object Format)
     */
    AddIntoLS(){
        let Saved_Objects = this.localStr.getDataObject("Saved") || []
        var newObject = {
            "id": this.id,
            "media_type": this.media_type,
            "name" : this.response.name || this.response.title || "",
            "overview" : this.response.overview || "",
            "tagline": this.response.tagline || "",
            "original_name" : this.response.original_name || this.response.original_title || "",
            "original_language": this.response.original_language || "",
            "number_of_episodes": this.response.number_of_episodes || "", 
            "current_episode": this.response.last_episode_to_air || "",
            "next_episode_to_air": this.response.next_episode_to_air || "",
            "poster_path" : this.response.poster_path || "",
            "status": this.response.status || "", 
        }
        Saved_Objects.push(newObject)
        this.localStr.saveDataObject("Saved", Saved_Objects)
        
        window.location.reload();
    }

    /**
     * This methos verifies if the Object ID matches the URL ID, if true: changes the HTML button to 'Remove from ...' 
     */
    AlreadyInLS(){
        let Objects = this.localStr.getDataObject("Saved")
        Objects.find((data: SavedI) => {
            if (data.id === this.id)
            {
                this.existsLS=true;
                this.response=data;
                this.nextEpisodeImage=data.next_episode_to_air.poster_path!=null ? "https://image.tmdb.org/t/p/original"+data.next_episode_to_air.poster_path : "assets/img/fallbackIMG.svg"
            } else {
                this.existsLS=false;
            }
        })
    }

    /**
     * This method deletes the current data's ID and MediaType in localStorage (Object Format)
     */
    //See: https://sentry.io/answers/remove-specific-item-from-array/#combining-indexof-and-splice-methods
    DeleteFromLS(){
        let Objects: any=this.localStr.getDataObject("Saved")

        for (var i=0; i< Objects.length; i++) {
            if (Objects[i].id == this.id) {
                Objects.splice(i, 1);
                //console.log("item deleted")
                this.localStr.saveDataObject("Saved", Objects)
            }
        }
        this.existsLS=false;
        window.location.reload();
    }
}

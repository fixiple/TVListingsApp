import { Component } from '@angular/core';
import API from '../service/API.service';
import { CommonModule, Location} from '@angular/common';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import localStr from '../service/localStr';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';


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
            
            // console.log(media_type)
            // console.log(id); 
            // this will be called every time route changes
            // so you can perform your functionality here
            this.getDetailsCall(this.id, this.media_type)
        });

        this.AlreadyInLS()
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
        let Saved_Objects = this.localStr.getDataObject("Saved_Objects") || []
        var newObject = {"ID": this.id,
                    "Media_Type": this.media_type, 
                    "Watched": false}
        Saved_Objects.push(newObject)
        this.localStr.saveDataObject("Saved_Objects", Saved_Objects)
            
        window.location.reload();
    }

    /**
     * This methos verifies if the Object ID matches the URL ID, if true: makes the HTML button 'Add' disappear
     */
    AlreadyInLS(){
        let Objects = this.localStr.getDataObject("Saved_Objects")
        Objects.find((data: { ID: number; }) => {
            if (data.ID === this.id)
            {
                this.existsLS=true;
            }
        })
    }

    /**
     * This method deletes the current data's ID and MediaType in localStorage (Object Format)
     */
    //See: https://sentry.io/answers/remove-specific-item-from-array/#combining-indexof-and-splice-methods
    DeleteFromLS(){
        let Objects: any=this.localStr.getDataObject("Saved_Objects")

        for (var i=0; i< Objects.length; i++) {
            if (Objects[i].ID == this.id) {
                Objects.splice(i, 1);
                //console.log("item deleted")
                this.localStr.saveDataObject("Saved_Objects", Objects)
            }
        }
        window.location.reload();
    }
}

import { Component } from '@angular/core';
import API from '../service/API.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import localStr from '../service/localStr';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
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

    constructor(private API : API, private route : ActivatedRoute, private localStr : localStr){}
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
                    console.log(data)
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
     * This method saves the current data's ID and MediaType in localStorage (Object Format)
     */
    saveIntoLS(){
            let Saved_Objects = this.localStr.getDataObject("Saved_Objects") || []
            var newObject = {"ID": this.id,
                        "Media_Type": this.media_type, 
                        "Watched": false}
            Saved_Objects.push(newObject)
            this.localStr.saveDataObject("Saved_Objects", Saved_Objects)
    }

    /**
     * This methos verifies if the Object ID matches the URL ID, if true: makes the HTML button 'Add' disappear
     */
    AlreadyInLS(){
        let Objects = this.localStr.getDataObject("Saved_Objects")
        let dat = Objects.find((data: { ID: number; }) => {
            if (data.ID === this.id)
            {
                this.existsLS=true;
            }
        })  
        console.log(this.existsLS)
    }
}

import { Component, Input } from '@angular/core';
import API from '../../_service/API.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import SavedI from '../../_types/SavedI';
import localStr from '../../_service/localStr';


@Component({
  selector: 'app-poster-img',
  standalone: true,
  imports: [],
  providers: [API],
  templateUrl: './poster-img.component.html',
  styleUrl: './poster-img.component.css'
})
export class PosterIMGComponent {
    
    existsLS: boolean = false
    response: any = {}
    baseImageURL: string="https://image.tmdb.org/t/p/original";
    fallBackImage: string="assets/img/fallBackImage.svg";
    @Input() mainImage=''
    @Input() posterWidth=200


    //SEE : https://angular.io/guide/property-binding-best-practices
    @Input() SourcePosterID=0
    @Input() SourceMediaType=""
    constructor(private API : API, private router : Router, private localstr: localStr){}



    ngOnInit(): void {
        this.AlreadyInLS();
    }


    toDetailsPage(cat: string, id: number){
        // console.log(id)
        this.router.navigate(['/details',cat,id]);
    }

    /**
     * Checks if the ID or the imageString is already inside of the localStorage array
     */
    AlreadyInLS(){
        //Doesn't work
        let Objects: SavedI = this.localstr.getDataObject("Saved");
            if ( Objects.id === this.SourcePosterID)
            {   
                console.log("Hey")
                this.existsLS=true;

                this.mainImage=Objects.poster_path;
            } else {
                console.log("Not Hey!")
                this.existsLS=false;
                this.getImage(this.SourcePosterID, this.SourceMediaType)
            }
    }
    


    getImage(ID: number, media_type: string) : any{
        let datas;
        if(media_type=="tv"){
            this.API.getDetailsTv(ID)
                .pipe(
                    map((data:any) => {
                        this.response=data;
                        //console.log(data)
                        this.mainImage=data["poster_path"] || ""
                    })
                    )
                    .subscribe((data: any)=>{
                        
                    })
                } else {
            this.API.getDetailsMovies(ID)
            .pipe(
                map((data:any) => {
                    this.response=data;
                    //console.log(data)
                    this.mainImage=data["poster_path"] || ""
                    
                })
            )
            .subscribe((data: any)=>{
 
            })
        }
    }
}

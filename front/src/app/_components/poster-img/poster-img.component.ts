import { Component, Input } from '@angular/core';
import API from '../../_service/API.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poster-img',
  standalone: true,
  imports: [],
  providers: [API],
  templateUrl: './poster-img.component.html',
  styleUrl: './poster-img.component.css'
})
export class PosterIMGComponent {
    response: any = {}
    baseImageURL: string="https://image.tmdb.org/t/p/original";
    fallBackImage: string="assets/img/fallBackImage.svg";
    @Input() mainImage=''
    @Input() posterWidth=200


    //SEE : https://angular.io/guide/property-binding-best-practices
    @Input() SourcePosterID=0
    @Input() SourceMediaType=""
    constructor(private API : API, private router : Router){}



    ngOnInit(): void {
        this.getImage(this.SourcePosterID, this.SourceMediaType)
    }


    toDetailsPage(cat: string, id: number){
        // console.log(id)
        this.router.navigate(['/details',cat,id]);
    }

    getImage(ID: number, media_type: string) : any{
        let datas;
        if(media_type=="tv"){
            this.API.getSeriesImages(ID)
                .pipe(
                    map((data:any) => {
                        //console.log(data)
                        this.mainImage=data["posters"][0]["file_path"] || ""
                    })
                )
                .subscribe((data)=>{

                })
        } else {
            this.API.getMovieImages(ID)
            .pipe(
                map((data:any) => {
                    //console.log(data)
                    this.mainImage=data["posters"][0]["file_path"] || ""
                })
            )
            .subscribe((data)=>{
 
            })
        }
    }
}

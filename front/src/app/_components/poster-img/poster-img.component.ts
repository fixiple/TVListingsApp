import { Component, Input } from '@angular/core';
import API from '../../service/API.service';
import { map } from 'rxjs';

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
    mainImage=""

    //SEE : https://angular.io/guide/property-binding-best-practices
    @Input() SourcePosterID=0
    @Input() SourceMediaType=""
    constructor(private API : API){}



    ngOnInit(): void {
        this.getImage(this.SourcePosterID, this.SourceMediaType)
    }


    getImage(ID: number, media_type: string) : any{
        let datas;
        if(media_type=="tv"){
            this.API.getSeriesImages(ID)
                .pipe(
                    map((data:any) => {
                        console.log(data)
                        this.mainImage=data["posters"][0]["file_path"]
                    })
                )
                .subscribe((data)=>{

                })
        } else {
            this.API.getMovieImages(ID)
            .pipe(
                map((data:any) => {
                    this.mainImage=data["posters"][0]["file_path"]
                    console.log(data)
                })
            )
            .subscribe((data)=>{
 
            })
        }
    }
}

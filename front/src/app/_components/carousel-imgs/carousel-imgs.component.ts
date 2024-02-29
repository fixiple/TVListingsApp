import { Component, OnInit } from '@angular/core';
import API from '../../_service/API.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-carousel-imgs',
  standalone: true,
  imports: [],
  providers: [API],
  templateUrl: './carousel-imgs.component.html',
  styleUrl: './carousel-imgs.component.css'
})
export class CarouselIMGSComponent implements OnInit {
    listOfImages : string[] = [] 
    response: any = {}

    constructor(private API : API){}



    ngOnInit(): void {
        this.getImages(114410, "tv")
    }


    getImages(ID: number, media_type: string) : any{
        let datas;
        if(media_type=="tv"){
            this.API.getSeriesImages(ID)
            .pipe(
                map((data:any) => {
                    this.parseImages(data)
                })
            )
            .subscribe((data)=>{
                this.parseImages(data)
            })
        } else {
            this.API.getMovieImages(ID)
            .subscribe((data)=>{
                 this.response=data
                }
            )
        }
    }

    parseImages(val: any){
        for (let index = 0; index < val["posters"].length; index++) {
            const element = val["posters"][index]["file_path"]
            this.listOfImages.push(...element)
        }
    }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import API from '../../service/API.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-get-images',
  standalone: true,
  imports: [],
  providers: [API],
  templateUrl: './get-images.component.html',
  styleUrl: './get-images.component.css'
})
export class GetImagesComponent implements OnInit, AfterViewInit{
    response: any = {}
    listOfImages : string[] = [] 


    constructor(private API : API){}

    ngAfterViewInit(): void {
        let imgs = this.populateIMGS()
        console.log(this.response)
    }

    ngOnInit(): void {
        let imgs = this.populateIMGS()
        console.log(this.response)
    }

    async populateIMGS(){
        let imgs = await this.getImages(114410, "tv")
        this.response=imgs
    }

    getImages(ID: number, media_type: string) : any{
        let datas;
        if(media_type=="tv"){
            this.API.getSeriesImages(ID)
            .pipe(
                map((data:any) => {
                    datas=data
                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        } else {
            this.API.getMovieImages(ID)
            .pipe(
                map((data:any) => {
                    this.response=data
                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        }
        return datas!
    }


}

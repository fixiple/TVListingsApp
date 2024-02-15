import { AfterViewInit, Component, OnInit } from '@angular/core';
import API from '../service/API.service';
import localStr from '../service/localStr';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';
import { GetImagesComponent } from '../_components/get-images/get-images.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PosterIMGComponent, GetImagesComponent],
  providers: [API],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
    
    /**
     * The response variable after making the API request.
     * It contains the data of the API request, allowing interactivity with the API in the front-end.
     * ex: getting the name of a TV Show or anime: {{response.name}}
    **/
    response: any = {};
    listOfInts: Object = {
        id:100,
        id2:200,
        id3:300,
    }
    IDS: number[] = [];
    lsObjects: [];
    mediaTypes: string[] = [];
    SeriesData: any[] = [];
    // done: boolean = false;
    // /!\ we need to declare the list variables (= []) so that we can push data into them
    // titles: string[] = [];
    // ids: number[] = []; 
    // mediaTypes: string[] = [];

    constructor(private API: API,  private router : Router, ) {
        //this.searchCall("The apothecary")
        // localStr.clearData()
        // localStr.saveDataObject("myObj",this.listOfInts)
        // let myObj=localStr.getDataObject("myObj132456")
        // console.log(myObj)
        // myObj=localStr.getDataObject("myObj")
        // console.log(myObj.id)
        // console.log(myObj.id2)
        // console.log(myObj.id3)
        this.lsObjects=JSON.parse(localStorage.getItem("Saved_Objects")!)
       

        //DEBUG
        //console.log(this.lsIDS[0].ID)

        
        // give to seriesData the content of the API call, fetched in a loop using the list of IDS
        //console.log(this.mediaTypes)
    }

    ngOnInit(){
        this.SeriesData = []
        
        
        //we fetch the IDS from localStorage
        for (let index = 0; index < this.lsObjects.length; index++) {
            let element = this.lsObjects[index];
            this.IDS.push(element["ID"]);
            this.mediaTypes.push(element["Media_Type"]);

        }

        for (let index = 0; index < this.IDS.length; index++) {
            let ID = this.IDS[index];
            let media_type=this.mediaTypes[index]
            this.getDataByID(ID, media_type)
        }
        //console.log(this.SeriesData)
    }

    /**
     * 
     * @param id  
     * @returns 
     */
    getMediaType(id: number): any{
        return this.lsObjects[id]["Media_Type"]
    }


    toDetailsPage(cat: string, id: number){
        // console.log(id)
        this.router.navigate(['/details',cat,id]);
    }

    toSearchPage(searchQuery : string){
        this.router.navigate(['/search'],
            {
                queryParams: {"q" : searchQuery.replace(" ", "-")}, 
                queryParamsHandling: 'merge'
            }
        );
    }

    searchCall(req: string){

        this.API.searchQuery(req)
        .pipe(
            map((data:any) => {
                //console.log(data.results)
                
                // we fetch the results part of the json and assign it to response variable
                
                this.response=data
            })
        )
        .subscribe(
            (val: any) => {},
            (err: any) => console.error(err),
        )
        
    }
    
    getDataByID(req: number, media_type: string){
        if (media_type==="tv"){
            this.API.getDetailsTv(req)
            .pipe(
                map((data:any) => {
                    //console.log(data.results)
                    
                    // we fetch the results part of the json and assign it to SeriesData array
                    
                    this.SeriesData.push(data)
                    //console.log(this.SeriesData)
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
                    //console.log(data.results)
                    
                    // we fetch the results part of the json and assign it to SeriesData array
                    
                    this.SeriesData.push(data)
                    //console.log(this.SeriesData)
                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        }
    }
}

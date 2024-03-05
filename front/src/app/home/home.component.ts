import { AfterViewInit, Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';
import { CarouselIMGSComponent } from '../_components/carousel-imgs/carousel-imgs.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PosterIMGComponent, CarouselIMGSComponent],
  providers: [API],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, AfterViewInit {
    
    movieTitleWidth : number = 0;    
    datalistWidth : number = 0;    
    isTooBig = false;

    
    /**
     * The response variable after making the API request.
     * It contains the data of the API request, allowing interactivity with the API in the front-end.
     * ex: getting the name of a TV Show or anime: {{response.name}}
    **/
    response: any = {};
    IDS: number[] = [];
    lsObjects: [];
    mediaTypes: string[] = [];
    SeriesData: any[] = [];
    toBeAired: boolean[] = [];
    isMovie : boolean[]=[]
    endedOrCancelled : boolean[]=[]

    // done: boolean = false;
    // /!\ we need to declare the list variables (= []) so that we can push data into them
    // titles: string[] = [];
    // ids: number[] = []; 
    // mediaTypes: string[] = [];

    constructor(private API: API,  private router : Router, private renderer : Renderer2) {
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
        //this.lsObjects.sort( (a : any,b: any) => a.ID < b.ID ? -1 : 1 )
        //console.log(this.lsObjects)

        
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

        for (let index = 0; index < this.mediaTypes.length; index++) {
            let element = this.mediaTypes[index];
            this.isMovie.push(element==="movie" ? true : false);
        }
        
        
        
    }
    
    @ViewChild('spanTitle', {static: true}) 
    movieTitleElement!: ElementRef;
    @ViewChild('titleContainer', {static: true}) 
    titleContainerElement!: ElementRef;
    @ViewChild('dataList') 
    dataListElement!: ElementRef;
    
    ngAfterViewInit() {
        //ERROR: this below isn't called !! 
        this.SeriesData.sort((a : any,b: any) => {
            console.log(a.next_episode_to_air.air_date)
            if (a.next_episode_to_air.air_date > b.next_episode_to_air.air_date){ 
                console.log("HU");
                return 1 ;
            }
            else if(a.next_episode_to_air.air_date < b.next_episode_to_air.air_date) {
                console.log("HO")
                return -1; 
            }
            else{ 
                console.log("HIA")
                return 0
            }
        })
        this.SeriesData.map((val) => {
            console.log(val['last_episode_to_air']['air_date'])
        })

        //console.log(this.dataListElement.nativeElement.clientWidth)
        // this.datalistWidth = (this.dataListElement.nativeElement as HTMLElement).offsetWidth;
        // this.movieTitleWidth = (this.movieTitleElement.nativeElement as HTMLElement).offsetWidth;
        // console.log(this.movieTitleWidth ,"+", this.datalistWidth )
        // this.isTooBig = this.movieTitleWidth<this.datalistWidth ? true : false;
    }
    
    

    /**
     * 
     * @param id  
     * @returns 
     */
    getMediaType(id: number): any{
        return this.lsObjects[id]["Media_Type"]
    }

    /**
     * 
     * @param id  
     * @returns 
     */
    getID(id: number): any{
            return this.lsObjects[id]["ID"]
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

    toCurrentlyWatchedPage(){
        this.router.navigate(['/watchList']);
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

                    
                    this.toBeAired.push(data.next_episode_to_air!==null&&data.status==='Returning Series' ? true : false)
                    
                    this.endedOrCancelled.push(data.next_episode_to_air!==null&&data.status==='Returning Series' ? true : false)
                    //console.log("Series: "+this.toBeAired)
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
                    this.toBeAired.push(data.status==='In Production' ? true : false)
                    //console.log("Movie:" +this.toBeAired)
                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        }
    }
}

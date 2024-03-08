import { AfterViewInit, Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';
import { CarouselIMGSComponent } from '../_components/carousel-imgs/carousel-imgs.component';
import SavedI from '../_types/SavedI';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PosterIMGComponent, CarouselIMGSComponent],
  providers: [API],
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
    
    movieTitleWidth : number = 0;    
    datalistWidth : number = 0;    
    isTooBig = false;


    lsObjects: SavedI[];


    constructor(private API: API,  private router : Router, private renderer : Renderer2) {

        this.lsObjects=JSON.parse(localStorage.getItem("Saved")!)
        //console.log(this.lsObjects)
        //this.lsObjects.sort( (a : any,b: any) => a.ID < b.ID ? -1 : 1 )
        //console.log(this.lsObjects)

    }

    ngOnInit(){
        
    }
    
    @ViewChild('spanTitle', {static: true}) 
    movieTitleElement!: ElementRef;
    @ViewChild('titleContainer', {static: true}) 
    titleContainerElement!: ElementRef;
    @ViewChild('dataList') 
    dataListElement!: ElementRef;
    
    ngAfterViewInit() {
        //TODO: Figure out how it works
        this.lsObjects.sort((a : any,b: any) => {
            console.log(a.next_episode_to_air.air_date)
            if (a.next_episode_to_air.air_date > b.next_episode_to_air.air_date){ 
                console.log("HU");
                return 1 ;
            }
            else if(a.next_episode_to_air.air_date < b.next_episode_to_air.air_date) {
                console.log("HO")
                return -1; 
            }
            else if(a.next_episode_to_air.air_date == b.next_episode_to_air.air_date) {
                console.log("HOIA")
                return -1; 
            }
            else{ 
                console.log("HIA")
                return -1
            }
        })


        //console.log(this.dataListElement.nativeElement.clientWidth)
        // this.datalistWidth = (this.dataListElement.nativeElement as HTMLElement).offsetWidth;
        // this.movieTitleWidth = (this.movieTitleElement.nativeElement as HTMLElement).offsetWidth;
        // console.log(this.movieTitleWidth ,"+", this.datalistWidth )
        // this.isTooBig = this.movieTitleWidth<this.datalistWidth ? true : false;
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
    toReleasesPage(){
        this.router.navigate(['/releases']);
    }

    searchCall(req: string){
        this.API.searchQuery(req)
        .pipe(
            map((data:any) => {
                //console.log(data.results)
                // we fetch the results part of the json and assign it to response variable
            })
        )
        .subscribe(
            (val: any) => {},
            (err: any) => console.error(err),
        )
    }
    
    /*
    * Used to refresh data found from object, how? idk.
    */

    getDataByID(req: number, media_type: string){
        if (media_type==="tv"){
            this.API.getDetailsTv(req)
            .pipe(
                map((data:any) => {

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

                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        }
    }
}

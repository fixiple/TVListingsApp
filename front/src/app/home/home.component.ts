import { AfterViewInit, Component, OnInit, ViewChildren, Renderer2, ElementRef, AfterContentInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule, DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';
import { CarouselIMGSComponent } from '../_components/carousel-imgs/carousel-imgs.component';
import { AppComponent } from '../app.component';
import SavedI from '../_types/SavedI';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PosterIMGComponent, CarouselIMGSComponent],
  providers: [API],
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
    response: any[] = [];
    lsObjects: SavedI[];
    movieTitleWidth : number = 0;    
    datalistWidth : number = 0;    
    epiNameisTooBig: boolean[]=[];
    titleisTooBig: boolean[]=[];
    interval : any;
    //get current date in day/month/fullYear format
    currentDate: any;


    constructor(private API: API,  private router : Router, private renderer : Renderer2, public datePipe: DatePipe, private cdref: ChangeDetectorRef) {
        this.lsObjects=JSON.parse(localStorage.getItem("Saved")!)
        //console.log(this.currentDate)
    }

    ngOnInit(){
        clearInterval(this.interval);
        this.currentDate=this.datePipe.transform(new Date(), 'dd/MM/YYYY')
        //console.log(this.currentDate)
    }

    ngOnDestroy(){
        clearInterval(this.interval);
    }
    
    // @ViewChild('spanTitle', {static: true}) 
    // movieTitleElement!: ElementRef;
    // @ViewChild('titleContainer', {static: true}) 
    // titleContainerElement!: ElementRef;
    @ViewChildren('HPReleaseInfo') 
    releaseElement!: any;
    
    ngAfterViewInit() {
        //ERROR HERE : 
        // ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: ''. Current value: 'fader fader-left'. Expression location: _HomeComponent component
        this.scrollingText()
        

        
    }




    ngAfterContentInit(): void {
        
        if (!this.interval) {
            //the refreshData will be launched every 60 seconds*30 = 30 minutes
            this.interval = setInterval(() => this.refreshData(), ((1000*60)*30))
        }

        //will sort the data according to the nearest release Date
        //ref: https://stackoverflow.com/questions/29829205/sort-an-array-so-that-null-values-always-come-last
        this.lsObjects.sort((a : any,b: any) => {
            if(a.next_episode_to_air?.air_date===null) {
                return 1; 
            }
            else if(b.next_episode_to_air?.air_date===null) {
                return -1; 
            }else if (a.next_episode_to_air?.air_date > b.next_episode_to_air?.air_date){ 
                return 1 ;
            }
            else if(a.next_episode_to_air?.air_date < b.next_episode_to_air?.air_date) {
                return -1; 
            }
            else if(a.next_episode_to_air?.air_date === b.next_episode_to_air?.air_date) {
                return 0; 
            }
            else if(a.status=="In Production" || b.status=="In Production") {
                return 1; 
            }
            else{ 
                return 0
            }
        })
    }


    scrollingText(){
        //this.datalistWidth = (this.dataListElement.nativeElement as HTMLElement).offsetWidth;
        // this.movieTitleWidth = (this.movieTitleElement.nativeElement as HTMLElement).offsetWidth;
        // console.log(this.movieTitleWidth ,"+", this.datalistWidth )
        // this.isTooBig = this.movieTitleWidth<this.datalistWidth ? true : false;

        let data: any=this.releaseElement.toArray();
        const element: any = data;
        //this will always be the same number
        let parentOffSetWidth=data[0].nativeElement.offsetWidth 
        
        for (let index = 0; index < data.length; index++) {
            let titleWidth=element[index].nativeElement.children[1].offsetWidth
            let episodeNumWidth=element[index].nativeElement.children[2].offsetWidth

            
            console.log(element[index].nativeElement.nextElementSibling.offsetTop)
            //console.log(titleWidth+episodeNumWidth)
            if(element[index].nativeElement.nextElementSibling.offsetTop>125){
                console.log("TOO BIG")
                setTimeout(()=> {
                    this.epiNameisTooBig[index]=true;
                }, 0);
            }
            else {
                setTimeout(()=> {
                    this.epiNameisTooBig[index]=false;
                }, 0);
            }
        }
    }

    /** 
     * This function has to be called every x minutes(see setInterval(this.refreshData, 10000)),
     * if the data in API is different than LS
     * then update the LS data
     **/
    refreshData(){
        //TODO (DONE! It's working hehe): find a way to get the other data from this.response.next_episode_to_air
        // FOR NOW it only gets and keeps the last element... from the list
        // Maybe create a second localStorage Object with only the this.response.next_episode_to_air???
        let Objects: any=JSON.parse(localStorage.getItem("Saved")!)
        var element: SavedI[] = [];
        var datas: any[] = [];
        //console.log(Objects)
        for (var i=0; i< Objects.length; i++) {
            element[i] = Objects[i];
            this.getDataByID(element[i].id, element[i].media_type);
            //console.log(element.next_episode_to_air)
            datas.push(this.response[i]?.next_episode_to_air)
            
            if (element[i].media_type=="tv" && element[i].next_episode_to_air.name!=datas[i]?.name ) {
                var newObject = {
                    "id": element[i].id,
                    "media_type": element[i].media_type,
                    "name" : element[i].name,
                    "overview" : element[i].overview,
                    "tagline": element[i].tagline,
                    "original_name" : element[i].original_name,
                    "original_language": element[i].original_language,
                    "number_of_episodes": element[i].number_of_episodes, 
                    "current_episode": this.response[i]?.last_episode_to_air,
                    "next_episode_to_air": datas[i] || "",
                    "poster_path" : element[i].poster_path,
                    "status": element[i].status,
                    "release_date": element[i].release_date || this.response[i]?.release_date || "" 
                }
                    Objects[i]=newObject;
                    localStorage.setItem("Saved", JSON.stringify(Objects));
                    
            } else if (element[i].media_type=="movie" && element[i].release_date != this.response[i]?.release_date) {
                var newObject2 = {
                    "id": element[i].id,
                    "media_type": element[i].media_type,
                    "name" : element[i].name,
                    "overview" : element[i].overview,
                    "tagline": element[i].tagline,
                    "original_name" : element[i].original_name,
                    "original_language": element[i].original_language,
                    "number_of_episodes": element[i].number_of_episodes, 
                    "current_episode": element[i].current_episode,
                    "next_episode_to_air": element[i].next_episode_to_air || "",
                    "poster_path" : element[i].poster_path,
                    "status": element[i].status,
                    "release_date": element[i].release_date || this.response[i]?.release_date  || "" 
                }
                    Objects[i]=newObject2;
                    localStorage.setItem("Saved", JSON.stringify(Objects));
                    
            } else {
                console.log("all good")
            }
        }
        this.response=[]
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
                    this.response.push(data)
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
                    this.response.push(data)
                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        }
    }
}

import { Component, OnInit, Renderer2 } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import localStr from '../_service/localStr';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';

@Component({
  selector: 'app-upcoming-releases',
  standalone: true,
  providers: [API, localStr, PosterIMGComponent],
  templateUrl: './upcoming-releases.component.html',
  styleUrl: './upcoming-releases.component.css',
  imports: [CommonModule, PosterIMGComponent]
})
export class UpcomingReleasesComponent implements OnInit {

    response: any = {};
    IDS: number[] = [];
    lsObjects: [];
    mediaTypes: string[] = [];
    SeriesData: any[] = [];
    isMovie : boolean[] = []
    toBeAired: boolean[] = [];
    endedOrCancelled : boolean[] = []

    constructor(private API: API,  private router : Router, private localStr : localStr,private renderer : Renderer2) {
        this.lsObjects=JSON.parse(localStorage.getItem("Saved_Objects")!)
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

    DeleteFromLS( id: number){
        let Objects: any=this.localStr.getDataObject("Saved_Objects")

        for (var i=0; i< Objects.length; i++) {
            if (Objects[i].ID == id) {
                Objects.splice(i, 1);
                //console.log("item deleted")
                this.localStr.saveDataObject("Saved_Objects", Objects)
            }
        }
        window.location.reload();
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

    getDataByID(req: number, media_type: string){
        if (media_type==="tv"){
            this.API.getDetailsTv(req)
            .pipe(
                map((data:any) => {
                    //console.log(data.results)
                    
                    // we fetch the results part of the json and assign it to SeriesData array
                    
                    this.SeriesData.push(data)
                    //console.log(this.SeriesData)

                    this.endedOrCancelled.push(data.next_episode_to_air!==null&&data.status==='Returning Series' ? true : false)
                    console.log("Series: "+this.endedOrCancelled)
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
    
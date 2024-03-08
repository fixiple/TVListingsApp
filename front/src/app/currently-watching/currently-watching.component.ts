import { Component, OnInit, Renderer2 } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import localStr from '../_service/localStr';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';
import SavedI from '../_types/SavedI';

@Component({
    selector: 'app-currently-watching',
    standalone: true,
    providers: [API, localStr],
    templateUrl: './currently-watching.component.html', 
    styleUrls: ['../app.component.css', './currently-watching.component.css'],
    imports: [CommonModule, PosterIMGComponent]
})
export class CurrentlyWatchingComponent{

    lsObjects: SavedI [];


    constructor(private API: API,  private router : Router, private localStr : localStr,private renderer : Renderer2) {
        this.lsObjects=JSON.parse(localStorage.getItem("Saved")!)
    }


    DeleteFromLS( id: number){
        let Objects: any=this.localStr.getDataObject("Saved")

        for (var i=0; i< Objects.length; i++) {
            if (Objects[i].id == id) {
                Objects.splice(i, 1);
                //console.log("item deleted")
                this.localStr.saveDataObject("Saved_Objects", Objects)
            }
        }
        window.location.reload();
    }


    toDetailsPage(cat: string, id: number){
        // console.log(id)
        this.router.navigate(['/details',cat,id]);
    }

    toHomePage(){
        // console.log(id)
        this.router.navigate(['/']);
    }

}

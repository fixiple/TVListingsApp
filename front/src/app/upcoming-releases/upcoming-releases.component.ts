import { Component, OnInit, Renderer2 } from '@angular/core';
import API from '../_service/API.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import localStr from '../_service/localStr';
import { PosterIMGComponent } from '../_components/poster-img/poster-img.component';
import SavedI from '../_types/SavedI';

@Component({
  selector: 'app-upcoming-releases',
  standalone: true,
  providers: [API, localStr, PosterIMGComponent],
  templateUrl: './upcoming-releases.component.html',
  styleUrls: ['../app.component.css', './upcoming-releases.component.css'],
  imports: [CommonModule, PosterIMGComponent]
})
export class UpcomingReleasesComponent implements OnInit {


    lsObjects: SavedI[];



    constructor(private API: API,  private router : Router, private localStr : localStr,private renderer : Renderer2) {
        this.lsObjects=JSON.parse(localStorage.getItem("Saved")!)
    }

    ngOnInit(){

    
    
    }

    DeleteFromLS( id: number){
        let Objects: any=this.localStr.getDataObject("Saved")

        for (var i=0; i< Objects.length; i++) {
            if (Objects[i].id == id) {
                Objects.splice(i, 1);
                //console.log("item deleted")
                this.localStr.saveDataObject("Saved", Objects)
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
    
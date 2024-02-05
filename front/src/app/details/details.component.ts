import { Component } from '@angular/core';
import API from '../service/API.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  providers: [API],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

    private details : any;
    response: any;

    constructor(private API : API, private route : ActivatedRoute){}
    ngOnInit(){
        this.details = this.route.params.subscribe((params: any) => {
            
            let media_type = params['cat'];
            let id = +params['id']; //+ transforms string into integer/number, see: https://stackoverflow.com/a/41969665
            
            console.log(media_type)
            // console.log(id); 
            // this will be called every time route changes
            // so you can perform your functionality here
            this.getDetailsCall(id, media_type)
        });

    }
      ngOnDestroy() {
        this.details.unsubscribe();
    }


    getDetailsCall(req: number, media_type: string){
        if (media_type=="tv"){
            this.API.getDetailsTv(req)
            .pipe(
                map((data:any) => {
                    console.log(data)
                    this.response=data
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
                    console.log(data)
                    this.response=data
                })
            )
            .subscribe(
                (val: any) => {},
                (err: any) => console.error(err),
            )
        }
    }

}

import { Component } from '@angular/core';
import API  from '../service/API.service';
import { CommonModule } from '@angular/common';
import { map} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [API],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
    response: any;

    titles?: string[];
    ids?: number[]; 

    title?: string;
    id?: number
    constructor(private API: API) {
        this.searchCall("The apothecary")
    }

    searchCall(req: string){
        this.API.get(req)
        .pipe(
            map((data:any) => {
                data.results.map((result:any) => {
                    // link: https://stackoverflow.com/a/68144628
                    this.titles?.push(result.name || result.title)
                    //DEBUG works
                    // console.log(result.name || result.title)
                })
            })
        )
        .subscribe(
            (val: any) => {
                //console.log(val)
                        // this.titles?.push(i["name"])
                        // this.ids?.push(i["id"])
                    },
            (err: any) => console.error(err),
        )
        
    }
    ngOnInit() {
        // this.titles?.map(
        //     (titleFromList:string) =>{
        //         console.log("title number ", this.titles?.indexOf(titleFromList), ":", titleFromList)
        //     }
        // )
        // this.API
        // .get("The Apothecary Diary")
        // .subscribe((values: any) => {
        //     this.response=values;
        //     console.log("HERE");
        //     //console.log(values["page"]);
        // })
        // console.log(this.response.toString())
    }
}

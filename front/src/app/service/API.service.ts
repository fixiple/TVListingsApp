import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const API_KEY = environment.API_KEY;

@Injectable({
    providedIn: 'root'
})

export default class API{
    constructor(private http: HttpClient) { }
    headers=new HttpHeaders();

    response: any;
    
    public get(query_string : string, page_number : Number = 1 ) : Response {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/search/multi?query='+query_string+'&page='+page_number+'&api_key='+API_KEY
        this.http.get(
            url,
            httpOptions
        )
        .subscribe({
            //eighter using function or observer object
            next: val => {
                this.response = val;
            },
            error: error => {
                //console.error(err);
               console.error("error: ", error.error.status_message)
            }
        });
        return this.response;
    }

    //OTHER METHOD FOUND IN TMDB DOCUMENTATION
    // public search(query_string: string, page_number: number ) {
    //     const url = 'https://api.themoviedb.org/3/search/multi?query=${query_string}&page=${page_number}';
    //     const options = {
    //     method: 'GET',
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: 'Bearer ${ACCESS_TOKEN}'
    //         }
    //     };
    
    //     fetch(url, options)
    //     .then(res => res.json())
    //     .then(json => console.log(json))
    //     .catch(err => console.error('error:' + err));
    // }
}
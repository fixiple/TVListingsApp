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

    // response: any;
    
    public get(query_string : string, page_number : Number = 1 ) : any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/search/multi?query='+query_string+'&page='+page_number+'&api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
        // .subscribe({
        //     //eighter using function or observer object
        //     val => this.response = val.json(),
        //     error: (error) => console.error("error: ", error.error.status_message)
        // });
        // return this.response;
    }

    public getDetailsTv(series_ID : number, page_number : Number = 1 ) : any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url=' https://api.themoviedb.org/3/tv/'+series_ID+'?api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
        // .subscribe({
        //     //eighter using function or observer object
        //     val => this.response = val.json(),
        //     error: (error) => console.error("error: ", error.error.status_message)
        // });
        // return this.response;
    }


    public getDetailsMovies(movie_ID : number, page_number : Number = 1 ) : any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url=' https://api.themoviedb.org/3/movie/'+movie_ID+'?api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
        // .subscribe({
        //     //eighter using function or observer object
        //     val => this.response = val.json(),
        //     error: (error) => console.error("error: ", error.error.status_message)
        // });
        // return this.response;
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
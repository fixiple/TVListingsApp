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

    /**
     * Makes a search query in the TMDB API, searching for  for movies, TV shows and people in a single request.
     * @param {String} query_string  The movie/TV Show/Anime you wanna research
     * @param {String} language  The language we wanna get the data back as (ex: "en-US" for  United States English)
     * @returns {JSON} Returns JSON object containing data of the querySearch (but need to subscribe...)
    **/
    public searchQuery(query_string : string,page_number : Number = 1, language : String = "en" ) : any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/search/multi?query='+query_string+'&page='+page_number+'&api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
    }

    /**
     * Get The Details about a certain movie.
     * @param {number} series_ID  The ID of a articular TV Series or Anime (ex: 872585)
     * @param {String} language  The language we wanna get the data back as (ex: "en-US" for  United States English)
     * @returns {JSON} Returns JSON object containing data (but need to subscribe...)
    **/
    public getDetailsTv(series_ID : number, language : String = "en" ) : any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/tv/'+series_ID+'?language='+language+'&api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
    }

    /**
     * Get The Details about a certain movie.
     * @param {number} movie_ID  The ID of a articular movie (ex: 872585)
     * @param {String} language  The language we wanna get the data back as (ex: "en-US" for United States English)
     * @returns {JSON} Returns JSON object containing data (but need to subscribe...)
    **/
    public getDetailsMovies(movie_ID : number, language : String = "en" ) : any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/movie/'+movie_ID+'?language='+language+'&api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
    }

    /**
    * Get the list of languages (ISO 639-1 tags) used throughout TMDB.
    * @returns {JSON} Returns JSON object containing data (but need to subscribe...)
    **/
    public getLanguages() : any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/configuration/languages'+'?api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
    }

    /**
    * Get a list of the officially supported translations on TMDB.
    * @returns {JSON} Returns JSON object containing data (but need to subscribe...)
    **/ 
    public getTranslations() : any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/configuration/primary_translations'+'?api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
    }

    /**
    * Get a list of configurations of the Images from the TMDB.
    * @returns {JSON} Returns JSON object containing data (but need to subscribe...)
    **/ 
   public getConfiguration() : any {
       this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/configuration'+'?api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
    }

     /**
    * Get the images that belong to a Movie.
    * @param {number} movie_ID  The ID of a articular movie (ex: 872585)
    * @returns {JSON} Returns JSON object containing data (but need to subscribe...)
    **/
    public getMovieImages(movie_ID : number): any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/movie/+'+movie_ID+'/images'+'?api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
    }
    
    /**
    * Get the images that belong to a TV series.
    * @param {number} series_ID  The ID of a articular movie (ex: 872585)
    * @returns {JSON} Returns JSON object containing data (but need to subscribe...)
    **/ 
    public getSeriesImages(series_ID : number): any {
        this.headers.append('accept','application/json')
        const httpOptions = {
            headers: this.headers 
        };
        let url='https://api.themoviedb.org/3/movie/+'+series_ID+'/images'+'?api_key='+API_KEY
        return this.http.get(
            url,
            httpOptions
        )
    }
    

}
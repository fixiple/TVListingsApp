export interface searchResponse{
    adult: Boolean,
    backdrop_path: String,
    id: Number,
    name: String,
    original_language: String,
    original_name: String,
    overview: String,
    poster_path: String,
    media_type: String,
    genre_ids: Array<Number>,
    popularity: Number,
    first_air_date: String,
    vote_average: Number,
    vote_count: Number,
    origin_country: Array<String>
}
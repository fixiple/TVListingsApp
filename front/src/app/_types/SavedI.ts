export default interface SavedI{
    id: number;
    media_type: string;
    name: string;
    overview: string;
    tagline: string;
    original_name: string;
    original_language: Array<string>;
    number_of_episodes: number;
    release_date: string;
    poster_path: string;
    seasons: SeasonI[];
    current_episode: CurrentEpisodeI;
    next_episode_to_air: NextEpisodeI;
    genres: genreI[];
    status: string;
}

interface genreI{
    id: number;
    name: string;
}

interface SeasonI{
    id: number;
    name: string;
    episode_count: number;
    overview: string;
    poster_path: string;
    season_number: number;
    air_date: string;
}

interface CurrentEpisodeI {
    id: number;
    show_id: number;
    name: string,
    air_date: string,
    episode_number: number,
    episode_type: string,
    overview: string;
    season_number: number,
    poster_path: string;
}

interface NextEpisodeI {
    id: number;
    show_id: number;
    name: string,
    air_date: string,
    episode_number: number,
    episode_type: string,
    overview: string;
    season_number: number,
    poster_path: string;
}
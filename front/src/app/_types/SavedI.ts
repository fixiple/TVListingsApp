export default interface SavedI{
    id: number;
    media_type: string;
    name: string;
    overview: string;
    tagline: string;
    original_name: string;
    original_language: Array<string>;
    number_of_episodes: number;
    current_episode: CurrentEpisodeI;
    next_episode_to_air: NextEpisodeI;
    release_date: string;
    poster_path: string;
    status: string;
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
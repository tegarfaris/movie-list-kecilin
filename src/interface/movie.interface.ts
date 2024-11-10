export interface IMovies {
  id: number;
  poster_path: string;
  original_title: string;
  overview: string;
  vote_average?: string | number;
  genre_ids: number[];
}

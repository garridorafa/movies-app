export interface IMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  genre_ids: number[];
  genres: IGenre[];
  overview: string;
  adult: boolean;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICast {
  name: string;
  character: string;
}

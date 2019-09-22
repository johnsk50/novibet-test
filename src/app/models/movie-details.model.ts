export class MovieDetailsModel {
  title: string;
  overview: string;
  poster_path: string;
  budget: number;
  release_date: string;
  revenue: number;
  vote_average: number;
  vote_count: number;
  spoken_languages: Languages[];

  constructor() {
    this.title = '';
    this.overview = '';
    this.poster_path = '';
    this.release_date = '';
    this.spoken_languages = [];
  }
}

export class Languages {
  iso_639_1: string;
  name: string;

  constructor() {
    this.iso_639_1 = '';
    this.name = '';
  }
}

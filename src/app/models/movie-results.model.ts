export class MovieResultsModel {
  page: number;
  total_pages: number;
  total_results: number;
  results: MoviesResults[];

  constructor() {
    this.results = [];
  }
}

export class MoviesResults {
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;

  constructor() {
    this.poster_path = '';
    this.title = '';
  }
}

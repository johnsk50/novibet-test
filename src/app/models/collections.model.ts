import {MoviesResults} from './movieResults.model';

export class CollectionsModel {
  id: number;
  title: string;
  description: string;
  movies: MoviesResults[];

  constructor() {
    this.title = '';
    this.description = '';
    this.movies = [];
  }

}

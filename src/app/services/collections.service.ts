import {Injectable} from '@angular/core';
import {CollectionsModel} from '../models/collections.model';
import {MoviesResults} from '../models/movie-results.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  private collections: CollectionsModel[] = [];

  private index = 0;

  constructor() {
    this.checkLocalCollections();
  }

  checkLocalCollections() {

    const coll: CollectionsModel[] = JSON.parse(localStorage.getItem('collections'));

    if (coll) {
      this.collections = coll;
      this.index = coll[coll.length - 1].id + 1;
    }
  }

  fetchCollections(): CollectionsModel[] {
    return this.collections.slice();
  }

  fetchCollectionDetails(cid: number): CollectionsModel {
    return this.collections.find(x => x.id === cid);
  }

  addCollectionToLocal(newTitle: string, newDescription: string) {
    const newCollection: CollectionsModel = {
      title: newTitle,
      description: newDescription,
      id: this.index,
      movies: []
    };

    this.collections.push(newCollection);
    localStorage.setItem('collections', JSON.stringify(this.collections));
    this.index++;
  }

  addMoviesToCollection(cid: number, movies: MoviesResults[]) {
    const collIndex = this.collections.findIndex(x => x.id === cid);
    if (this.collections[collIndex].movies && this.collections[collIndex].movies.length === 0 ) {
      this.collections[collIndex].movies.push(...movies);
    } else {
      const tempList: MoviesResults[] = [];
      movies.forEach( x => {
        const movieIndex = this.collections[collIndex].movies.findIndex(
          item => item.id === x.id);
        if (movieIndex === -1) {
          tempList.push(x);
        }
      });
      if (tempList && tempList.length > 0) {
        this.collections[collIndex].movies.push(...tempList);
      } else {
        return;
      }
    }
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }

  removeMovie(cid: number, movieId: number) {
    const collIndex = this.collections.findIndex(x => x.id === cid);
    const movieIndex = this.collections[collIndex].movies.findIndex(
      item => item.id === movieId);
    if (movieIndex !== -1) {
      this.collections[collIndex].movies.splice(movieIndex, 1);
    }
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }

}

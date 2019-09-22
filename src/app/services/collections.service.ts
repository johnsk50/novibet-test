import {Injectable} from '@angular/core';
import {CollectionsModel} from '../models/collections.model';
import {BehaviorSubject} from 'rxjs';
import {MoviesResults} from '../models/movie-results.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  // collectionsSubject = new BehaviorSubject<CollectionsModel[]>([]);
  private collections: CollectionsModel[] = [];

  collSubject = new BehaviorSubject<CollectionsModel>(new CollectionsModel());
  private index = 0;

  constructor() {
    this.checkLocalCollections();
  }

  checkLocalCollections() {

    const coll: CollectionsModel[] = JSON.parse(localStorage.getItem('collections'));

    console.log('collectionservice', coll);
    if (coll) {
      this.collections = coll;
      this.index = coll[coll.length - 1].id + 1;
      // this.collectionsSubject.next(this.collections);
    } else {
      // this.collectionsSubject.next([]);
    }
  }

  fetchCollections(): CollectionsModel[] {
    return this.collections.slice();
  }

  fetchCollectionDetails(cid: number): CollectionsModel {
    console.log('fetch', cid);
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

    // this.collectionsSubject.next(this.collections);
  }

  addMoviesToCollection(cid: number, movies: MoviesResults[]) {
    const collIndex = this.collections.findIndex(x => x.id === cid);
    if (this.collections[collIndex].movies && this.collections[collIndex].movies.length === 0 ) {
      this.collections[collIndex].movies.push(...movies);
    } else {
      const tempList: MoviesResults[] = [];
      console.log('length', movies.length);
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
    // this.collectionsSubject.next(this.collections);
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

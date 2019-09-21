import {Injectable} from '@angular/core';
import {CollectionsModel} from '../models/collections.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  collectionsSubject = new BehaviorSubject<CollectionsModel[]>([]);
  collections: CollectionsModel[] = [];
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
      this.collectionsSubject.next(this.collections);
    } else {
      this.collectionsSubject.next([]);
    }
  }

  fetchMovies(cid: number): CollectionsModel {
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
    this.index++; // check if this gets messy

    this.collectionsSubject.next(this.collections);
  }

}

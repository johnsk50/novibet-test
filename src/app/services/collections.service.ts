import {Injectable} from '@angular/core';
import {CollectionsModel} from '../models/collections.model';

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

    console.log('collectionservice', coll);
    if (coll) {
      this.collections = coll;
      this.index = coll[coll.length - 1].id + 1;
    }
  }

  fetchCollections() {

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

}

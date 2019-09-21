import { Component, OnInit } from '@angular/core';
import {CollectionsModel} from '../../models/collections.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {

  defaultCollection: CollectionsModel[] = [{
    id: 0,
    title: 'Test',
    description: 'This Is A Test',
    movies: [{
      title: 'test movie',
      id: 456456456,
      poster_path: '',
      vote_average: 5
    }]
  }];

  page = 10;
  resultsLength = 0;
  columnsToDisplay = ['title', 'description'];
  collections = new MatTableDataSource<CollectionsModel>();

  constructor() { }

  ngOnInit() {
    this.collections.data = this.defaultCollection;
  }

  goToCollectionDetails() {

  }

}

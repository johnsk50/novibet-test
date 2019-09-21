import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {CollectionsModel} from '../models/collections.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  defaultCollection: CollectionsModel[] = [{
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

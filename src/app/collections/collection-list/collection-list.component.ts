import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {CollectionsModel} from '../../models/collections.model';
import {CollectionsService} from '../../services/collections.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit, OnDestroy {

  // defaultCollection: CollectionsModel[] = [{
  //   id: 0,
  //   title: 'Test',
  //   description: 'This Is A Test',
  //   movies: [{
  //     title: 'test movie',
  //     id: 456456456,
  //     poster_path: '',
  //     vote_average: 5
  //   }]
  // }];
  sub: Subscription;

  page = 10;
  resultsLength = 0;
  columnsToDisplay = ['title', 'description', 'details'];
  collections = new MatTableDataSource<CollectionsModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.collections.paginator = this.paginator;
    this.sub = this.collectionsService.collectionsSubject.subscribe( collection => {
      this.resultsLength = collection.length;
      this.collections.data = collection;

    });
    // this.collections.data = this.defaultCollection;
  }

  goToCollectionDetails() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

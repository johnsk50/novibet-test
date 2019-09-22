import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {CollectionsModel} from '../../models/collections.model';
import {CollectionsService} from '../../services/collections.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  page = 10;
  resultsLength = 0;
  columnsToDisplay = ['title', 'description', 'details'];
  collections = new MatTableDataSource<CollectionsModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.collections.paginator = this.paginator;
    this.collections.data = this.collectionsService.fetchCollections();
    this.resultsLength = this.collections.data.length;
  }

  goToCollectionDetails() {

  }

}

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CollectionsService} from '../../services/collections.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Subscription} from 'rxjs';
import {CollectionsModel} from '../../models/collections.model';
import {CollectionSelectionInputData} from '../../models/collection-selection-input-data.model';

@Component({
  selector: 'app-collection-select',
  templateUrl: './collection-select.component.html',
  styleUrls: ['./collection-select.component.css']
})
export class CollectionSelectComponent implements OnInit, OnDestroy {

  sub: Subscription;
  collections: CollectionsModel[] = [];

  constructor(private collectionsService: CollectionsService,
              @Inject(MAT_DIALOG_DATA) public data: CollectionSelectionInputData) { }

  ngOnInit() {
    // this.sub = this.collectionsService.collectionsSubject
    //   .subscribe(result => {
    //     this.collections = result;
    //   });
    // console.log(this.data);
    this.collections = this.collectionsService.fetchCollections();
  }

  onCollectionClicked(cid: number) {
    this.collectionsService.addMoviesToCollection(cid, this.data.movies);
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}

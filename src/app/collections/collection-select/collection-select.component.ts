import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CollectionsService} from '../../services/collections.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CollectionsModel} from '../../models/collections.model';
import {CollectionSelectionInputData} from '../../models/collection-selection-input-data.model';

@Component({
  selector: 'app-collection-select',
  templateUrl: './collection-select.component.html',
  styleUrls: ['./collection-select.component.css']
})
export class CollectionSelectComponent implements OnInit {

  collections: CollectionsModel[] = [];

  constructor(private collectionsService: CollectionsService,
              @Inject(MAT_DIALOG_DATA) public data: CollectionSelectionInputData,
              public dialogRef: MatDialogRef<CollectionSelectComponent>) { }

  ngOnInit() {
    this.collections = this.collectionsService.fetchCollections();
  }

  onCollectionClicked(cid: number): void {
    this.collectionsService.addMoviesToCollection(cid, this.data.movies);
  }

  closePopUp(): void {
    this.dialogRef.close();
  }

}

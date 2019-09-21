import {Component, OnDestroy, OnInit} from '@angular/core';
import {CollectionsModel} from '../../models/collections.model';
import {MatTableDataSource} from '@angular/material';
import {CollectionsService} from '../../services/collections.service';
import {Subscription} from 'rxjs';
import {MoviesResults} from '../../models/movieResults.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit, OnDestroy {

  cid = 0;
  sub: Subscription;

  page = 10;
  resultsLength = 0;
  columnsToDisplay = ['title', 'vote_average', 'poster_path', 'details', 'removeItem'];
  movieList = new MatTableDataSource<MoviesResults>();

  collection = new CollectionsModel();

  hasMovies = false;

  constructor(private collectionsService: CollectionsService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    // this.cid = this.route.snapshot.queryParams.cid;
    this.route.params.subscribe((params: Params) => {
      this.cid = +params.cid;
    });

    this.collection = this.collectionsService.fetchMovies(this.cid);
    console.log('cid', this.cid);
    console.log('this.collection', this.collection);

    if (this.collection.movies && this.collection.movies.length > 0) {
      this.hasMovies = true;
      this.resultsLength = this.collection.movies.length;
      this.movieList.data = [...this.collection.movies];

    } else {
      this.hasMovies = false;
      this.movieList.data = [];
    }
    // this.sub = this.collectionsService.collectionsSubject.subscribe( collection => {
    //   this.collection.data = collection;
    // });
    // this.collection.data = this.defaultCollection;
    //console.log('in details!!!', this.collectionsService.fetchMovies(4));
    //if()
  }

  goToCollectionDetails(id: number) {

  }

  onRemoveMovie() {

  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

}

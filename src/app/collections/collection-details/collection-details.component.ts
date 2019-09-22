import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CollectionsModel} from '../../models/collections.model';
import {MatTableDataSource} from '@angular/material/table';
import {CollectionsService} from '../../services/collections.service';
import {Subscription} from 'rxjs';
import {MoviesResults} from '../../models/movie-results.model';
import {ActivatedRoute, Params} from '@angular/router';
import {MovieDetailsComponent} from '../../movie-details/movie-details.component';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  hasMovies = false;

  constructor(private collectionsService: CollectionsService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.movieList.paginator = this.paginator;
    this.route.params.subscribe((params: Params) => {
      this.cid = +params.cid;
    });

    this.collection = this.collectionsService.fetchCollectionDetails(this.cid);
    console.log('cid', this.cid);
    console.log('this.collection', this.collection);

    if (this.collection.movies && this.collection.movies.length > 0) {
      this.hasMovies = true;
      this.movieList.data = [...this.collection.movies];
      this.resultsLength = this.collection.movies.length;
    } else {
      this.hasMovies = false;
      this.movieList.data = [];
    }
    // this.sub = this.collectionsService.collectionsSubject.subscribe( collection => {
    //   this.collection.data = collection;
    // });
    // this.collection.data = this.defaultCollection;
    // console.log('in details!!!', this.collectionsService.fetchMovies(4));
    // if()

  }

  goToCollectionDetails(movieId: number) {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: '750px',
      data: { id: movieId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onRemoveMovie(movieId: number) {
    const movieIndex = this.movieList.data.findIndex(      item => item.id === movieId);
    this.movieList.data.splice(movieIndex, 1);
    this.movieList._updateChangeSubscription();
    this.collectionsService.removeMovie(this.cid, movieId);
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}

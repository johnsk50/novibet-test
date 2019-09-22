import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CollectionsModel} from '../../models/collections.model';
import {MatTableDataSource} from '@angular/material/table';
import {CollectionsService} from '../../services/collections.service';
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
export class CollectionDetailsComponent implements OnInit, AfterViewInit {

  cid = 0;
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
    this.route.params.subscribe((params: Params) => {
      this.cid = +params.cid;
    });

    this.collection = this.collectionsService.fetchCollectionDetails(this.cid);

    if (this.collection.movies && this.collection.movies.length > 0) {
      this.hasMovies = true;
      this.movieList.data = [...this.collection.movies];
      this.resultsLength = this.collection.movies.length;
    } else {
      this.hasMovies = false;
      this.movieList.data = [];
    }
  }

  ngAfterViewInit(): void {
    this.movieList.paginator = this.paginator;
  }

  goToCollectionDetails(movieId: number) {
    this.dialog.open(MovieDetailsComponent, {
      width: '750px',
      data: { id: movieId }
    });
  }

  onRemoveMovie(movieId: number) {
    const movieIndex = this.movieList.data.findIndex(      item => item.id === movieId);
    this.movieList.data.splice(movieIndex, 1);
    this.paginator.length = this.movieList.data.length;
    this.movieList._updateChangeSubscription();
    this.collectionsService.removeMovie(this.cid, movieId);
  }
}

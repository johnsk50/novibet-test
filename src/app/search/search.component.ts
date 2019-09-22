import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../services/search.service';
import {NgModel} from '@angular/forms';
import {MoviesResults} from '../models/movie-results.model';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MovieDetailsComponent} from '../movie-details/movie-details.component';
import {MatDialog} from '@angular/material/dialog';
import {CollectionSelectComponent} from '../collections/collection-select/collection-select.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  movies = new MatTableDataSource<MoviesResults>();
  selection = new SelectionModel<MoviesResults>(true, []);
  columnsToDisplay = ['select', 'title', 'vote_average', 'poster_path', 'details'];

  moviesData: MoviesResults[] = [];

  resultsLength = 0;
  page = 20;

  loadedPages = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private searchService: SearchService,
              public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.movies.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.movies.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.movies.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MoviesResults): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  searchMovie(searchField: NgModel) {
    if (searchField.valid) {
      this.moviesData = [];
      this.selection.clear();
      this.searchService.getSearchResults(searchField.value, 1).pipe(take(1)).subscribe(res => {
        this.paginator.pageIndex = 0;
        this.movies.data = res.results;
        this.page = res.results.length;
        this.resultsLength = res.total_results;
        this.paginator.length = res.total_results;
        this.loadedPages = 0;
      });
    }
  }

  goToNextPage(searchInput: string, event: PageEvent) {

    if (event.previousPageIndex < event.pageIndex && this.loadedPages < event.pageIndex) {
      this.searchService.getSearchResults(searchInput, event.pageIndex + 1).pipe(take(1)).subscribe(res => {
        this.movies.data.push(...res.results);
        setTimeout(() => {
          this.resultsLength = res.total_results;
          this.paginator.length = res.total_results;
        }, 0);
        this.movies._updateChangeSubscription();
        this.loadedPages++;
      });
    }
  }

  onClickDetails(movieId: number) {
    this.dialog.open(MovieDetailsComponent, {
      width: '750px',
      data: { id: movieId }
    });
  }

  onAddToCollection() {
    this.dialog.open(CollectionSelectComponent, {
      width: '750px',
      data: { movies: this.selection.selected }
    });
  }
}

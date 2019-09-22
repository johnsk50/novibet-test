import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../services/search.service';
import {NgModel} from '@angular/forms';
import {MoviesResults} from '../models/movie-results.model';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginator} from '@angular/material/paginator';
import {MovieDetailsComponent} from '../movie-details/movie-details.component';
import {MatDialog} from '@angular/material/dialog';
import {CollectionSelectComponent} from '../collections/collection-select/collection-select.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies = new MatTableDataSource<MoviesResults>();
  selection = new SelectionModel<MoviesResults>(true, []);
  url = 'https://image.tmdb.org/t/p/w500';
  columnsToDisplay = ['select', 'title', 'vote_average', 'poster_path', 'details'];

  moviesData: MoviesResults[] = [];

  resultsLength = 0;
  page = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private searchService: SearchService,
              public dialog: MatDialog) { }

  ngOnInit() {
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
      this.searchService.getSearchResults(searchField.value, 1).subscribe(res => {
        console.log(res);
        this.paginator.pageIndex = 0;
        res.results.forEach(x => {
          const tempItem = new MoviesResults();
          tempItem.id = x.id;
          tempItem.vote_average = x.vote_average;
          tempItem.title = x.title;
          tempItem.poster_path = x.poster_path ? this.url + x.poster_path : './../../../assets/images/no-image.png';
          this.moviesData.push(tempItem);
        });
        // this.moviesData.push(...res);

        // this.moviesData = this.moviesData;
        console.log('movies', this.movies.data);

        this.movies.data = this.moviesData;
        this.resultsLength = res.total_results;
        // this.movies.data.forEach(item => {
        //   item.poster_path =
        //     item.poster_path === null
        //       ? './../../../assets/images/no-image.png'
        //       : this.url + item.poster_path;
        // });
      });
      console.log('aa', searchField);
    }
  }

  goToNextPage(searchInput, event) {
    this.searchService.getSearchResults(searchInput, event.pageIndex + 1).subscribe(res => {
      console.log(res);
      // this.paginator.pageIndex = event.pageIndex;
      // res.results.forEach(x => {
      //   this.movies.data.push({
      //     poster_path: x.poster_path ? this.url + x.poster_path : './../../../assets/images/no-image.png',
      //     title: x.title,
      //     vote_average: x.vote_average,
      //     id: x.id
      //   });
      // })

      res.results.forEach(x => {
        const tempItem = new MoviesResults();
        tempItem.id = x.id;
        tempItem.vote_average = x.vote_average;
        tempItem.title = x.title;
        tempItem.poster_path = x.poster_path ? this.url + x.poster_path : './../../../assets/images/no-image.png';
        this.moviesData.push(tempItem);
      });
      // this.moviesData.push(tempList);
      console.log('movies', this.movies.data);
      this.movies.data = this.moviesData;
      this.resultsLength = res.total_results;
      // this.movies.data.push([...res.results]);
      // this.movies.data.forEach(item => {
      //   item.poster_path =
      //     item.poster_path === null
      //       ? './../../../assets/images/no-image.png'
      //       : this.url + item.poster_path;
      // });
    });
  }

  onClickDetails(movieId: number) {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: '750px',
      data: { id: movieId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onAddToCollection() {
    console.log('selected', this.selection.selected);

    const dialogRef = this.dialog.open(CollectionSelectComponent, {
      width: '750px',
      data: { movies: this.selection.selected }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}

export class Test {

}

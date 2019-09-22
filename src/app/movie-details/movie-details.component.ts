import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogInputData} from '../models/dialog-input-data.model';
import {SearchService} from '../services/search.service';
import {MovieDetailsModel} from '../models/movie-details.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails = new MovieDetailsModel();

  // slider properties
  disabled = false;
  max = 10;
  min = 0.5;
  step = 0.5;
  thumbLabel = true;
  value = 0.5;

  constructor( private searchService: SearchService,
               @Inject(MAT_DIALOG_DATA) public data: DialogInputData) { }

  ngOnInit() {
    console.log(this.data);

    this.searchService.getMovieDetails(this.data.id)
      .subscribe( result => {
        this.movieDetails = result;
        console.log('movieDetails', result);
      });
  }

  onRate() {
    this.searchService.rateMovie( this.data.id, this.value);
  }
}

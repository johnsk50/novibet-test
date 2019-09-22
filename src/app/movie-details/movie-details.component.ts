import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogInputData} from '../models/dialog-input-data.model';
import {SearchService} from '../services/search.service';
import {MovieDetailsModel} from '../models/movie-details.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails = new MovieDetailsModel();

  sub: Subscription;

  rateSuccessMessage = '';

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
    this.sub = this.searchService.rateMovie( this.data.id, this.value).subscribe( x => {
     if (x.status_code === 1) {
       this.rateSuccessMessage = 'Thank you for rating!';
     } else if (x.status_code === 12) {
       this.rateSuccessMessage = 'Your rating has been updated successfully';
     }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogInputData} from '../models/dialogInputData.model';
import {SearchService} from '../search.service';
import {MovieDetailsModel} from '../models/movieDetails.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  // public dialogRef: MatDialogRef<MovieDetailsComponent>,
  movieDetails = new MovieDetailsModel();

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

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}

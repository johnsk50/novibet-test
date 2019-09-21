import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MovieDetailsModel} from '../models/movieDetails.model';
import {MovieResultsModel} from '../models/movieResults.model';

@Injectable()
export class SearchService {

  url = 'https://image.tmdb.org/t/p/w500';

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    })
  };

  private guestSessionId = '';

  constructor(private http: HttpClient) {
  }

  getSearchResults(search: string, page: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('api_key', '85204a8cc33baf447559fb6d51b18313');
    searchParams = searchParams.append('language', 'en-US');
    searchParams = searchParams.append('include_adult', 'false');
    searchParams = searchParams.append('query', search);
    searchParams = searchParams.append('page', page.toString());

    return this.http
      .get<MovieResultsModel>(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: searchParams
        }
      ).pipe(map(responseData => {
        // let moviesResults: MoviesResults[] = [];
        //
        // moviesResults = [...responseData];
        // moviesResults.forEach( x => {
        //   x.poster_path = x.poster_path ? this.url + x.poster_path : './../../../assets/images/no-image.png';
        // });
        //
        // return moviesResults;

          return responseData;
        }
      ));
  }

  getMovieDetails(id: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('api_key', '85204a8cc33baf447559fb6d51b18313');
    searchParams = searchParams.append('language', 'en-US');

    return this.http
      .get<MovieDetailsModel>(
        'https://api.themoviedb.org/3/movie/' + id.toString(),
        {
          params: searchParams
        }
      ).pipe(map(responseData => {
          const movieDetails = new MovieDetailsModel();

          movieDetails.title = responseData.title;
          movieDetails.overview =  responseData.overview;
          movieDetails.poster_path =  responseData.poster_path ? this.url + responseData.poster_path : './../../../assets/images/no-image.png';
          movieDetails.budget =  responseData.budget;
          movieDetails.release_date =  responseData.release_date;
          movieDetails.revenue =  responseData.revenue;
          movieDetails.vote_average =  responseData.vote_average;
          movieDetails.vote_count =  responseData.vote_count;
          movieDetails.spoken_languages =  [...responseData.spoken_languages];

          return movieDetails;
        }
      ));
  }

  getGuestSessionId() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('api_key', '85204a8cc33baf447559fb6d51b18313');

    return this.http
      .get<GuestSessionResponse>(
        'https://api.themoviedb.org/3/authentication/guest_session/new',
        {
          params: searchParams
        }
      ).subscribe(response => {
        this.guestSessionId = response.guest_session_id;
        console.log('guest', response);
      });
  }

  rateMovie(movieId: number, rating: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('api_key', '85204a8cc33baf447559fb6d51b18313');
    searchParams = searchParams.append('guest_session_id', this.guestSessionId);

    this.http
      .post(
        'https://api.themoviedb.org/3/movie/' + movieId + '/rating',
        {value: rating,
          headers: this.headers},
        {
          //
          params: searchParams,
        }
      ).subscribe(response => {
      console.log('rating', response);
    });
  }

}

class GuestSessionResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;

  constructor() {
    this.guest_session_id = '';
    this.expires_at = '';
  }
}

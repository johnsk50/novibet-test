import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'novibet-test';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.getGuestSessionId();
  }
}

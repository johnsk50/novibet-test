import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from '@angular/common/http';
import {SearchService} from './search.service';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomDirectiveDirective} from './shared/customDirective.directive';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { CollectionsComponent } from './collections/collections.component';
import {AppRoutingModule} from './app-routing.module';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { CollectionCreationComponent } from './collections/collection-creation/collection-creation.component';
import { CollectionDetailsComponent } from './collections/collection-details/collection-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CustomDirectiveDirective,
    MovieDetailsComponent,
    HeaderComponent,
    CollectionsComponent,
    CollectionCreationComponent,
    CollectionDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    AppRoutingModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule

  ],
  entryComponents: [MovieDetailsComponent],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

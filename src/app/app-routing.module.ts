import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {CollectionsComponent} from './collections/collections.component';
import {CollectionCreationComponent} from './collections/collection-creation/collection-creation.component';
import {CollectionDetailsComponent} from './collections/collection-details/collection-details.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {
    path: 'collections',
    component: CollectionsComponent,
    children: [
      {path: '', component: CollectionDetailsComponent},
      {path: 'creation', component: CollectionCreationComponent},
    ]
  },
  {path: '**', redirectTo: '/search'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports:  [RouterModule]
})
export class AppRoutingModule {}

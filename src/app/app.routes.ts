import { Routes } from '@angular/router';
import {StoreHomepage} from './main/component/store-homepage/store-homepage';
import {BooksCard} from './main/component/books-card/books-card';
import {Quest} from './main/component/quest/quest/quest';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: StoreHomepage },
  { path: 'books-card', component: BooksCard },
  { path: 'quest/:id', component: Quest }
];

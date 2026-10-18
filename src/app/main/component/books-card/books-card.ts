import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model/book-model';
import {RouterLink} from '@angular/router';
import {Quest} from '../quest/quest/quest';
import {BookstoreTag} from '../bookstore-tag/bookstore-tag';
import {map} from 'rxjs';

@Component({
  imports: [
    RouterLink,
    BookstoreTag
  ],
  standalone: true,
  selector: 'app-books-card',
  styleUrl: './books-card.css',
  templateUrl: './books-card.html',
})
export class BooksCard {
  @Input() books: Array<Book> = [];
  protected defaultTone = '#eebd5d';
  protected tagTone: Map<string, string> = new Map<string, string>([
    ['EASY', '#d5edec'],
    ['MEDIUM', '#eef09c'],
    ['HARD', '#f04673'],
  ]);
}

import {ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {BooksCard} from '../books-card/books-card';
import {Book, PossibleValues} from '../../model/book-model';
import {BookService} from '../../service/book-service';
import {BookstoreTag} from '../bookstore-tag/bookstore-tag';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  imports: [
    BooksCard,
    BookstoreTag
  ],
  selector: 'app-store-homepage',
  styleUrl: './store-homepage.css',
  templateUrl: './store-homepage.html',
  standalone: true
})
export class StoreHomepage implements OnInit {
  protected filterPossibleValues: string[] = [];
  protected filtersSelected: Array<string> = [];
  protected books: Array<Book> = [];

  private valueToField = new Map<string, string>();

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {
  }

  ngOnInit(): void {
    this.fetchPossibleValues();
    this.fetchAllBooks();
  }

  onSearchByTitle(title: string) {
    return this.bookService.searchByTittle(title)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(books => {
        this.books = books
        this.cdr.detectChanges();
      });
  }

  onFilterSelectionChange(values: string[]): void {
    this.filtersSelected = [...values];

    if (!this.filtersSelected.length) {
      this.fetchAllBooks();
      return;
    }

    const filtersByField = new Map<string, string[]>();

    for (const value of this.filtersSelected) {
      const field = this.valueToField.get(value);
      if (!field) continue;

      const current = filtersByField.get(field) ?? [];
      filtersByField.set(field, [...current, value]);
    }

    const filters: PossibleValues[] = [];
    filtersByField.forEach((value, field) => {
      filters.push({ field, value });
    });

    this.bookService.findByFilter(filters)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.books = response;
        this.cdr.detectChanges();
      });
  }

  fetchAllBooks(): void {
    this.bookService.findAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        books => {
          this.books = books;
          this.cdr.detectChanges();
        },
      );
  }

  private fetchPossibleValues() {
    this.bookService.getPossibleValues()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(possibleValues => {
        this.valueToField.clear();
        this.filterPossibleValues = possibleValues.flatMap(({field, value}) => {
          value.forEach((v) => this.valueToField.set(v, field));
          return value;
        });
        this.cdr.detectChanges();
      });
  }
}

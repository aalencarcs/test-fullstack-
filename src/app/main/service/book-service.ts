import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable, Service} from '@angular/core';
import {BehaviorSubject, map, Observable, of, tap} from "rxjs";
import {Book, BookResponse, PossibleValues} from '../model/book-model';
import {BookAdapter} from '../adapter/book-adapter';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly API_URL = '/test';
  private readonly adapter = new BookAdapter();
  private readonly selectedBookSubject = new BehaviorSubject<Book[] | null>([]);

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getPossibleValues(): Observable<PossibleValues[]> {
    return this.httpClient
      .get<PossibleValues[]>(`${this.API_URL}/possibleValues`);
  }

  searchByTittle(title: string): Observable<Book[]> {
    const params = new HttpParams().set('title', title ?? '');
    return this.httpClient
      .get<BookResponse[]>(`${this.API_URL}/byTitle`, {params})
      .pipe(map((books) => books.map((book) => this.adapter.adaptResponse(book))));
  }

  findByFilter(filters: PossibleValues[]): Observable<Book[]> {
    return this.httpClient
      .post<BookResponse[]>(`${this.API_URL}/booksByFilter`, filters)
      .pipe(map((books) => books.map((book) => this.adapter.adaptResponse(book))));
  }

  findAll(): Observable<Book[]> {
    return this.httpClient
      .get<BookResponse[]>(`${this.API_URL}/findAll`)
      .pipe(
        map((books) => books.map((book) => this.adapter.adaptResponse(book))),
        tap((books) => this.selectedBookSubject.next(books))
      );
  }

  getBookById(id: number): Observable<Book | undefined> {
    const cachedBooks = this.selectedBookSubject.value ?? [];
    const cachedBook = cachedBooks.find((book: Book) => book.id === id);

    if (cachedBook) {
      return of(cachedBook);
    }

    return this.findAll().pipe(
      map((books) => books.find((book) => +book.id === id))
    )
  }
}

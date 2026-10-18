import {Injectable, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {UserProgressAdapter} from '../adapter/user-progress-adapter';
import {UserProgress, UserProgressRequest, UserProgressResponse} from '../model/user-progress';

@Injectable({
  providedIn: 'root',
})
export class UserProgressService {
  private readonly adapter = new UserProgressAdapter();
  private readonly USER_PROGRESS_HTTP: string = '/test/user-progress';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getUserProgress(bookId: number): Observable<UserProgress | undefined> {
    return this.httpClient
      .get<UserProgressResponse | null>(`${this.USER_PROGRESS_HTTP}/${bookId}`)
      .pipe(map((response) => this.adapter.adapt(response)));
  }

  public saveProgress(userRequest: UserProgress): Observable<UserProgress | undefined> {

    return this.httpClient
      .post<UserProgressResponse | null>(`${this.USER_PROGRESS_HTTP}/save`, this.adapter.adaptRequest(userRequest))
      .pipe(map((progress) => this.adapter.adapt(progress)));
  }
}

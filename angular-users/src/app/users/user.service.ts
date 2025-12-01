import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export type UsersState =
  | 'idle'
  | 'loading'
  | 'loaded'
  | 'empty'
  | 'error';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:4000';

  private stateSubject = new BehaviorSubject<UsersState>('idle');
  state$ = this.stateSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    this.stateSubject.next('loading');

    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map((users) => {
        if (!users.length) {
          this.stateSubject.next('empty');
        } else {
          this.stateSubject.next('loaded');
        }
        return users;
      }),
      catchError((err) => {
        this.stateSubject.next('error');
        return throwError(() => err);
      })
    );
  }

  createUser(payload: { name: string; email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, payload);
  }

  updateUser(
    id: number,
    payload: { name?: string; email?: string; password?: string }
  ): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, payload);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}

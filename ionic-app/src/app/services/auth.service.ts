import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:4000';
  private readonly tokenKey = 'auth_token';

  private loggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.loggedInSubject.next(true);
        })
      );
  }

  logout(): void {
    this.clearToken();
    this.loggedInSubject.next(false);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return window.localStorage.getItem(this.tokenKey);
    } catch {
      return null;
    }
  }

  private setToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(this.tokenKey, token);
    } catch {
      // ignore
    }
  }

  private clearToken(): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.removeItem(this.tokenKey);
    } catch {
      // ignore
    }
  }
}


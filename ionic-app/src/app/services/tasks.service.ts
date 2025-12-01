import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly apiUrl = 'http://localhost:4000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/list`);
  }
}


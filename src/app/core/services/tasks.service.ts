import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = environment.apiTasksUrl;

  constructor(private http: HttpClient) {}

  private getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?userId=${this.getUserId()}`);
  }

  createTask(task: Partial<Task>): Observable<Task> {
    const taskWithUser = { ...task, userId: this.getUserId() };
    return this.http.post<Task>(this.apiUrl, taskWithUser);
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    const taskWithUser = { ...task, userId: this.getUserId() };
    return this.http.put<Task>(`${this.apiUrl}/${id}`, taskWithUser);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';

const USER_ID = 6548;
const API_URL = 'https://mate.academy/students-api';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private http: HttpClient,
  ) { }

  getTodos() {
    return this.http.get<Todo[]>(`${API_URL}//todos?userId=${USER_ID}`);
  };

  createTodo(title: string) {
    return this.http.post<Todo>(`${API_URL}/todos`, {
      title,
      userId: USER_ID,
      completed: false,
    })
  }
}

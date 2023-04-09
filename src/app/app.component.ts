import { Component, OnInit } from '@angular/core';
import { Todo } from './types/todo';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
    return this._todos
  };

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter(todo => !todo.completed);
  }

  constructor(
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.loadTodos()
  }

  loadTodos() {
    this.todosService.getTodos()
    .subscribe((todos) => this.todos = todos)
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle)
      .subscribe(() => this.loadTodos())
  }

  renameTodo(todoId: number, newTitle: string) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo
      }

      return { ...todo, title: newTitle}
    })
  }

  toogleTodo(todoId: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo
      }

      return { ...todo, completed: !todo.completed}
    })
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter(todo => todo.id !== todoId)
  }
}

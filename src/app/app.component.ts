import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const todos = [
  {id: 1, title: 'hi angular', completed: false},
  {id: 2, title: 'i will learn you', completed: false},
  {id: 3, title: '123', completed: true},
  {id: 4, title: 'test test', completed: false},
];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  editing = false;
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked
  }

  get activeTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  addTodo() {
    if (this.title.invalid) {
      return
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: this.title.value as string,
      completed: false,
    };

    this.todos.push(newTodo);
    this.todoForm.reset();
  }
}

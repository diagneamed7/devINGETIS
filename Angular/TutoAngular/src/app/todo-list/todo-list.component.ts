import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  todos = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a Todo App', completed: true },
    { id: 3, title: 'Deploy to Production', completed: false }
  ];
todoItem: any;

  addTodo() {
    this.todos.push({title: 'New Todo', completed: false, id: this.todos.length + 1});
   }
   removeTodo() {
    this.todos.pop();
  }
onTodocompleted(isCompleted: boolean) {
alert('Todo completed: ' + isCompleted);
}
}

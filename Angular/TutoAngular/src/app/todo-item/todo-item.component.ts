import { Component, EventEmitter, Input, input, Output } from '@angular/core';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styles: `
  .completed{
    color: green;
}
.not-completed{
    color: red;
}`
})

export class TodoItemComponent {
  title = 1
  completed = false;
@Input() todoItem!: TodoItem;
@Output() completeStatusChange = new EventEmitter<boolean>();



  completeTodo(todoItem: TodoItem, completed:boolean){
    todoItem.completed = completed;
    this.completeStatusChange.emit(completed);
  }
}

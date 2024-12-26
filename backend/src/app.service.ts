import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'To do app';
  }

  getTodos(): any[] {
    return ['todo1', 'todo2'];
  }

  addTodo(): string {
    return 'todo added';
  }

  updateTodo(id: any): string {
    return 'todo updated';
  }

  deleteTodo(id: any): string {
    return 'todo deleted';
  }
}

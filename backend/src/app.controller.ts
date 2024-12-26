import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('todo')
  // getTodos(): any[] {
  //   return this.appService.getTodos();
  // }

  // @Post('todo')
  // addsTodo(): string {
  //   return this.appService.addTodo();
  // }

  // @Put('todo/:id')
  // updateTodo(): string {
  //   return this.appService.updateTodo('1');
  // }

  // @Delete('todo/:id')
  // deleteTodo(): string {
  //   return this.appService.deleteTodo('1');
  // }
}

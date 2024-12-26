import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todos } from 'src/todo.model';

@Module({
  imports: [SequelizeModule.forFeature([Todos])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

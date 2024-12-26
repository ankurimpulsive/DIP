import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from 'src/todo.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {

  constructor(
    @InjectModel(Todos)
    private todoModel: typeof Todos,
  ) {}

  async findAll(): Promise<any[]> {
    return this.todoModel.findAll()
  }

  findOne(id: any): Promise<any> {
    return this.todoModel.findOne({
      where: {
        id,
      },
    });
  }

  create(createTodoDto: CreateTodoDto, ) {
    return this.todoModel.create({...createTodoDto});
   }

  update(id: number, updateTodoDto: UpdateTodoDto, ) {
    return this.todoModel.update({...updateTodoDto}, {where: {id}});
   }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await todo.destroy();
  }
}

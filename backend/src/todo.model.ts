import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Todos extends Model {

  @Column
  todo: string;

  @Column
  isCompleted: boolean;
  
}
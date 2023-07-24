import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDTO } from 'src/todos/dtos/createtodo.dto';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private tododb: Repository<Todo>,
  ) {}

  async getTodos() {
    return this.tododb.find();
  }

    async createTodo(info: CreateTodoDTO) {
    return await this.tododb.save(this.tododb.create(info));
  }

  async updateTodo() {}

  async deleteTodo() {}
}

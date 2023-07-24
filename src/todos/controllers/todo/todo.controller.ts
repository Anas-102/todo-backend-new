import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateTodoDTO } from 'src/todos/dtos/createtodo.dto';
import { TodoService } from 'src/todos/services/todo/todo.service';


@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService
    ){}

    @Get('todos')
    getTodos() { 
        return this.todoService.getTodos();
    }
    
    @Post('create')
    createTodo(@Body()info: CreateTodoDTO) { 
        return this.todoService.createTodo(info)
    }
    
    @Put('modify')
    updateTodo() { }
    
    @Delete('delete')
    deleteTodo() { }
    

}

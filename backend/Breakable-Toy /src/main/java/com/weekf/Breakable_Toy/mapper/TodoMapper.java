package com.weekf.Breakable_Toy.mapper;

import com.weekf.Breakable_Toy.dto.TodoDto;
import com.weekf.Breakable_Toy.entity.Todo;

public class TodoMapper {
    public static TodoDto mapToTodoDto(Todo todo){
        return new TodoDto(
                todo.getId(),
                todo.getText(),
                todo.getCreatedAt(),
                todo.getDueDate(),
                todo.isDone(),
                todo.getPriority()
        );
    }
    public static Todo mapToTodo(TodoDto tododto){
        return new Todo(
                tododto.getId(),
                tododto.getText(),
                tododto.getCreatedAt(),
                tododto.getDueDate(),
                tododto.isDone(),
                tododto.getPriority()
        );

    }
}

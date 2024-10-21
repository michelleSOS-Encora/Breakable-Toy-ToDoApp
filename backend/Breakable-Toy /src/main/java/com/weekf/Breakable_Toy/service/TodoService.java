package com.weekf.Breakable_Toy.service;

import com.weekf.Breakable_Toy.dto.*;
import com.weekf.Breakable_Toy.entity.Todo;

import java.util.*;

public interface TodoService {
    TodoDto createTodo(TodoDto todoDto);
    TodoDto getToDoById(Long id);
    List<TodoDto> callTodos();
    TodoDto updateTodo(Long id, TodoDto updatedDto);
    void deleteTodo(Long id);
    Todo markAsDoneOrUndone(Long id, boolean done);
     PaginatedResponse getTodosPagination(int page, int size, String sortBy, String sortDirection, String priority, Boolean done, String name);
}

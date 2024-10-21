package com.weekf.Breakable_Toy.service.impl;
import com.weekf.Breakable_Toy.dto.PaginatedResponse;
import com.weekf.Breakable_Toy.dto.TodoDto;
import com.weekf.Breakable_Toy.entity.Todo;
import com.weekf.Breakable_Toy.exception.ResourceNotFoundException;
import com.weekf.Breakable_Toy.mapper.TodoMapper;
import com.weekf.Breakable_Toy.repository.ToDoRepository;
import com.weekf.Breakable_Toy.service.TodoService;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
    private ToDoRepository toDoRepository;
    @Override
    public TodoDto createTodo(TodoDto todoDto) {
        Todo todo= TodoMapper.mapToTodo(todoDto);
        Todo savedTodo= toDoRepository.save(todo);

        return TodoMapper.mapToTodoDto(savedTodo);
    }

    @SneakyThrows
    @Override
    public TodoDto getToDoById(Long id) {
        toDoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Task not found"));
        return null;
    }

    @Override
    public List<TodoDto> callTodos() {
        List<Todo> todos=toDoRepository.findAll();
        return todos.stream().map(TodoMapper::mapToTodoDto).collect(Collectors.toList());
    }

    @SneakyThrows
    @Override
    public TodoDto updateTodo(Long id, TodoDto updatedDto) {
        Todo todo = toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Task not found")
        );
        //  return null;
        todo.setText(updatedDto.getText());
        //todo.setDone(updatedDto.);
        todo.setCompletedAt(updatedDto.getCompletedAt());
        todo.setDueDate(updatedDto.getDueDate());
        todo.setPriority(updatedDto.getPriority());
        todo.setDone(updatedDto.isDone());

        Todo updatedDtoObj= toDoRepository.save(todo);
        return TodoMapper.mapToTodoDto(updatedDtoObj);
    }

    @SneakyThrows
    @Override
    public void deleteTodo(Long id) {
        Todo todo = toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Task not found")
        );
        toDoRepository.deleteById(id);
    }

    @Override
    public Todo markAsDoneOrUndone(Long id, boolean done) {
        Optional<Todo> toDoOpt = toDoRepository.findById(id);
        if (toDoOpt.isPresent()) {
            Todo toDo = toDoOpt.get();
            toDo.setDone(done);
            toDo.setCompletedAt(done ? LocalDateTime.now() : null);
            return toDo;
        }
        throw new ResourceNotFoundException("Task not found to mark as done");
    }
    //Pagination
    @Override
    public PaginatedResponse<Todo> getTodosPagination(int page, int size, String sortBy, String sortDirection, String priority, Boolean done, String name) {
        return toDoRepository.findTodos(page, size, sortBy, sortDirection, priority, done, name);
    }
}



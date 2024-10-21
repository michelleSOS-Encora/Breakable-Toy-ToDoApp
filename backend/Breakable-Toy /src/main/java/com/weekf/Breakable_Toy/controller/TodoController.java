package com.weekf.Breakable_Toy.controller;
import com.weekf.Breakable_Toy.dto.PaginatedResponse;
import com.weekf.Breakable_Toy.dto.TodoDto;
import com.weekf.Breakable_Toy.entity.Todo;
import com.weekf.Breakable_Toy.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@AllArgsConstructor
@RestController
@RequestMapping("/api/todo")
public class TodoController {
    private TodoService toDoService;
    //api
    @PostMapping
    public ResponseEntity<TodoDto>createTodo(@RequestBody TodoDto todoDto){
        TodoDto savedTodo=toDoService.createTodo(todoDto);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }
    //bout get rest api
    @GetMapping("{id}")
    public ResponseEntity<TodoDto>getTodoById(@PathVariable("id") Long id){
        //  Long id;
        TodoDto todoDto=toDoService.getToDoById(id);
        return ResponseEntity.ok(todoDto);
    }
    //build get id rest api
    @GetMapping("{id}")
    public ResponseEntity<TodoDto>getToDoById(@PathVariable("id")Long id){
        TodoDto todoDto=toDoService.getToDoById(id);
        return ResponseEntity.ok(todoDto);
    }
    //build api to get all the todos
    @GetMapping
    public ResponseEntity<List<TodoDto>> callTodos(){
        List<TodoDto>todos=toDoService.callTodos();
        return ResponseEntity.ok(todos);
    }

    //build update todo rest api
    @PutMapping("{id}")
    public ResponseEntity <TodoDto> updateTodo(@PathVariable("id") Long id,
                                                    @RequestBody  TodoDto updatedTodo){
       TodoDto todoDto= toDoService.updateTodo(id,updatedTodo);
      // return ResponseEntity.ok(Collections.singletonList(todoDto));
       return ResponseEntity.ok(todoDto);
    }
    //build delete rest api
    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteTodo(@PathVariable("id") Long id){
        toDoService.deleteTodo(id);
        return ResponseEntity.ok("Task deleted successfully");
    }

    //build pagination
    @GetMapping
    public PaginatedResponse getTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDirection,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean done,
            @RequestParam(required = false) String name
    ) {
        return toDoService.getTodosPagination(page, size, sortBy, sortDirection, priority, done, name);
    }
    //update as done
    @PutMapping("/{id}/done")
    public Todo markAsDone(@PathVariable Long id) {
        return toDoService.markAsDoneOrUndone(id, true);
    }
//update as not finished
    @PutMapping("/{id}/undone")
    public Todo markAsUndone(@PathVariable Long id) {
        return toDoService.markAsDoneOrUndone(id, false);
    }
}

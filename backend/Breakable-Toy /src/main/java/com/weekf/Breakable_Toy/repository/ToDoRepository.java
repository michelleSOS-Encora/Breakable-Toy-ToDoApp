package com.weekf.Breakable_Toy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.weekf.Breakable_Toy.dto.PaginatedResponse;
import com.weekf.Breakable_Toy.entity.Todo;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public interface ToDoRepository extends JpaRepository {
    List<Todo> todos = new ArrayList<>();

    Map<String, Integer> priorityOrder = Map.of(
            "High", 1,
            "Medium", 2,
            "Low", 3
    );
//pagination
    public default PaginatedResponse<Todo> findTodos(int page, int size, String sortBy, String sortDirection, String priority, Boolean done, String name) {

        List<Todo> filteredTodos = new ArrayList<>();
        for (Todo todo3 : todos) {
            if (priority == null) {
                if (done == null || todo3.isDone() == done) {
                    if (name == null || todo3.getText().toLowerCase().contains(name.toLowerCase())) {
                        filteredTodos.add(todo3);
                    }
                }
            }
        }
        filteredTodos.sort((todo1, todo2) -> {
            Comparator<Todo> comparator;

            if (sortBy == null) {
                comparator = Comparator.comparing(Todo::getCreatedAt);
            } else {
                comparator = switch (sortBy) {
                    case "priority" -> Comparator.comparing(todo -> priorityOrder.get(todo.getPriority()));
                    case "dueDate" ->
                            Comparator.comparing(Todo::getDueDate, Comparator.nullsLast(Comparator.naturalOrder()));
                    default -> Comparator.comparing(Todo::getCreatedAt);
                };
            }

            if ("desc".equalsIgnoreCase(sortDirection)) {
                comparator = comparator.reversed();
            }

            return comparator.compare(todo1, todo2);
        });

        int totalElements = filteredTodos.size();
        List<Todo> paginatedTodos = filteredTodos.stream()
                .skip((long) page *size)
                .limit(size).
                collect(Collectors.toList());

        return new PaginatedResponse<>(paginatedTodos, page, size, totalElements);
    }



    default Todo save(Todo toDo) {
        todos.add(toDo);
        return toDo;
    }

    default Optional<Todo> findById(Long id) {
        return todos.stream().filter(todo -> todo.getId().equals(id)).findFirst();
    }

    default void deleteById(Long id) {
        todos.removeIf(todo -> todo.getId().equals(id));
    }
}




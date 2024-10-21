package com.weekf.Breakable_Toy.config;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.weekf.Breakable_Toy.repository.ToDoRepository;
import com.weekf.Breakable_Toy.entity.*;
import java.time.LocalDateTime;
import java.util.*;

@Configuration
public class DataLoader {
    @Bean
    public CommandLineRunner loadData(ToDoRepository toDoRepository) {
        return _ -> {
            List<String> priorities = Arrays.asList("High", "Medium", "Low");
            Random random = new Random();
            int randomitem = random.nextInt(priorities.size());
            for (int i = 1; i <= 20; i++) {
                Todo todo = new Todo();
                todo.setId((long) i);
                todo.setText("Task " + i);
                todo.setPriority(Priority.valueOf(priorities.get(randomitem)));
                todo.setDone(random.nextBoolean());

                LocalDateTime creationDate = LocalDateTime.now().minusDays(random.nextInt(30));
                todo.setCreatedAt(creationDate);
                if (todo.isDone()) {
                    LocalDateTime doneDate = creationDate.plusDays(random.nextInt(30));
                    todo.setCompletedAt(doneDate);
                }

                LocalDateTime dueDate = random.nextBoolean() ?
                        LocalDateTime.now().plusDays(random.nextInt(30)) :
                        null;
                todo.setDueDate(dueDate);

                toDoRepository.save(todo);
            }
        };
    }
}

package com.weekf.Breakable_Toy.dto;

import com.weekf.Breakable_Toy.entity.Priority;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {
    private Long id;

    private String text;
    private LocalDateTime createdAt;
    private LocalDateTime dueDate;
    private boolean done;
    private LocalDateTime completedAt;
    private Priority priority;

    public TodoDto(Long id, String text, LocalDateTime createdAt, LocalDateTime dueDate, boolean done, Priority priority) {

        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.dueDate = dueDate;
        this.done = done;
        this.priority = priority;
        this.completedAt = LocalDateTime.now();

    }
}

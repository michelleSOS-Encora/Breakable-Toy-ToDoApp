package com.weekf.Breakable_Toy.entity;

import lombok.*;

import java.time.LocalDateTime;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
//@Entity
public class Todo {
    //sets and gets
    //  @Generated(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;
//@Size(max=30)
    @Getter
    private String text;
    //
    @Getter
    private LocalDateTime createdAt;
    @Getter
    private LocalDateTime dueDate;
    @Setter
    @Getter
    private boolean done;
    private LocalDateTime completedAt;
    @Setter
    @Getter
    private Priority priority;


    public Todo(Long id, String text,  LocalDateTime createdAt, LocalDateTime dueDate, boolean done, Priority priority) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.priority = priority;
        this.dueDate=dueDate;
        this.done=false;
        this.createdAt=LocalDateTime.now();
    }


}

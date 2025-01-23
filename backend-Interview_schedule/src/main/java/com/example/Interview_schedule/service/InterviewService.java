package com.example.Interview_schedule.service;

import com.example.Interview_schedule.model.Interview;
import com.example.Interview_schedule.repository.InterviewRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class InterviewService {

    private final InterviewRepository repository;

    public InterviewService(InterviewRepository repository) {
        this.repository = repository;
    }

//    public List<Interview> getAllInterviews() {
//        return repository.findAll();
//    }

    @Async
    public CompletableFuture<Interview> saveInterview(Interview interview) {
        return CompletableFuture.completedFuture(repository.save(interview));
    }
}

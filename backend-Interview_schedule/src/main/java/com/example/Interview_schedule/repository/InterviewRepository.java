package com.example.Interview_schedule.repository;

import com.example.Interview_schedule.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
}

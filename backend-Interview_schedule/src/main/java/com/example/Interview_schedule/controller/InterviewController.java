package com.example.Interview_schedule.controller;

import com.example.Interview_schedule.entity.ResponseMessage;
import com.example.Interview_schedule.model.Interview;
import com.example.Interview_schedule.service.EmailService;
import com.example.Interview_schedule.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "http://localhost:4200")
public class InterviewController {
    @Autowired
    private EmailService emailService;

    private final InterviewService service;

    public InterviewController(InterviewService service) {
        this.service = service;
    }

//    @GetMapping
//    public List<Interview> getAllInterviews() {
//        return service.getAllInterviews();
//    }

    @PostMapping
    public CompletableFuture<Interview> createInterview(@RequestBody Interview interview) {
        return service.saveInterview(interview);
    }

//    public ResponseEntity<ResponseMessage> scheduleInterview(@RequestBody Interview request) {
//        // To candidate
//        String candidateEmailBody = "Dear " + request.getCandidateName() + ",\n\n"
//                + "Your interview has been scheduled on " + request.getInterviewDate() + " at " + request.getInterviewTime()
//                + " with " + request.getInterviewerName() +
//                ".\nHere is the meeting link: " + request.getMeetLink()     + "\n\n*Note* " + request.getDescription() +  "\n\nRegards, Team";
//        emailService.sendEmail(request.getCandidateEmail(), "Interview Scheduled", candidateEmailBody);
//
//        // To interviewer
//        String interviewerEmailBody = "Dear " + request.getInterviewerName() + ",\n\n"
//                + "An interview has been scheduled with " + request.getCandidateName() + " on " + request.getInterviewDate()
//                + " at " + request.getInterviewTime() +
//                ".\nHere is the meeting link: " + request.getMeetLink() + "\n\n*Note* " + request.getDescription() + "\n\nRegards, Team";
//        emailService.sendEmail(request.getInterviewerEmail(), "Interview Scheduled", interviewerEmailBody);
//
//        ResponseMessage responseMessage = new ResponseMessage("Interview scheduled and emails sent!");
//        return ResponseEntity.ok(responseMessage);
//    }
//    public ResponseEntity<ResponseMessage> scheduleInterview(@RequestBody Interview request) {
//        String emailBody = "Dear " + request.getCandidateName() + " and " + request.getInterviewerName() + ",\n\n"
//                + "An interview has been scheduled:\n"
//                + "Date: " + request.getInterviewDate() + "\n"
//                + "Time: " + request.getInterviewTime() + "\n"
//                + "Meeting Link: " + request.getMeetLink() + "\n\n"
//                + "*Note*: " + request.getDescription() + "\n\nRegards, Team";
//
//        emailService.sendEmailWithCC(
//                request.getCandidateEmail(),
//                "Interview Scheduled",
//                emailBody,
//                request.getInterviewerEmail()
//        );
//
//        ResponseMessage responseMessage = new ResponseMessage("Interview scheduled and emails sent!");
//        return ResponseEntity.ok(responseMessage);
//    }

    @PostMapping("/schedule")
    public ResponseEntity<ResponseMessage> scheduleInterview(@RequestBody Interview request) {
        Interview savedInterview = service.saveInterview(request).join();

        String emailBody = "Dear " + savedInterview.getCandidateName() + " and " + savedInterview.getInterviewerName() + ",\n\n"
                + "An interview has been scheduled:\n"
                + "Date: " + savedInterview.getInterviewDate() + "\n"
                + "Time: " + savedInterview.getInterviewTime() + "\n"
                + "Meeting Link: " + savedInterview.getMeetLink() + "\n\n"
                + "*Note*: " + savedInterview.getDescription() + "\n\nRegards, Team";

//        emailService.sendEmailWithCC(
//                savedInterview.getCandidateEmail(),
//                "Interview Scheduled",
//                emailBody,
//                savedInterview.getInterviewerEmail()
//        );
        CompletableFuture.runAsync(() ->
                emailService.sendEmailWithCC(savedInterview.getCandidateEmail(), "Interview Scheduled", emailBody, savedInterview.getInterviewerEmail())
        );

        ResponseMessage responseMessage = new ResponseMessage("Interview scheduled and emails sent!");
        return ResponseEntity.ok(responseMessage);
    }

}

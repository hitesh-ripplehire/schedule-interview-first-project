package com.example.Interview_schedule.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

//    public void sendEmail(String to, String subject, String body) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject(subject);
//        message.setText(body);
//
//        mailSender.send(message);
//    }

    @Async
    public void sendEmailWithCC(String to, String subject, String body, String cc) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
//            MimeMessage message = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            message.setCc(cc);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

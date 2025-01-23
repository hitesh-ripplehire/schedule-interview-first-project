import { Component } from '@angular/core';
import { InterviewService } from '../interview.service';
import { EmailService } from '../email.service';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-schedule-interview',
  standalone: false,

  templateUrl: './schedule-interview.component.html',
  styleUrl: './schedule-interview.component.css'
})
export class ScheduleInterviewComponent {
  interview = {
    candidateName: '',
    candidatePhone: '',
    candidateEmail: '',

    interviewerName: '',
    interviewerPhone: '',
    interviewerEmail: '',

    meetLink: '',
    interviewDate: '',
    interviewTime: '',
    description: ''
  };

  constructor(
    private interviewService: InterviewService,
    private emailService: EmailService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) { }

  // onSubmit() {
  //   this.interviewService.saveInterview(this.interview).subscribe(
  //     (response) => {
  //       console.log(response);
  //       alert('Interview scheduled successfully!');



  //       // this.interview = {
  //       //   candidateName: '',
  //       //   candidatePhone: '',
  //       //   candidateEmail: '',
  //       //   interviewerName: '',
  //       //   interviewerPhone: '',
  //       //   interviewerEmail: '',
  //       //   meetLink: '',
  //       //   interviewDate: '',
  //       //   interviewTime: '',
  //       //   description: '',
  //       // };
  //     },
  //     (error) => {
  //       alert('Error scheduling the interview');
  //       console.error(error);
  //     }
  //   );
  //   this.emailService.sendEmail(this.interview).subscribe(
  //     (emailResponse) => {
  //       console.log(emailResponse);
  //       // alert('Emails sent successfully to candidate and interviewer!');
  //     },
  //     (error) => {
  //       console.log('Error sending email:', error);
  //       // alert('Failed to send emails.');
  //       // if (error) {
  //       //   alert('Failed to send emails.');
  //       //   console.error('Error sending email:', error);
  //       // }
  //     }
  //   );
  // }

  // onSubmit() {
  //   this.interviewService.saveInterview(this.interview).subscribe(
  //     (response) => {
  //       console.log(this.interview);
  //       alert('Interview scheduled successfully!');
  //       if (response) {
  //         this.onhandleSendEmail(response);
  //       }
  //       this.resetInterview();
  //     },
  //     (error) => {
  //       alert('Error scheduling the interview');
  //       console.error(error);
  //     }
  //   );

  // }

  onSubmit(interviewForm: any) {
    if (interviewForm.valid) {
      this.interviewService.saveInterview(this.interview).subscribe({
        next: (response) => {
          console.log('Interview scheduled:', response);
          // alert('Interview successfully scheduled!');
          this.snackBar.open('Interview scheduled and emails sent successfully!', 'Close', {
            duration: 5000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          if (response) {
            // this.onhandleSendEmail(response);
            // onhandleSendEmail(response: any) {
              this.interviewService.sendEmail(response).subscribe(
                (emailResponse) => {
                  console.log(emailResponse);
                  // alert('Emails sent successfully to candidate and interviewer!');
                },
                // (error) => {
                //   console.log('Error sending email:', error);
                // }
              );
            // }
          }
          
          interviewForm.resetForm();
        },
        error: (err) => {
          console.error('Error scheduling interview:', err);
          alert('An error occurred while scheduling the interview.');
        },
      });
    }
  }

  // onhandleSendEmail(response: any) {
  //   this.emailService.sendEmail(response).subscribe(
  //     (emailResponse) => {
  //       console.log(emailResponse);
  //       // alert('Emails sent successfully to candidate and interviewer!');
  //     },
  //     // (error) => {
  //     //   console.log('Error sending email:', error);
  //     // }
  //   );
  // }

  resetInterview() {
    this.interview = {
      candidateName: '',
      candidatePhone: '',
      candidateEmail: '',
      interviewerName: '',
      interviewerPhone: '',
      interviewerEmail: '',
      meetLink: '',
      interviewDate: '',
      interviewTime: '',
      description: '',
    };
  }
}

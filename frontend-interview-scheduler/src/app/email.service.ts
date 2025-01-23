import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/api/interviews/schedule';

  constructor(private http: HttpClient) {}

  sendEmail(interview: any): Observable<any> {
    return this.http.post(this.apiUrl, interview);
  }
}

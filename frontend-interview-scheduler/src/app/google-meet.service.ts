import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleMeetService {
  private CLIENT_ID = '<YOUR_CLIENT_ID>';
  private API_KEY = 'AIzaSyABOHo9LDl9VT0zSNEv5tL-ekvx2CdqX2U';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  private SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  constructor() {}

  initializeGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES,
          })
          .then(() => {
            resolve();
          })
          .catch((error: any) => {
            console.error('Error initializing Google API', error);
            reject(error);
          });
      });
    });
  }

  signIn(): Promise<void> {
    const authInstance = gapi.auth2.getAuthInstance();
    return authInstance.signIn().then(() => {
      console.log('User signed in');
    });
  }

  createGoogleMeetEvent(eventDetails: any): Promise<string> {
    return gapi.client.calendar.events
      .insert({
        calendarId: 'primary',
        resource: {
          summary: eventDetails.summary,
          description: eventDetails.description,
          start: {
            dateTime: eventDetails.startDateTime,
            timeZone: eventDetails.timeZone,
          },
          end: {
            dateTime: eventDetails.endDateTime,
            timeZone: eventDetails.timeZone,
          },
          conferenceData: {
            createRequest: {
              requestId: 'unique-request-id',
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        },
        conferenceDataVersion: 1,
      })
      .then((response: any) => {
        const meetLink = response.result.hangoutLink;
        console.log('Google Meet Link:', meetLink);
        return meetLink;
      })
      .catch((error: any) => {
        console.error('Error creating Google Meet event', error);
        throw error;
      });
  }
}

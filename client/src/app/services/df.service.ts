import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DfService {
  sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = uuid.v4();
  }

  query(text: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.sessionId,
    });

    return this.http.get(`/api/df/query/${text}`, {
      responseType: 'text',
      headers,
    });
  }
}

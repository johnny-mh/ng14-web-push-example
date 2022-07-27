import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotiService {
  constructor(private http: HttpClient) {}

  setNoti(sub: PushSubscription) {
    return this.http.post('/api/noti', { sub });
  }
}

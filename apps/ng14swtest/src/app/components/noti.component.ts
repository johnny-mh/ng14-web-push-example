import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { WindowService } from '../services/window.service';
import { NotiService } from '../services/noti.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ng14swtest-noti',
  template: `
    <ng-container *ngIf="win.isSupportNotification(); else notSupport">
      <button mat-button (click)="subscribe()">구독</button>
    </ng-container>
    <ng-template #notSupport>미지원</ng-template>

    <button type="button" (click)="test()">test</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotiComponent {
  constructor(
    protected swPush: SwPush,
    protected noti: NotiService,
    protected win: WindowService,
    protected http: HttpClient
  ) {}

  subscribe() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.VAPIDPublicKey,
      })
      .then((sub) => {
        this.noti.setNoti(sub).subscribe();
      })
      .catch((err) => alert(err.message));
  }

  test() {
    this.http.get('/api/noti').subscribe((res) => {
      console.log(res);
    });
  }
}

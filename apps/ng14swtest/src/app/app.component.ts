import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ng14swtest-root',
  template: `<ng14swtest-noti></ng14swtest-noti>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

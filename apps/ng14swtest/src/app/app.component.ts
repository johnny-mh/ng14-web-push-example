import { Component } from '@angular/core';
import { WindowService } from './services/window.service';

@Component({
  selector: 'ng14swtest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(protected win: WindowService) {
    console.log(process.env.NODE_ENV);
  }
}

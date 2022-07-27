import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { NotiComponent } from './components/noti.component';
import { WindowService } from './services/window.service';

@NgModule({
  declarations: [AppComponent, NotiComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ServiceWorkerModule.register('notification-service-worker.js'),
    HttpClientModule,
  ],
  providers: [WindowService],
  bootstrap: [AppComponent],
})
export class AppModule {}

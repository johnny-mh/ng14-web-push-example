import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WindowService } from './services/window.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' })],
  providers: [WindowService],
  bootstrap: [AppComponent],
})
export class AppModule {}

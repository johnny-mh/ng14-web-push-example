import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { WindowService } from './services/window.service';
import { ServerWindowService } from './services/server-window.service';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [{ provide: WindowService, useClass: ServerWindowService }],
})
export class AppServerModule {}

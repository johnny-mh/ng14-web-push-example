import { Injectable } from '@angular/core';
import { compare } from 'compare-versions';
import UAParser from 'ua-parser-js';

@Injectable()
export class WindowService {
  isSupportNotification(): boolean {
    const {
      browser: { name, version },
    } = new UAParser().getResult();

    return (
      'Notification' in window &&
      !!version &&
      (name === 'Chrome' ||
        compare(version, '52', '>=') ||
        name === 'Edge' ||
        compare(version, '17', '>=') ||
        name === 'Firefox' ||
        compare(version, '46', '>='))
    );
  }
}

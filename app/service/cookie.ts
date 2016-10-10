import {Injectable} from '@angular/core';

@Injectable()
export class CookieService {
  // private isConsented: boolean = false;

  constructor() {
    // this.isConsented = this.getCookie(COOKIE_CONSENT) === '1';
  }

  public getCookie(name: string) {

    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = name + '=';
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s\+/g, '');
      if (c.indexOf(cookieName) > -1) {
        return c.trim().substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  public deleteCookie(name: any) {
    this.setCookie(name, '', -1);
  }

  public setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
  }

  // private consent(isConsent: boolean, e: any) : any {
  //   if (!isConsent) {
  //     return this.isConsented;
  //   } else if (isConsent) {
  //     this.setCookie(COOKIE_CONSENT, '1', COOKIE_CONSENT_EXPIRE_DAYS);
  //     this.isConsented = true;
  //     e.preventDefault();
  //   }
  // }
}

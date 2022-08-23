/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const PASS_KEY = 'PASS_KEY';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY)!;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY)!);
  }

  public savePassword(password: any): void {
    window.sessionStorage.removeItem(PASS_KEY);
    window.sessionStorage.setItem(PASS_KEY, JSON.stringify(password));
  }

  public getPassword(): any {
    return JSON.parse(window.sessionStorage.getItem(PASS_KEY)!);
  }

  public getSavePatient(): any {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY)!);
  }
}

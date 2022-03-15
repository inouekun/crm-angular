import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';

export interface AuthState {
  loggedIn: boolean;
  tokenExpired: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authState: AuthState = {
    loggedIn: false,
    tokenExpired: false
  };

  private onAuthChangedSubject = new BehaviorSubject<AuthState>(this.authState);
  private token: string = null;
  private role: string = null;

  constructor(private api: ApiService) {
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
    if (this.token && this.role) {
      this.authState.loggedIn = true;
      this.onAuthChangedSubject.next(this.authState);
    }
  }

  isLoggedIn() {
    return this.authState.loggedIn;
  }

  async login(staffId: string, password: string) {
    try {
      const response = await this.api.login({
        staffId,
        password
      }).toPromise();
      console.log('RESPONSE: Login -> ', response);

      this.token = response.token;
      localStorage.setItem('token', this.token);

      this.role = response.role;
      localStorage.setItem('role', this.role);

      this.authState = {
        loggedIn: true,
        tokenExpired: false
      };
      this.onAuthChangedSubject.next(this.authState);

      return true;
    } catch (error) {
      console.log('ERROR: Login', error)
      throw error;
    }

    // this.loggedIn = true;
    // this.token = 'token-token';
    // localStorage.setItem('token', this.token);
  }

  logout(tokenExpired: boolean = false) {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.authState.loggedIn = false;
    this.authState.tokenExpired = tokenExpired;
    this.onAuthChangedSubject.next(this.authState);
  }

  getToken() {
    return this.token;
  }

  getRole() {
    return this.role;
  }

  get onAuthChange() {
    return this.onAuthChangedSubject;
  }

  onTokenExpired() {
    if (this.authState.loggedIn) {
      this.logout(true);
    }
  }
}

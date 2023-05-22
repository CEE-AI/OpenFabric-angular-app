import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export const AUTH_API = 'http://localhost:8701/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;
  private auth_token: any = '';
  private user: any;
  private authStatus = new BehaviorSubject<boolean>(false);
  authStatusChanged = this.authStatus.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  registerUser(user: any) {
    let headers = new HttpHeaders()
    headers.set('Content-type', 'application/json');
    return this.http.post(AUTH_API + 'register', {
      name: user.name,
      email: user.email,
      password: user.password,
      username: user.username
    }, { withCredentials: true })
      .pipe(map((res: any) => res));
  }

  loginUser(user: any) {
    let headers = new HttpHeaders()
    headers.set('Content-type', 'application/json');
    return this.http.post(AUTH_API + 'login', {
      name: user.name,
      email: user.email,
      password: user.password,
      username: user.username
    }, { withCredentials: true })
      .pipe(map((res: any) => res));
  }

  storeUserData(token: any, user: any) {
    document.cookie = `jwt=${token}`;
    document.cookie = `user=${JSON.stringify(user)}`;
    this.auth_token = token;
    this.user = user;
    this.authStatus.next(true);
  }

  logout(): void {
    this.http.post(AUTH_API + 'logout', {}, { withCredentials: true })
      .subscribe(() => this.isAuthenticated = false);

    this.auth_token = null;
    this.user = null;
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.authStatus.next(false);
  }

  isLoggedIn() {
    const auth_token = this.getCookieValue('jwt');
    return auth_token ? !this.jwtHelper.isTokenExpired(auth_token) : false;
  }

  private getCookieValue(name: string): string {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || '';
    }
    return '';
  }

}

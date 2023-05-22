import { Injectable } from '@angular/core';

const SECRET_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void{
    window.sessionStorage.clear();
  }
  public saveUser(user:any): void{
    window.sessionStorage.removeItem(SECRET_KEY)
    window.sessionStorage.setItem(SECRET_KEY, JSON.stringify(user))
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(SECRET_KEY);
    if(user){
      return JSON.parse(user)
    }
  }

  public isLoggedIn(): boolean{
    const user = window.sessionStorage.getItem(SECRET_KEY)
    if(user){
      return true;
    }
    return false;
  }
}

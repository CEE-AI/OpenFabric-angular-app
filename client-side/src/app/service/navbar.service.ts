import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private collapsed = true
  private collapsedSource = new Subject<boolean>()

  collapsed$ = this.collapsedSource.asObservable();

  constructor() { }

  toggleCollapsed(): void{
    this.collapsed = !this.collapsed
    this.collapsedSource.next(this.collapsed)
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private subject = new BehaviorSubject<any>({});
  public keepAfterNavigationChange: boolean;
  constructor() { }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage() {
    return this.subject.asObservable();
  }
}

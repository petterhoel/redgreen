import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildUpdateService {
  private readonly updatedText = new BehaviorSubject<Date| undefined>(undefined);
  updatedDate$ = this.updatedText.asObservable();
  updateText(): void {
    this.updatedText.next(new Date(Date.now()));
  }
  clear(): void {
    this.updatedText.next(undefined);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  // show() {
  //   this.isLoadingSubject.next(true);
  // }

  // hide() {
  //   this.isLoadingSubject.next(false);
  // }

  show() {
    setTimeout(() => {
      this.isLoadingSubject.next(true);
    });
  }
  
  hide() {
    setTimeout(() => {
      this.isLoadingSubject.next(false);
    });
  }
  

}

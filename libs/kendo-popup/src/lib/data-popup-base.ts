import { Directive } from '@angular/core';
import { PopupResult } from './models';
import { Subject } from 'rxjs';

@Directive()
export abstract class DataPopupBase<TData> {
  private closeSubject$ = new Subject<PopupResult<TData>>();
  public close$ = this.closeSubject$.asObservable();

  public close(result: PopupResult<TData>): void {
    this.closeSubject$.next(result);
  }
}

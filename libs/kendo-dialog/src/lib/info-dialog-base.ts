import { Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive()
export abstract class InfoDialogBase {
  private acceptButtonEnabledSubject$ = new BehaviorSubject<boolean | null>(null);
  public acceptButtonEnabled$ = this.acceptButtonEnabledSubject$.asObservable();

  public enableAcceptButton(): void {
    this.acceptButtonEnabledSubject$.next(true);
  }

  public disableAcceptButton(): void {
    this.acceptButtonEnabledSubject$.next(false);
  }
}

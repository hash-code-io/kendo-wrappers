import { Directive } from '@angular/core';
import { ActionsLayout } from '@progress/kendo-angular-dialog';
import { closeOnAccept, closeOnCancel, defaultPickerInputs, PickerInputs } from './models';
import { BehaviorSubject } from 'rxjs';
import { ButtonThemeColor } from '@progress/kendo-angular-buttons';

@Directive()
export abstract class PickerDialogBase<TData> implements PickerInputs {
  private inputSubject$ = new BehaviorSubject<PickerInputs>(defaultPickerInputs);
  public inputs$ = this.inputSubject$.asObservable();

  public set title(title: string) {
    this.inputSubject$.next({ ...this.inputSubject$.value, title });
  }
  public get title(): string {
    return this.inputSubject$.value.title;
  }

  public set titleIcon(titleIcon: string | undefined) {
    this.inputSubject$.next({ ...this.inputSubject$.value, titleIcon });
  }
  public get titleIcon(): string | undefined {
    return this.inputSubject$.value.titleIcon;
  }

  public set acceptButtonTitle(acceptButtonTitle: string) {
    this.inputSubject$.next({ ...this.inputSubject$.value, acceptButtonTitle });
  }
  public get acceptButtonTitle(): string {
    return this.inputSubject$.value.acceptButtonTitle;
  }

  public set cancelButtonTitle(cancelButtonTitle: string) {
    this.inputSubject$.next({ ...this.inputSubject$.value, cancelButtonTitle });
  }
  public get cancelButtonTitle(): string {
    return this.inputSubject$.value.cancelButtonTitle;
  }

  public set acceptButtonEnabled(acceptButtonEnabled: boolean) {
    this.inputSubject$.next({ ...this.inputSubject$.value, acceptButtonEnabled });
  }
  public get acceptButtonEnabled(): boolean {
    return this.inputSubject$.value.acceptButtonEnabled;
  }

  public set actionsLayout(actionsLayout: ActionsLayout) {
    this.inputSubject$.next({ ...this.inputSubject$.value, actionsLayout });
  }
  public get actionsLayout(): ActionsLayout {
    return this.inputSubject$.value.actionsLayout;
  }

  public set buttonThemeColor(buttonThemeColor: ButtonThemeColor) {
    this.inputSubject$.next({ ...this.inputSubject$.value, buttonThemeColor });
  }
  public get buttonThemeColor(): ButtonThemeColor {
    return this.inputSubject$.value.buttonThemeColor;
  }

  public abstract handleAcceptClick(closeDialog: closeOnAccept<TData>): void;
  public abstract handleCancelClick(closeDialog: closeOnCancel): void;
}

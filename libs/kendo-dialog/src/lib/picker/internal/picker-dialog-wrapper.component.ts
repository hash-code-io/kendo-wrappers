import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DialogContentBase, DialogModule, DialogRef, PreventableEvent } from '@progress/kendo-angular-dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { NgIf } from '@angular/common';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import {
  closeOnAccept,
  closeOnCancel,
  defaultPickerInputs,
  PickerComponentInputs,
  PickerDialogAcceptResult,
  PickerDialogCancelResult,
  PickerInputs,
} from '../models';
import { PickerDialogBase } from '../picker-dialog-base';
import { Subject, takeUntil } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-picker-dialog-wrapper',
  template: `
    <kendo-dialog-titlebar (close)="handleTitleClose($event)">
      <div class="title-container">
        <span *ngIf="inputs.titleIcon" class="title-icon k-icon {{ inputs.titleIcon }}"></span>
        <span *ngIf="inputs.title">{{ inputs.title | transloco }}</span>
      </div>
    </kendo-dialog-titlebar>

    <ng-template #contentOutlet></ng-template>

    <kendo-dialog-actions [layout]="inputs.actionsLayout">
      <button
        data-cy="accept"
        kendoButton
        themeColor="primary"
        (click)="handleAcceptClick()"
        [disabled]="!inputs.acceptButtonEnabled"
      >
        {{ inputs.acceptButtonTitle | transloco }}
      </button>
      <button data-cy="cancel" kendoButton (click)="handleCancelClick()">
        {{ inputs.cancelButtonTitle | transloco }}
      </button>
    </kendo-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .title-container {
        display: flex;
        align-items: center;
      }

      .title-icon {
        margin-right: 0.5rem;
        font-size: 1.25rem;
        line-height: 1.5;
      }
    `,
  ],
  imports: [DialogModule, TranslocoModule, NgIf, ButtonModule],
})
export class PickerDialogWrapperComponent<TComponentType extends PickerDialogBase<TData>, TData>
  extends DialogContentBase
  implements OnInit, OnDestroy
{
  @ViewChild('contentOutlet', { static: true, read: ViewContainerRef })
  private contentOutlet!: ViewContainerRef;
  public inputs: PickerInputs = defaultPickerInputs;
  public componentType!: Type<TComponentType>;
  public componentInputs?: PickerComponentInputs<TComponentType>;
  private destroy$ = new Subject<void>();

  public handleAcceptClick!: () => void;
  public handleCancelClick!: () => void;

  public handleTitleClose(ev: PreventableEvent): void {
    ev.preventDefault();
    this.handleCancelClick();
  }

  @HostListener('document:keydown', ['$event'])
  public keydown(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      this.handleCancelClick();
    }
  }

  public constructor(dialog: DialogRef, private cdr: ChangeDetectorRef) {
    super(dialog);
  }

  public ngOnInit(): void {
    this.ensureInputs();
    const component: TComponentType = this.contentOutlet.createComponent(this.componentType).instance;
    this.setUpComponentInputs(component);
    this.setUpCallbacks(component);
    this.setUpInputChangeDetection(component);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setUpComponentInputs(component: TComponentType): void {
    if (!this.componentInputs) return;

    for (const key of Object.keys(this.componentInputs) as (keyof TComponentType)[]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      component[key] = this.componentInputs[key]!;
    }
  }

  private setUpCallbacks(component: TComponentType): void {
    const acceptCallback: closeOnAccept<TData> = (data: TData): void => {
      const result: PickerDialogAcceptResult<TData> = { type: 'Accept', data };
      this.dialog.close(result);
    };
    const cancelCallback: closeOnCancel = (): void => {
      const result: PickerDialogCancelResult = { type: 'Cancel' };
      this.dialog.close(result);
    };

    const accept = component.handleAcceptClick.bind(component);
    const cancel = component.handleCancelClick.bind(component);
    this.handleAcceptClick = (): void => accept(acceptCallback);
    this.handleCancelClick = (): void => cancel(cancelCallback);
  }

  private setUpInputChangeDetection(component: TComponentType): void {
    // This CANNOT be bound to the template because we can't use ANY structural directives (ngIf) since we need a static ViewChild
    component.inputs$.pipe(takeUntil(this.destroy$)).subscribe(inputs => {
      this.inputs = inputs;
      this.cdr.markForCheck();
    });
  }

  private ensureInputs(): void {
    if (!this.componentType) throw new Error('To use the PickerDialog contentType must be set');
  }
}

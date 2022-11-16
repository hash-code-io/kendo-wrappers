import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { InfoDialogBase } from '../info-dialog-base';
import { PickerDialogBase } from '../picker-dialog-base';
import { TranslocoModule } from '@ngneat/transloco';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-info-dialog-adapter',
  template: `
    <ng-template #contentOutlet></ng-template>
    <span *ngIf="text">{{ text | transloco }}</span>
  `,
  imports: [TranslocoModule, NgIf],
})
export class InfoDialogAdapterComponent extends PickerDialogBase<string> implements OnInit, OnDestroy {
  @ViewChild('contentOutlet', { static: true, read: ViewContainerRef }) private contentOutlet!: ViewContainerRef;
  public text?: string;
  public componentType?: Type<InfoDialogBase>;
  private destroy$ = new Subject<void>();

  public handleAcceptClick(): void {
    this.close({ type: 'Accept', data: 'Accept' });
  }

  public handleCancelClick(): void {
    this.close({ type: 'Cancel' });
  }

  public ngOnInit(): void {
    if (this.text && this.componentType)
      throw new Error('Only one of [text] or [componentType] may be provided in InfoDialogAdapterComponent');
    if (!this.text && !this.componentType)
      throw new Error('Either [text] or [componentType] must be provided in InfoDialogAdapterComponent');

    if (this.componentType) this.setUpComponent(this.componentType);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setUpComponent(componentType: Type<InfoDialogBase>): void {
    const component: InfoDialogBase = this.contentOutlet.createComponent(componentType).instance;
    component.acceptButtonEnabled$.pipe(takeUntil(this.destroy$)).subscribe(enabled => {
      if (enabled === null) return;
      this.acceptButtonEnabled = enabled;
    });
  }
}

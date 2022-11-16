import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { TestPopupComponent } from './test-popup.component';
import { PopupManagerService, PopupResult } from '@hash-code/kendo-popup';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-popup-example',
  template: ` <button kendoButton #anchor (click)="togglePopup(anchor)">Toggle popup</button>`,
  imports: [ButtonModule],
  styles: [],
})
export class PopupExampleComponent {
  private close?: (result: PopupResult<string>) => void;
  public constructor(private popupService: PopupManagerService) {}

  public togglePopup(anchor: ElementRef | HTMLElement): void {
    if (this.close) {
      this.close({ type: 'Cancel' });
      this.close = undefined;
      return;
    }

    const res$ = this.popupService.open$<TestPopupComponent, string>({ content: TestPopupComponent, anchor });
    res$.result$.subscribe(x => console.warn(x));
    this.close = res$.close;
  }
}

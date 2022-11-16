import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { TestPopupComponent } from './test-popup.component';
import { PopupExtensionDirective } from '@hash-code/kendo-popup';
import { PopupModule } from '@progress/kendo-angular-popup';
import { NgIf } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-popup-example',
  template: `
    <button kendoButton #anchor (click)="showPopup = !showPopup">Toggle popup</button>
    <kendo-popup
      popupExtension
      [shouldCloseOnPopupClick]="false"
      [anchor]="anchor"
      *ngIf="showPopup"
      (closeRequested)="showPopup = !showPopup"
    >
      <hash-code-test-popup></hash-code-test-popup>
    </kendo-popup>
  `,
  imports: [ButtonModule, PopupModule, TestPopupComponent, PopupExtensionDirective, NgIf],
  styles: [],
})
export class PopupExampleComponent {
  public showPopup = false;
}

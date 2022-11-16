import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { PopupRef, PopupService } from '@progress/kendo-angular-popup';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { TestPopupComponent } from './test-popup.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-popup-example',
  template: ` <button kendoButton #anchor (click)="togglePopup(anchor)">Toggle popup</button>`,
  imports: [ButtonModule],
  styles: [],
})
export class PopupExampleComponent {
  private popupRef: PopupRef | null = null;

  public constructor(private popupService: PopupService) {}

  public togglePopup(anchor: ElementRef | HTMLElement): void {
    if (this.popupRef) {
      this.popupRef.close();
      this.popupRef = null;
    } else {
      this.popupRef = this.popupService.open({
        anchor: anchor,
        content: TestPopupComponent,
      });
    }
  }
}

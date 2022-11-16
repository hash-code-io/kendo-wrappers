import { ChangeDetectionStrategy, Component, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DataPopupBase } from '../data-popup-base';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-popup-wrapper',
  template: ` <ng-template #contentOutlet></ng-template> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class PopupWrapperComponent<TComponentType extends DataPopupBase<TData>, TData> {
  @ViewChild('contentOutlet', { static: true, read: ViewContainerRef })
  private contentOutlet!: ViewContainerRef;
  public componentType!: Type<TComponentType>;
  public componentInputs?: PickerComponentInputs<TComponentType>;
}

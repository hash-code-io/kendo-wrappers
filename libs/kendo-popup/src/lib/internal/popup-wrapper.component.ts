import { ChangeDetectionStrategy, Component, HostListener, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupComponentInputs, PopupResult } from '../models';
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
  @ViewChild('contentOutlet', { read: ViewContainerRef })
  private contentOutlet!: ViewContainerRef;
  public componentType!: Type<TComponentType>;
  public closeCallback!: (result: PopupResult<TData>) => void;
  public componentInputs?: PopupComponentInputs<TComponentType>;

  @HostListener('document:keydown', ['$event'])
  public keydown(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      this.closeCallback({ type: 'Cancel' });
    }
  }

  private setUpComponentInputs(component: TComponentType): void {
    if (!this.componentInputs) return;

    for (const key of Object.keys(this.componentInputs) as (keyof TComponentType)[]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      component[key] = this.componentInputs[key]!;
    }
  }

  // public ngAfterViewInit(): void {
  //   if (!this.componentType) throw new Error('To use the Popup componentType must be set');
  //   if (!this.closeCallback) throw new Error('To use the Popup closeCallback must be set');
  //   const component: TComponentType = this.contentOutlet.createComponent(this.componentType).instance;
  //   this.setUpComponentInputs(component);
  // }

  public setup(): void {
    const component: TComponentType = this.contentOutlet.createComponent(this.componentType).instance;
    this.setUpComponentInputs(component);
  }
}

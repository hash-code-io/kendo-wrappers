import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PopupComponentInputs, PopupResult } from '../models';
import { mergeAll, Observable, of, Subject } from 'rxjs';
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
export class PopupWrapperComponent<TComponentType extends DataPopupBase<TData>, TData> implements OnInit {
  @ViewChild('contentOutlet', { static: true, read: ViewContainerRef })
  private contentOutlet!: ViewContainerRef;
  public componentType!: Type<TComponentType>;
  public componentInputs?: PopupComponentInputs<TComponentType>;
  private closeSubject$ = new Subject<Observable<PopupResult<TData>>>();
  public close$ = this.closeSubject$.pipe(mergeAll());

  @HostListener('document:keydown', ['$event'])
  public keydown(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      this.closeSubject$.next(of({ type: 'Cancel' }));
    }
  }

  public constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    if (!this.componentType) throw new Error('To use the PickerDialog contentType must be set');
    const component: TComponentType = this.contentOutlet.createComponent(this.componentType).instance;
    this.setUpComponentInputs(component);
    this.hookUpObservables(component);
  }

  private setUpComponentInputs(component: TComponentType): void {
    if (!this.componentInputs) return;

    for (const key of Object.keys(this.componentInputs) as (keyof TComponentType)[]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      component[key] = this.componentInputs[key]!;
    }
  }

  private hookUpObservables(component: TComponentType): void {
    this.closeSubject$.next(component.close$);
  }
}

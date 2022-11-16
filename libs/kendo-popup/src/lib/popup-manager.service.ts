import { Injectable } from '@angular/core';
import { PopupService, PopupSettings } from '@progress/kendo-angular-popup';
import { PopupManagerResult, PopupOptions, PopupResult } from './models';
import { DataPopupBase } from './data-popup-base';
import { PopupWrapperComponent } from './internal';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PopupManagerService {
  public constructor(private popupService: PopupService) {}

  public open$<TComponentType extends DataPopupBase<TData>, TData>(
    options: PopupOptions<TComponentType, TData>
  ): PopupManagerResult<TData> {
    const kendoOptions: PopupSettings = { ...options };
    kendoOptions.content = PopupWrapperComponent<TComponentType, TData>;

    const popup = this.popupService.open(kendoOptions);
    const component = popup.content.instance as PopupWrapperComponent<TComponentType, TData>;

    component.componentType = options.content;
    component.componentInputs = options.componentInputs;

    let closeResult: PopupResult<TData> | null = null;
    component.closeCallback = (result): void => {
      closeResult = result;
      popup.close();
    };

    const managerResult$ = popup.popupClose.pipe(
      map(() => {
        if (!closeResult) throw new Error('invalid internal operation: closeResult was null');
        return closeResult;
      })
    );

    component.setup();

    return {
      result$: managerResult$,
      close: (result): void => {
        closeResult = result;
        popup.close();
      },
    };
  }
}

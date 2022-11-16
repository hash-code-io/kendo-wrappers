import { Injectable } from '@angular/core';
import { PopupService, PopupSettings } from '@progress/kendo-angular-popup';
import { PopupResult } from './models';
import { DataPopupBase } from './data-popup-base';
import { PopupOptions } from './models/popup-options';
import { Observable } from 'rxjs';
import { PopupWrapperComponent } from './internal';

@Injectable({ providedIn: 'root' })
export class PopupManagerService {
  public constructor(private popupService: PopupService) {}

  public open$<TComponentType extends DataPopupBase<TData>, TData>(
    options: PopupOptions<TComponentType, TData>
  ): Observable<PopupResult<TData>> {
    const kendoOptions: PopupSettings = { ...options };
    kendoOptions.content = PopupWrapperComponent<TComponentType, TData>;

    const popup = this.popupService.open(kendoOptions);
    const component = popup.content.instance as PopupWrapperComponent<TComponentType, TData>;

    component.componentType = options.content;
    component.componentInputs = options.componentInputs;

    return component.close$;
  }
}

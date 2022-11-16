import { PopupSettings } from '@progress/kendo-angular-popup';
import { DataPopupBase } from '../data-popup-base';
import { Type } from '@angular/core';
import { PopupComponentInputs } from './popup-component-inputs';

export type PopupOptions<TComponentType extends DataPopupBase<TData>, TData> = Omit<PopupSettings, 'content'> & {
  content: Type<TComponentType>;
  componentInputs?: PopupComponentInputs<TComponentType>;
};

import { PickerDialogBase } from '../picker-dialog-base';
import { DialogSettings } from '@progress/kendo-angular-dialog/dialog/models/dialog-settings';
import { Type } from '@angular/core';
import { PickerComponentInputs } from './picker-component-inputs';

export type DialogOptions<TComponentType extends PickerDialogBase<TData>, TData> = Omit<
  DialogSettings,
  'title' | 'content' | 'actions' | 'actionsLayout' | 'preventAction'
> & {
  content: Type<TComponentType>;
  componentInputs?: PickerComponentInputs<TComponentType>;
};

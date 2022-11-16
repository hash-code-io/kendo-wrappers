import { Type } from '@angular/core';
import { BaseDialogSettings } from '../internal';
import { PickerInputs } from '@hash-code/kendo-dialog';

export type InfoDialogOptions<TComponentType> = BaseDialogSettings &
  Partial<PickerInputs> & {
    content: Type<TComponentType> | string;
  };

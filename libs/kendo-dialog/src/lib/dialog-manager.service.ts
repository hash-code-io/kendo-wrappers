import { Injectable } from '@angular/core';
import { DialogCloseResult, DialogResult, DialogService, DialogSettings } from '@progress/kendo-angular-dialog';
import { InfoDialogAdapterComponent, kendoDialogSettingOmittedKeys, PickerDialogWrapperComponent } from './internal';

import { map, Observable } from 'rxjs';
import {
  allPickerInputKeys,
  InfoDialogOptions,
  InfoDialogResult,
  PickerDialogOptions,
  PickerDialogResult,
} from './models';
import { PickerDialogBase } from './picker-dialog-base';
import { InfoDialogBase } from './info-dialog-base';
import { filterObjectValues, pickNonNullsyObjectValues } from '@hash-code/kendo-common';

// Prevents auto-closing when ESC key is pressed
const preventAction = (ev: DialogResult): boolean => {
  return ev instanceof DialogCloseResult;
};

@Injectable({ providedIn: 'root' })
export class DialogManagerService {
  public constructor(private dialogService: DialogService) {}

  public openPickerDialog$<TComponentType extends PickerDialogBase<TData>, TData>(
    options: PickerDialogOptions<TComponentType, TData>
  ): Observable<PickerDialogResult<TData>> {
    const kendoOptions: DialogSettings = { ...options, preventAction };
    kendoOptions.content = PickerDialogWrapperComponent<TComponentType, TData>;

    const dialog = this.dialogService.open(kendoOptions);
    const component = dialog.content.instance as PickerDialogWrapperComponent<TComponentType, TData>;

    component.componentType = options.content;
    component.componentInputs = options.componentInputs;
    return dialog.result as Observable<PickerDialogResult<TData>>;
  }

  public openInfoDialog$<TContent extends InfoDialogBase>(
    options: InfoDialogOptions<TContent>
  ): Observable<InfoDialogResult> {
    const text = typeof options.content === 'string' ? options.content : undefined;
    const componentType = typeof options.content !== 'string' ? options.content : undefined;
    const furtherInputs = pickNonNullsyObjectValues(options, allPickerInputKeys);
    const filteredOptions = filterObjectValues<DialogSettings>(options, kendoDialogSettingOmittedKeys);
    return this.openPickerDialog$<InfoDialogAdapterComponent, string>({
      ...filteredOptions,
      content: InfoDialogAdapterComponent,
      componentInputs: {
        text,
        componentType,
        ...furtherInputs,
      },
    }).pipe(map(result => result.type));
  }
}

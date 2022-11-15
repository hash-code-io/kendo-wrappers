import { Injectable } from '@angular/core';
import {
  DialogCloseResult,
  DialogRef,
  DialogResult,
  DialogService,
  DialogSettings,
} from '@progress/kendo-angular-dialog';
import { PickerDialogWrapperComponent } from './picker/internal';
import { DialogOptions, PickerDialogBase, PickerDialogResult } from './picker';
import { Observable } from 'rxjs';

// Prevents auto-closing when ESC key is pressed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const preventAction = (ev: DialogResult, dialogRef?: DialogRef): boolean => {
  return ev instanceof DialogCloseResult;
};

@Injectable({ providedIn: 'root' })
export class DialogManagerService {
  public constructor(private dialogService: DialogService) {}

  public openPickerDialog$<TComponentType extends PickerDialogBase<TData>, TData>(
    options: DialogOptions<TComponentType, TData>
  ): Observable<PickerDialogResult<TData>> {
    const kendoOptions: DialogSettings = { ...options, preventAction };
    kendoOptions.content = PickerDialogWrapperComponent<TComponentType, TData>;

    const dialog = this.dialogService.open(kendoOptions);
    const component = dialog.content.instance as PickerDialogWrapperComponent<TComponentType, TData>;

    component.componentType = options.content;
    component.componentInputs = options.componentInputs;

    return dialog.result as Observable<PickerDialogResult<TData>>;
  }
}

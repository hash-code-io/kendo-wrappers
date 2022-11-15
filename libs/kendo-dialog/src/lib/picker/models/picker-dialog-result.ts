export interface PickerDialogAcceptResult<TData> {
  type: 'Accept';
  data: TData;
}

export interface PickerDialogCancelResult {
  type: 'Cancel';
}

export type PickerDialogResult<TData> = PickerDialogAcceptResult<TData> | PickerDialogCancelResult;

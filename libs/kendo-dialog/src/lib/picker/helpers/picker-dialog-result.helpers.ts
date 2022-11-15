import { PickerDialogAcceptResult, PickerDialogCancelResult, PickerDialogResult } from '../models';

export function isAcceptResult<TData>(result: PickerDialogResult<TData>): result is PickerDialogAcceptResult<TData> {
  return result.type === 'Accept';
}

export function isCancelResult<TData>(result: PickerDialogResult<TData>): result is PickerDialogCancelResult {
  return result.type === 'Cancel';
}

import {filter, OperatorFunction} from "rxjs";
import {isAcceptResult, isCancelResult} from "./picker-dialog-result.helpers";
import {PickerDialogAcceptResult, PickerDialogCancelResult, PickerDialogResult} from "../models";


export function filterCancelResult<TData>(): OperatorFunction<PickerDialogResult<TData>, PickerDialogAcceptResult<TData>> {
  return filter(x => isAcceptResult(x)) as OperatorFunction<PickerDialogResult<TData>, PickerDialogAcceptResult<TData>>;
}

export function filterAcceptResult<TData>(): OperatorFunction<PickerDialogResult<TData>, PickerDialogCancelResult> {
  return filter(x => isCancelResult(x)) as OperatorFunction<PickerDialogResult<TData>, PickerDialogCancelResult>;
}

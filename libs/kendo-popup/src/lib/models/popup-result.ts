export interface PopupAcceptResult<TData> {
  type: 'Accept';
  data: TData;
}

export interface PopupCancelResult {
  type: 'Cancel';
}

export type PopupResult<TData> = PopupAcceptResult<TData> | PopupCancelResult;

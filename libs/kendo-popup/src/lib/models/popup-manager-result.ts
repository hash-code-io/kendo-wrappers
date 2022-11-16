import { Observable } from 'rxjs';
import { PopupResult } from './popup-result';

export interface PopupManagerResult<TData> {
  result$: Observable<PopupResult<TData>>;
  close: (result: PopupResult<TData>) => void;
}

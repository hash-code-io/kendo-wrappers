import { Injectable } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';

@Injectable({ providedIn: 'root' })
export class PopupManagerService {
  public constructor(private popupService: PopupService) {}

  public open(): void {}
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoaderModule, LoaderThemeColor } from '@progress/kendo-angular-indicators';
import { LoaderSize } from '@progress/kendo-angular-indicators/loader/models/size';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hash-code-loading-panel',
  standalone: true,
  template: `
    <div class="container-inner" [ngClass]="innerContainerClass">
      <div class="loading-panel" *ngIf="(loadingPanelVisible$ | async) || false">
        <div class="loading-panel-mask"></div>
        <div class="loading-panel-wrapper">
          <kendo-loader [type]="'infinite-spinner'" [themeColor]="loaderThemeColor" [size]="loaderSize"> </kendo-loader>
          <div class="loading-panel-text">{{ loadingText }}</div>
        </div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .container-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      /* Loader Panel Styles */
      .loading-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
      }
      .loading-panel-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #ffffff;
        opacity: 0.5;
      }
      .loading-panel-wrapper {
        position: relative;
        z-index: 2;
      }

      .loading-panel-text {
        margin-top: 20px;
        text-align: center;
        color: #000000;
      }
    `,
  ],
  imports: [LoaderModule, NgIf, NgClass, AsyncPipe],
})
export class LoadingPanelComponent {
  @Input() loadingText = 'Loading...';
  @Input() loaderThemeColor: LoaderThemeColor = 'primary';
  @Input() loaderSize: LoaderSize = 'large';
  @Input() innerContainerClass = '';
  @Input() debounceTime = 75;

  @Input() set loading(loading: boolean) {
    this._loadingPanelVisibleSubject$.next(loading);
  }

  private _loadingPanelVisibleSubject$ = new BehaviorSubject<boolean>(false);
  public loadingPanelVisible$ = this._loadingPanelVisibleSubject$.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );
}

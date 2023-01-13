import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingPanelComponent } from '@hash-code/kendo-layout';
import { LoadingPanelContentComponent } from './loading-panel-content.component';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { NgStyle } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-layout-example',
  template: `
    <div>
      <h1>Layout Components</h1>
    </div>

    <h2>Loading Panel</h2>

    <div style="margin-left: 20px">
      <hash-code-loading-panel [loading]="loading">
        <hash-code-loading-panel-content
          [ngStyle]="{ 'width.px': width, 'height.px': height }"
        ></hash-code-loading-panel-content>
      </hash-code-loading-panel>

      <div class="loading-toolbar">
        <button style="height: 48px; margin-right: 20px" kendoButton (click)="loading = !loading">
          Trigger loading
        </button>
        <kendo-label [text]="'height'" style="margin-right: 20px">
          <kendo-numerictextbox [(value)]="height" [decimals]="0" [format]="'#'"></kendo-numerictextbox>
        </kendo-label>
        <kendo-label [text]="'width'">
          <kendo-numerictextbox [(value)]="width" [decimals]="0" [format]="'#'"></kendo-numerictextbox>
        </kendo-label>
      </div>
    </div>
  `,
  imports: [
    LoadingPanelComponent,
    LoadingPanelContentComponent,
    ButtonModule,
    LabelModule,
    NumericTextBoxModule,
    NgStyle,
  ],
  styles: [
    `
      :host {
        display: block;
      }

      .loading-toolbar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        width: 100%;
      }

      hash-code-loading-panel {
        width: fit-content;
      }
    `,
  ],
})
export class LayoutExampleComponent {
  loading = false;
  height = 500;
  width = 500;
}

import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { HumanizeFormMessagesPipe } from './humanize-form.messages.pipe';
import { NgIf } from '@angular/common';
import { FormFieldModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';

export const formErrorAndHint = `
  <kendo-formhint *ngIf="hintMessage">{{ hintMessage! | transloco }}</kendo-formhint>
  <kendo-formerror>{{ ngControl.errors | humanizeFormMessages: errorMessages | transloco }}</kendo-formerror>
`;

export const formControlWrapperBefore = `
  <kendo-formfield>
    <kendo-label [text]="label | transloco" [for]="underlyingControl" [optional]="optional"></kendo-label>
`;
export const formControlWrapperAfter = `
    ${formErrorAndHint}
  </kendo-formfield>
`;

export const baseControlImports = [
  FormFieldModule,
  LabelModule,
  ReactiveFormsModule,
  TranslocoModule,
  HumanizeFormMessagesPipe,
  NgIf,
];

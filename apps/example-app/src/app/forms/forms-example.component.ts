import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DatePickerComponent,
  NumericInputComponent,
  SwitchInputComponent,
  TextInputComponent,
} from '@hash-code/kendo-forms';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-forms-example',
  template: `
    <div>
      <h1>Forms Component</h1>
      <h3>Test the components by entering values and seeing how the form value updates</h3>
    </div>

    <form [formGroup]="form">
      <hash-code-text-input
        [errorMessages]="{ required: 'formMessages.errors.customRequired' }"
        label="form.name"
        formControlName="name"
      ></hash-code-text-input>
      <hash-code-numeric-input
        [max]="100"
        [min]="0"
        [decimals]="0"
        [format]="'#'"
        label="form.age"
        formControlName="age"
      ></hash-code-numeric-input>
      <hash-code-switch-input label="form.happy" formControlName="happy"></hash-code-switch-input>
      <hash-code-date-picker label="form.birthDay" formControlName="birthDay"></hash-code-date-picker>
    </form>

    <div style="margin-top: 3rem">
      FormValue (isValid?: {{ form.valid }}):
      <pre>
        <code>
{{ form.value | json}}
        </code>
      </pre>
    </div>
  `,
  imports: [
    ReactiveFormsModule,
    NumericInputComponent,
    TextInputComponent,
    DatePickerComponent,
    SwitchInputComponent,
    CommonModule,
  ],
  styles: [
    `
      form {
        width: 400px;
      }

      form > * {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class FormsExampleComponent {
  public form = this.fb.group({
    name: ['', [Validators.required]],
    age: [null as number | null, [Validators.required]],
    happy: [true],
    birthDay: [new Date(), [Validators.required]],
  });

  public constructor(private fb: FormBuilder) {}
}

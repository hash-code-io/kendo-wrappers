import { InjectionToken } from '@angular/core';
import { ErrorMessages } from '@hash-code/kendo-forms';

export const DEFAULT_FORM_ERROR_MESSAGES = new InjectionToken<ErrorMessages>('DEFAULT_FORM_ERROR_MESSAGES');

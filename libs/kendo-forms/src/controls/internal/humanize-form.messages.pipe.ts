import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { defaultErrorMessages } from './default-error-messages';
import { DEFAULT_FORM_ERROR_MESSAGES, ErrorMessages } from '../models';

@Pipe({ name: 'humanizeFormMessages', standalone: true })
export class HumanizeFormMessagesPipe implements PipeTransform {
  private readonly errorMessages: ErrorMessages;

  public constructor(@Optional() @Inject(DEFAULT_FORM_ERROR_MESSAGES) errorMessages?: ErrorMessages) {
    this.errorMessages = errorMessages ?? defaultErrorMessages;
  }

  public transform(validationErrors?: ValidationErrors | null, overriddenMessages?: ErrorMessages | null): string {
    if (!validationErrors) {
      return '';
    }
    // Allow the possibility to override messages
    const messages = {
      ...this.errorMessages,
      ...(overriddenMessages ?? {}),
    };
    const messageKey = Object.keys(validationErrors)[0];
    const message = messages[messageKey];
    return message ?? `[MESSAGE MISSING FOR ${messageKey}]`;
  }
}

import { ActionsLayout } from '@progress/kendo-angular-dialog';
import { ButtonThemeColor } from '@progress/kendo-angular-buttons';

export interface PickerInputs {
  title: string;
  titleIcon?: string;
  acceptButtonTitle: string;
  cancelButtonTitle: string;
  acceptButtonEnabled: boolean;
  actionsLayout: ActionsLayout;
  buttonThemeColor: ButtonThemeColor;
}

export const defaultPickerInputs: PickerInputs = {
  title: '',
  acceptButtonTitle: 'general.ok',
  cancelButtonTitle: 'general.cancel',
  acceptButtonEnabled: true,
  actionsLayout: 'stretched',
  buttonThemeColor: 'primary',
};

export type PickerInputKeys = keyof PickerInputs;

const allInputs: Record<PickerInputKeys, unknown> = {
  title: '',
  acceptButtonTitle: '',
  cancelButtonTitle: '',
  acceptButtonEnabled: '',
  actionsLayout: '',
  titleIcon: '',
  buttonThemeColor: '',
};

export const allPickerInputKeys = Object.keys(allInputs) as PickerInputKeys[];

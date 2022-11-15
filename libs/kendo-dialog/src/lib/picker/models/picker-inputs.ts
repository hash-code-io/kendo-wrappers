import { ActionsLayout } from '@progress/kendo-angular-dialog';

export interface PickerInputs {
  title: string;
  titleIcon?: string;
  acceptButtonTitle: string;
  cancelButtonTitle: string;
  acceptButtonEnabled: boolean;
  actionsLayout: ActionsLayout;
}

export const defaultPickerInputs: PickerInputs = {
  title: '',
  acceptButtonTitle: 'general.ok',
  cancelButtonTitle: 'general.cancel',
  acceptButtonEnabled: true,
  actionsLayout: 'stretched',
};

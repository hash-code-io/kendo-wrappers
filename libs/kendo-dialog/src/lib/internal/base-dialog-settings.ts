import { DialogSettings } from '@progress/kendo-angular-dialog';

export type KendoDialogSettingKeysToOmit = 'title' | 'content' | 'actions' | 'actionsLayout' | 'preventAction';

const allOmittedKeys: Record<KendoDialogSettingKeysToOmit, unknown> = {
  title: '',
  content: '',
  actions: '',
  actionsLayout: '',
  preventAction: '',
};

export type BaseDialogSettings = Omit<DialogSettings, KendoDialogSettingKeysToOmit>;

export const kendoDialogSettingOmittedKeys = Object.keys(allOmittedKeys) as KendoDialogSettingKeysToOmit[];

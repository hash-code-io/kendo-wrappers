export type PopupComponentInputs<TComponentType> = {
  [key in keyof TComponentType]?: TComponentType[key];
};

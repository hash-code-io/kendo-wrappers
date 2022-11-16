export type PickerComponentInputs<TComponentType> = {
  [key in keyof TComponentType]?: TComponentType[key];
};

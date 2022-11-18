type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export function pickNonNullsyObjectValues<T>(obj: T, properties: (keyof T)[]): Partial<T> {
  const acc: Partial<T> = {};
  for (const propertyKey of properties) {
    const propertyValue = obj[propertyKey];
    if (propertyValue != null) acc[propertyKey] = obj[propertyKey];
  }
  return acc;
}

export function filterObjectValues<T extends Partial<T>>(obj: T, properties: (keyof T)[]): Partial<T> {
  const acc: Partial<T> = {};
  const entries = Object.entries(obj) as ObjectEntries<T>;

  for (const [key, value] of entries) {
    if (!properties.includes(key)) acc[key] = value;
  }
  return acc;
}

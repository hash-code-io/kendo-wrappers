import { filterObjectValues } from './object.helper';

describe('filterObjectValues', () => {
  it('should filter values', () => {
    const myObj = { name: 'Test', age: 100 };
    const result = filterObjectValues(myObj, ['age']);
    expect(result).toStrictEqual({ name: 'Test' });
  });
});

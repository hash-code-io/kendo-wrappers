import {PickerDialogAcceptResult, PickerDialogCancelResult} from "../models";
import {of} from "rxjs";
import {filterAcceptResult, filterCancelResult} from "./picker-dialog-result.operators";
import {TestScheduler} from "rxjs/testing";

describe('Picker Dialog Result Operators', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('filterCancelResult', () => {
    it('it should emit on accept', () => {
      testScheduler.run(({expectObservable}) => {
        const value: PickerDialogAcceptResult<string> = {type: 'Accept', data: ''};
        const result$ = of(value).pipe(filterCancelResult());

        expectObservable(result$).toBe('(a|)', {a: value});
      });
    })

    it('should filter cancel results', () => {
      testScheduler.run(({expectObservable}) => {
        const value: PickerDialogCancelResult = {type: 'Cancel'};
        const result$ = of(value).pipe(filterCancelResult());

        expectObservable(result$).toBe('|');
      });
    })
  });

  describe('filterAcceptResult', () => {
    it('it should emit on cancel', () => {
      testScheduler.run(({expectObservable}) => {
        const value: PickerDialogCancelResult = {type: 'Cancel'};
        const result$ = of(value).pipe(filterAcceptResult());

        expectObservable(result$).toBe('(a|)', {a: value});
      });
    })

    it('should filter accept results', () => {
      testScheduler.run(({expectObservable}) => {
        const value: PickerDialogAcceptResult<string> = {type: 'Accept', data: ''};
        const result$ = of(value).pipe(filterAcceptResult());

        expectObservable(result$).toBe('|');
      });
    })
  });
})


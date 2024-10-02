import { describe, it, expect } from 'vitest';
import ifValidNumber from '../../helpers/ifValidNumber.js';

describe('ifValidNumber function', () => {
  it('should return valid columns and rows if they are within limits and are integers', () => {
    const result = ifValidNumber(10, 20);
    expect(result).toEqual([10, 20]);
  });

  it('should round down non-integer values if they are valid', () => {
    const result = ifValidNumber(5.9, 9.7);
    expect(result).toEqual([5, 9]);
  });

  it('should throw an error if columns or rows are not numbers', () => {
    expect(() => ifValidNumber('a', 5)).toThrow(
      'Invalid input: cols and rows must be numbers',
    );
    expect(() => ifValidNumber(5, 'b')).toThrow(
      'Invalid input: cols and rows must be numbers',
    );
  });

  it('should throw an error if columns or rows are greater than the limit', () => {
    expect(() => ifValidNumber(101, 5)).toThrow(
      'Cols and rows cannot be greater than 100',
    );
    expect(() => ifValidNumber(5, 101)).toThrow(
      'Cols and rows cannot be greater than 100',
    );
  });

  it('should throw an error if columns or rows are less than 1', () => {
    expect(() => ifValidNumber(0, 5)).toThrow(
      'Cols and rows must be greater than 0',
    );
    expect(() => ifValidNumber(5, 0)).toThrow(
      'Cols and rows must be greater than 0',
    );
  });
});

import { describe, it, expect } from 'vitest';
import numberToLetter from '../../helpers/numberToLetter.js';

describe('numberToLetter function', () => {
  // Testing single letter conversions
  it('converts single-digit numbers to letters', () => {
    expect(numberToLetter(0)).toBe('A');
    expect(numberToLetter(1)).toBe('B');
    expect(numberToLetter(25)).toBe('Z');
  });

  // Testing the wrap-around to double letters
  it('converts numbers greater than 25 to double letters', () => {
    expect(numberToLetter(26)).toBe('AA');
    expect(numberToLetter(27)).toBe('AB');
    expect(numberToLetter(51)).toBe('AZ');
    expect(numberToLetter(52)).toBe('BA');
  });

  // Test boundary conditions and large numbers
  it('handles large numbers', () => {
    expect(numberToLetter(701)).toBe('ZZ');
    expect(numberToLetter(702)).toBe('AAA');
    expect(numberToLetter(18277)).toBe('ZZZ');
    expect(numberToLetter(18278)).toBe('AAAA');
  });

  // Edge cases and input validation
  it('returns undefined for negative inputs', () => {
    expect(numberToLetter(-1)).toBeUndefined();
  });

  it('returns undefined for non-integer inputs', () => {
    expect(numberToLetter(5.5)).toBeUndefined();
  });

  it('returns undefined for non-number inputs', () => {
    expect(numberToLetter('A')).toBeUndefined();
    expect(numberToLetter(null)).toBeUndefined();
    expect(numberToLetter(undefined)).toBeUndefined();
  });
});

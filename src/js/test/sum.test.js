import { expect, test } from 'vitest';
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// ADDING MORE TEST
test('adds -1 + -2 to equal -3', () => {
  expect(sum(-1, -2)).toBe(-3);
});

// Test for different types
test('adds "1" + 2 to equal 3', () => {
  expect(sum('1', 2)).toBe(3);
});

test('adds "a" + 2 to result in NaN', () => {
  expect(sum('a', 2)).toBeNaN();
});

import { describe, it, expect } from 'vitest';
import ifValidNumber from '../../helpers/ifValidNumber.js';

describe('ifValidNumber function', () => {
    it('should error if columns or rows are not numbers', () => {
        const spy = vi.spyOn(console, 'error');
        ifValidNumber('a', 5);
        expect(spy).toHaveBeenCalledWith('Invalid cols or rows');
        spy.mockRestore();
    });

    it('should error if columns or rows are greater than the limit', () => {
        const spy = vi.spyOn(console, 'error');
        ifValidNumber(101, 5);
        expect(spy).toHaveBeenCalledWith('Cols and/or rows cannot be greater than 100');
        spy.mockRestore();
    });

    it('should error if columns or rows are not integers', () => {
        const spy = vi.spyOn(console, 'error');
        ifValidNumber(10.5, 5.9);
        expect(spy).toHaveBeenCalledWith('cols and rows needs to be whole numbers (integers)');
        spy.mockRestore();
    });

    it('should error if columns or rows are less than 1', () => {
        const spy = vi.spyOn(console, 'error');
        ifValidNumber(0, 0);
        expect(spy).toHaveBeenCalledWith('Invalid cols or rows');
        spy.mockRestore();
    });

    it('should round down non-integer values if they are valid', () => {
        const result = ifValidNumber(5.9, 9.7);
        expect(result).toEqual([5, 9]);
    });

    it('should return valid columns and rows if they are within limits and are integers', () => {
        const result = ifValidNumber(10, 20);
        expect(result).toEqual([10, 20]);
    });
});
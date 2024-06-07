import { describe, it, expect } from 'vitest';
import createEle from '../../helpers/createEle.js'

describe('createEle function', () => {
    it('should create an element with only a tag name', () => {
        const element = createEle('div');
        expect(element.tagName).toBe('DIV');
        expect(element.className).toBe('');
        expect(element.textContent).toBe('');
    });

    it('should create an element with a tag name and classes', () => {
        const element = createEle('span', 'test-class');
        expect(element.tagName).toBe('SPAN');
        expect(element.className).toBe('test-class');
        expect(element.textContent).toBe('');
    });

    it('should create an element with a tag name, classes, and text content', () => {
        const element = createEle('p', 'test-class', 'Hello, world!');
        expect(element.tagName).toBe('P');
        expect(element.className).toBe('test-class');
        expect(element.textContent).toBe('Hello, world!');
    });
});
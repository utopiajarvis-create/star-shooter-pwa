import { describe, it, expect } from 'vitest';
import { Vector2 } from './Vector2';

describe('Vector2', () => {
  it('should add vectors correctly', () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(3, 4);
    expect(v1.add(v2)).toEqual(new Vector2(4, 6));
  });
  it('should normalize correctly', () => {
    const v1 = new Vector2(3, 4);
    expect(v1.normalize().mag()).toBeCloseTo(1);
    expect(v1.normalize().x).toBeCloseTo(0.6);
    expect(v1.normalize().y).toBeCloseTo(0.8);
  });
});

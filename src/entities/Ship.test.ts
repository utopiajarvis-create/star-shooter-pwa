import { describe, it, expect } from 'vitest';
import { Ship } from './Ship';
import { Vector2 } from '../math/Vector2';

describe('Ship', () => {
  it('should apply thrust in the direction of rotation', () => {
    const ship = new Ship(0, 0);
    ship.rotation = 0; // Right
    ship.thrust();
    expect(ship.velocity.x).toBeCloseTo(ship.thrustPower);
    expect(ship.velocity.y).toBeCloseTo(0);
  });

  it('should update position based on velocity', () => {
    const ship = new Ship(0, 0);
    ship.velocity = new Vector2(2, 3);
    ship.update();
    expect(ship.position).toEqual(new Vector2(2, 3));
  });
});

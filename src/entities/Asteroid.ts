import { Vector2 } from '../math/Vector2';

export class Asteroid {
  position: Vector2;
  velocity: Vector2;
  radius: number;

  constructor(position: Vector2, velocity: Vector2, radius: number) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
  }

  update() {
    this.position = this.position.add(this.velocity);
  }

  split(): Asteroid[] {
    if (this.radius <= 10) return []; // Too small to split
    const r = this.radius / 2;
    const a1 = new Asteroid(
      new Vector2(this.position.x, this.position.y),
      new Vector2(this.velocity.x + Math.random() * 2 - 1, this.velocity.y + Math.random() * 2 - 1),
      r
    );
    const a2 = new Asteroid(
      new Vector2(this.position.x, this.position.y),
      new Vector2(this.velocity.x + Math.random() * 2 - 1, this.velocity.y + Math.random() * 2 - 1),
      r
    );
    return [a1, a2];
  }
}

import { Vector2 } from '../math/Vector2';

export class Projectile {
  position: Vector2;
  velocity: Vector2;
  life: number;
  radius: number = 2;

  constructor(position: Vector2, velocity: Vector2, life: number = 60) {
    this.position = position;
    this.velocity = velocity;
    this.life = life;
  }

  update() {
    this.position = this.position.add(this.velocity);
    this.life--;
  }

  isDead(): boolean {
    return this.life <= 0;
  }
}

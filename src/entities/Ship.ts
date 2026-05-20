import { Vector2 } from '../math/Vector2';

export class Ship {
  position: Vector2;
  velocity: Vector2;
  rotation: number; // in radians
  turnSpeed: number = 0.05;
  thrustPower: number = 0.1;

  constructor(x: number, y: number) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.rotation = 0; // pointing straight up? standard is pointing right = 0. We'll use 0 as pointing right.
  }

  update() {
    this.position = this.position.add(this.velocity);
  }

  turnLeft() {
    this.rotation -= this.turnSpeed;
  }

  turnRight() {
    this.rotation += this.turnSpeed;
  }

  thrust() {
    const heading = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
    this.velocity = this.velocity.add(heading.mult(this.thrustPower));
  }
}

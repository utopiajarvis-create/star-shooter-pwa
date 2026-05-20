import './style.css'
import { Ship } from './entities/Ship'
import { InputManager } from './InputManager'

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d')!;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const input = new InputManager();
const ship = new Ship(canvas.width / 2, canvas.height / 2);

function gameLoop() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (input.isKeyPressed('ArrowLeft')) ship.turnLeft();
  if (input.isKeyPressed('ArrowRight')) ship.turnRight();
  if (input.isKeyPressed('ArrowUp')) ship.thrust();

  ship.update();

  // Screen wrap
  if (ship.position.x < 0) ship.position.x = canvas.width;
  if (ship.position.x > canvas.width) ship.position.x = 0;
  if (ship.position.y < 0) ship.position.y = canvas.height;
  if (ship.position.y > canvas.height) ship.position.y = 0;

  // Draw ship (triangle)
  ctx.save();
  ctx.translate(ship.position.x, ship.position.y);
  ctx.rotate(ship.position.rotation); // Needs fix: ship.rotation
  ctx.rotate(ship.rotation);
  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.lineTo(-10, 10);
  ctx.lineTo(-10, -10);
  ctx.closePath();
  ctx.fillStyle = '#0f0';
  ctx.fill();
  ctx.restore();

  requestAnimationFrame(gameLoop);
}

gameLoop();

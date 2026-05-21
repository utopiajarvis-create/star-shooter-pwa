import './style.css'
import { Ship } from './entities/Ship'
import { InputManager } from './InputManager'
import { Projectile } from './entities/Projectile'
import { Asteroid } from './entities/Asteroid'
import { Vector2 } from './math/Vector2'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    // Show a prompt to user to refresh
  },
  onOfflineReady() {
    // Show a ready to work offline to user
  },
})

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
let projectiles: Projectile[] = [];
let asteroids: Asteroid[] = [];

for (let i = 0; i < 5; i++) {
  asteroids.push(new Asteroid(
    new Vector2(Math.random() * canvas.width, Math.random() * canvas.height),
    new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1),
    40
  ));
}

let lastShot = 0;

function gameLoop() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (input.isKeyPressed('ArrowLeft')) ship.turnLeft();
  if (input.isKeyPressed('ArrowRight')) ship.turnRight();
  if (input.isKeyPressed('ArrowUp')) ship.thrust();
  
  if (input.isKeyPressed(' ') && Date.now() - lastShot > 200) {
    const heading = new Vector2(Math.cos(ship.rotation), Math.sin(ship.rotation));
    projectiles.push(new Projectile(
      new Vector2(ship.position.x, ship.position.y).add(heading.mult(15)),
      heading.mult(5).add(ship.velocity),
      60
    ));
    lastShot = Date.now();
  }

  ship.update();

  // Screen wrap
  const wrap = (pos: Vector2) => {
    if (pos.x < 0) pos.x = canvas.width;
    if (pos.x > canvas.width) pos.x = 0;
    if (pos.y < 0) pos.y = canvas.height;
    if (pos.y > canvas.height) pos.y = 0;
  };
  wrap(ship.position);

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.update();
    wrap(p.position);
    if (p.isDead()) {
      projectiles.splice(i, 1);
    } else {
      ctx.beginPath();
      ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0';
      ctx.fill();
    }
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
    const a = asteroids[i];
    a.update();
    wrap(a.position);
    
    // Collision detection with projectiles
    let hit = false;
    for (let j = projectiles.length - 1; j >= 0; j--) {
      const p = projectiles[j];
      const dist = p.position.sub(a.position).mag();
      if (dist < a.radius + p.radius) {
        projectiles.splice(j, 1);
        hit = true;
        break;
      }
    }

    if (hit) {
      asteroids.splice(i, 1);
      asteroids.push(...a.split());
    } else {
      ctx.beginPath();
      ctx.arc(a.position.x, a.position.y, a.radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#fff';
      ctx.stroke();
    }
  }

  // Draw ship (triangle)
  ctx.save();
  ctx.translate(ship.position.x, ship.position.y);
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

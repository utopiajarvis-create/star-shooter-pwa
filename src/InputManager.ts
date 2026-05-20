export class InputManager {
  keys: { [key: string]: boolean } = {};
  
  constructor() {
    window.addEventListener('keydown', (e) => this.keys[e.key] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    
    // Setup basic touch controls here later for Mobile PWA
  }

  isKeyPressed(key: string): boolean {
    return !!this.keys[key];
  }
}

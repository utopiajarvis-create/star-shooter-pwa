export class InputManager {
  keys: { [key: string]: boolean } = {};
  joystickCenter = { x: 0, y: 0 };
  
  constructor() {
    window.addEventListener('keydown', (e) => this.keys[e.key] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    
    this.setupTouchControls();
  }

  setupTouchControls() {
    const fireBtn = document.getElementById('fire-button');
    if (fireBtn) {
      fireBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.keys[' '] = true;
      }, { passive: false });
      
      fireBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys[' '] = false;
      }, { passive: false });
    }

    const joystickBase = document.getElementById('joystick-base');
    const joystickStick = document.getElementById('joystick-stick');
    
    if (joystickBase && joystickStick) {
      let activeTouchId: number | null = null;
      let baseRect: DOMRect | null = null;

      const resetJoystick = () => {
        activeTouchId = null;
        this.keys['ArrowLeft'] = false;
        this.keys['ArrowRight'] = false;
        this.keys['ArrowUp'] = false;
        this.keys['ArrowDown'] = false;
        joystickStick.style.transform = `translate(-50%, -50%)`;
      };

      joystickBase.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (activeTouchId !== null) return;
        
        baseRect = joystickBase.getBoundingClientRect();
        const touch = e.changedTouches[0];
        activeTouchId = touch.identifier;
        this.updateJoystick(touch, baseRect, joystickStick);
      }, { passive: false });

      joystickBase.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (activeTouchId === null || !baseRect) return;
        
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === activeTouchId) {
            this.updateJoystick(e.changedTouches[i], baseRect, joystickStick);
            break;
          }
        }
      }, { passive: false });

      joystickBase.addEventListener('touchend', (e) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === activeTouchId) {
            resetJoystick();
            break;
          }
        }
      }, { passive: false });
      
      joystickBase.addEventListener('touchcancel', () => {
        resetJoystick();
      }, { passive: false });
    }
  }

  updateJoystick(touch: Touch, baseRect: DOMRect, stick: HTMLElement) {
    const centerX = baseRect.left + baseRect.width / 2;
    const centerY = baseRect.top + baseRect.height / 2;
    
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    
    const maxRadius = baseRect.width / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > maxRadius) {
      dx = (dx / distance) * maxRadius;
      dy = (dy / distance) * maxRadius;
    }
    
    stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

    // Map to keyboard input threshold
    const threshold = maxRadius * 0.3;
    
    this.keys['ArrowLeft'] = dx < -threshold;
    this.keys['ArrowRight'] = dx > threshold;
    this.keys['ArrowUp'] = dy < -threshold;
    this.keys['ArrowDown'] = dy > threshold;
  }

  isKeyPressed(key: string): boolean {
    return !!this.keys[key];
  }
}

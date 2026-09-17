import * as THREE from 'three';

// Procedural Canvas Texture Generators for Festive Birthday & Pastel Aesthetics

export function createStripedWallTexture(baseColor = '#FFD1DC', stripeColor = '#FFFDFE') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base background
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  // Vertical alternating candy stripes (48px per stripe)
  const stripeWidth = 48;
  for (let x = 0; x < 512; x += stripeWidth * 2) {
    // Stripe 1: Soft Marshmallow Cream
    ctx.fillStyle = stripeColor;
    ctx.fillRect(x, 0, stripeWidth, 512);

    // Subtle stripe edge shadow for 3D embossed depth
    ctx.fillStyle = 'rgba(212, 122, 106, 0.12)';
    ctx.fillRect(x + stripeWidth - 3, 0, 3, 512);

    // Subtle stripe edge inner highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(x, 0, 2, 512);
  }

  // Velvet fabric micro-grain noise
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2.5);
  return texture;
}

export function createVelvetWallTexture(baseColor = '#FFD1DC', dotColor = '#FFFDFE') {
  return createStripedWallTexture(baseColor, dotColor);
}

export function createStripedBalloonTexture(baseColor = '#FFB6C1', stripeColor = '#FFFDFE') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  // Vertical candy stripes on balloon
  const stripeW = 64;
  for (let x = 0; x < 512; x += stripeW * 2) {
    ctx.fillStyle = stripeColor;
    ctx.fillRect(x, 0, stripeW, 512);

    ctx.fillStyle = 'rgba(232, 165, 152, 0.2)';
    ctx.fillRect(x + stripeW - 4, 0, 4, 512);
  }

  // Glossy spherical highlight sheen
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
  grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
  grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.08)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.25)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createPolkaDotBalloonTexture(baseColor = '#FFB6C1', dotColor = '#FFFDFE') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  // Staggered polka dots
  const spacing = 80;
  const radius = 14;

  for (let y = 0; y <= 512; y += spacing) {
    const row = Math.floor(y / spacing);
    const offsetX = row % 2 === 0 ? 0 : spacing / 2;

    for (let x = -spacing / 2; x <= 512 + spacing / 2; x += spacing) {
      const cx = x + offsetX;
      const cy = y;

      // Soft shadow
      ctx.beginPath();
      ctx.arc(cx, cy + 1, radius + 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 122, 106, 0.25)';
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      // Little highlight
      ctx.beginPath();
      ctx.arc(cx - 3, cy - 3, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createPastelDoorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Base French cream & soft blush gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 2048);
  grad.addColorStop(0, '#FFF5F7');
  grad.addColorStop(0.5, '#FCE8EC');
  grad.addColorStop(1, '#F8D8DE');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 2048);

  // Delicate micro-texture
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 2048;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(232, 165, 152, 0.1)';
    ctx.fillRect(x, y, 2, 40);
  }

  // Draw 2 carved panels with Rose Gold moldings
  function drawPanel(x, y, w, h, isRosette) {
    // Outer drop shadow
    ctx.fillStyle = 'rgba(212, 122, 106, 0.2)';
    ctx.fillRect(x, y, w, h);

    // Recessed bevel in blush
    ctx.fillStyle = '#FFF8FA';
    ctx.fillRect(x + 12, y + 12, w - 24, h - 24);

    ctx.fillStyle = '#FCEBF0';
    ctx.fillRect(x + 24, y + 24, w - 48, h - 48);

    // Rose Gold Inlay Relief
    ctx.strokeStyle = '#E8A598';
    ctx.lineWidth = 6;
    ctx.strokeRect(x + 36, y + 36, w - 72, h - 72);

    ctx.strokeStyle = 'rgba(244, 194, 194, 0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 44, y + 44, w - 88, h - 88);

    const cx = x + w / 2;
    const cy = y + h / 2;

    if (isRosette) {
      // Carved celebratory rosette
      for (let r = 90; r > 10; r -= 15) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = r % 30 === 0 ? 'rgba(248, 165, 194, 0.35)' : 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        ctx.strokeStyle = '#E8A598';
        ctx.stroke();
      }
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.beginPath();
        ctx.ellipse(0, 40, 10, 30, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 214, 224, 0.6)';
        ctx.fill();
        ctx.strokeStyle = '#E8A598';
        ctx.stroke();
        ctx.restore();
      }
    } else {
      // Floral scrollwork
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = '#E8A598';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, -50, 60, 0, Math.PI);
      ctx.arc(0, 50, 60, Math.PI, 0);
      ctx.stroke();

      ctx.strokeStyle = '#F4C2C2';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  drawPanel(80, 120, 864, 980, false);
  drawPanel(80, 1200, 864, 720, true);

  // Rose Gold Doorknocker and Handle plate
  const knockerY = 1120;
  ctx.fillStyle = '#E8A598';
  ctx.beginPath();
  ctx.arc(150, knockerY, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#F4C2C2';
  ctx.lineWidth = 4;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createCarvedDoorTexture() {
  return createPastelDoorTexture();
}

export function createStoneArchTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Pearl white / soft rose ivory background
  ctx.fillStyle = '#FFF8F6';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle marble / limestone mottling
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const s = 1 + Math.random() * 4;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(244, 214, 210, 0.2)';
    ctx.fillRect(x, y, s, s);
  }

  // Carved masonry grooves
  ctx.strokeStyle = 'rgba(232, 165, 152, 0.3)';
  ctx.lineWidth = 3;
  for (let y = 128; y < 1024; y += 128) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createFanlightTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Rose-tinted translucent glass
  ctx.fillStyle = 'rgba(255, 235, 240, 0.85)';
  ctx.fillRect(0, 0, 1024, 512);

  const cx = 512;
  const cy = 512;
  const r = 480;

  // Outer arch rim in rose gold
  ctx.strokeStyle = '#E8A598';
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, 0);
  ctx.stroke();

  // Spoke rays in champagne rose gold
  ctx.strokeStyle = '#F4C2C2';
  ctx.lineWidth = 6;
  for (let a = Math.PI; a <= 0; a += Math.PI / 10) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.stroke();
  }

  // Concentric decorative arches
  for (let innerR of [160, 320]) {
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, Math.PI, 0);
    ctx.stroke();
  }

  // Warm glowing sunburst
  const radialGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 450);
  radialGrad.addColorStop(0, 'rgba(255, 248, 220, 0.7)');
  radialGrad.addColorStop(0.6, 'rgba(255, 214, 224, 0.4)');
  radialGrad.addColorStop(1, 'rgba(248, 165, 194, 0.1)');
  ctx.fillStyle = radialGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 10, Math.PI, 0);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createHerringboneFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base soft pearl pink
  ctx.fillStyle = '#FFF5F7';
  ctx.fillRect(0, 0, 1024, 1024);

  // Parquet planks
  const plankW = 48;
  const plankH = 180;

  ctx.lineWidth = 1;
  for (let y = -200; y < 1200; y += 90) {
    for (let x = -200; x < 1200; x += 180) {
      // Plank 1 (soft marshmallow blush)
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      const tone = 0.97 + Math.random() * 0.05;
      const r = Math.min(255, Math.floor(255 * tone));
      const g = Math.min(255, Math.floor(245 * tone));
      const b = Math.min(255, Math.floor(248 * tone));
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, 0, plankW, plankH);
      ctx.strokeStyle = 'rgba(244, 194, 194, 0.45)';
      ctx.strokeRect(0, 0, plankW, plankH);
      ctx.restore();

      // Plank 2 (delicate rose ivory)
      ctx.save();
      ctx.translate(x + 90, y);
      ctx.rotate(-Math.PI / 4);
      const tone2 = 0.96 + Math.random() * 0.05;
      const r2 = Math.min(255, Math.floor(253 * tone2));
      const g2 = Math.min(255, Math.floor(240 * tone2));
      const b2 = Math.min(255, Math.floor(244 * tone2));
      ctx.fillStyle = `rgb(${r2}, ${g2}, ${b2})`;
      ctx.fillRect(0, 0, plankW, plankH);
      ctx.strokeStyle = 'rgba(244, 194, 194, 0.45)';
      ctx.strokeRect(0, 0, plankW, plankH);
      ctx.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

export function createRoseGoldFiligreeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Rose Gold gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#FFE0E6');
  grad.addColorStop(0.3, '#F4C2C2');
  grad.addColorStop(0.7, '#E8A598');
  grad.addColorStop(1, '#D47A6A');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Baroque filigree swirls in shimmering champagne-white
  ctx.strokeStyle = '#FFFDF9';
  ctx.lineWidth = 3;
  for (let y = 0; y < 512; y += 64) {
    for (let x = 0; x < 512; x += 64) {
      ctx.beginPath();
      ctx.arc(x + 32, y + 32, 22, 0, Math.PI * 1.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x + 32, y + 32, 11, Math.PI * 0.5, Math.PI * 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createGoldFiligreeTexture() {
  return createRoseGoldFiligreeTexture();
}

export function createDelftPorcelainTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Glossy porcelain white
  ctx.fillStyle = '#FFFDFE';
  ctx.fillRect(0, 0, 512, 512);

  // Rose Pink Chinoiserie floral patterns
  ctx.fillStyle = '#E8A598';
  ctx.strokeStyle = '#F4C2C2';
  ctx.lineWidth = 3;

  for (let y = 40; y < 512; y += 80) {
    for (let x = 40; x < 512; x += 80) {
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(a) * 16, y + Math.sin(a) * 16, 8, 14, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#D47A6A';
      ctx.fill();
      ctx.fillStyle = '#E8A598';

      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createPlacardTexture(title = '', date = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');

  // Background marshmallow white plate
  ctx.fillStyle = '#FFFDFE';
  ctx.fillRect(0, 0, 512, 140);

  // Rose Gold border
  ctx.strokeStyle = '#E8A598';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 504, 132);

  // Inner delicate frame
  ctx.strokeStyle = '#F4C2C2';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 492, 120);

  // Berry Rose typography
  ctx.fillStyle = '#5A2A38';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Title
  ctx.font = 'bold 28px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.fillText(title, 256, 52);

  // Date / Subtitle
  if (date) {
    ctx.font = 'italic 20px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#8B4859';
    ctx.fillText(date, 256, 96);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createPlaqueTexture(text = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');

  // Rose Gold & Champagne gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 100);
  grad.addColorStop(0, '#FFE8ED');
  grad.addColorStop(0.5, '#F4C2C2');
  grad.addColorStop(1, '#E8A598');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 100);

  // Border
  ctx.strokeStyle = '#5A2A38';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 504, 92);

  // Berry Rose engraved text
  ctx.fillStyle = '#5A2A38';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 30px "Cinzel", Georgia, serif';
  ctx.fillText(text, 256, 50);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createNameTagTexture(name = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');

  // Frosted strawberry glass plate
  ctx.fillStyle = 'rgba(255, 240, 245, 0.92)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, 292, 72, 16);
  } else {
    ctx.rect(4, 4, 292, 72);
  }
  ctx.fill();

  // Rose Gold border
  ctx.strokeStyle = '#E8A598';
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, 292, 72, 16);
  } else {
    ctx.strokeRect(4, 4, 292, 72);
  }
  ctx.stroke();

  // Name Text in Berry Rose
  ctx.fillStyle = '#5A2A38';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 30px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.fillText(name, 150, 40);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createCakeFrostingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Strawberry pink base frosting
  ctx.fillStyle = '#FFE5EC';
  ctx.fillRect(0, 0, 512, 512);

  // Vanilla swirls
  ctx.strokeStyle = '#FFFDFE';
  ctx.lineWidth = 16;
  for (let y = 0; y < 512; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(128, y + 24, 384, y - 24, 512, y);
    ctx.stroke();
  }

  // Colorful sprinkles (rose gold, lavender, mint, yellow)
  const colors = ['#F8A5C2', '#E8D5EA', '#D8F3DC', '#FEE440', '#FFFFFF'];
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const len = 6 + Math.random() * 6;
    const angle = Math.random() * Math.PI;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillRect(-len / 2, -2, len, 4);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}



import * as THREE from 'three';

// Procedural Canvas Texture Generators for Neoclassical Museum & Shadowbox Aesthetics

export function createCarvedDoorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Base rich antique walnut wood
  const grad = ctx.createLinearGradient(0, 0, 1024, 2048);
  grad.addColorStop(0, '#54361e');
  grad.addColorStop(0.5, '#3d2513');
  grad.addColorStop(1, '#2c180b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 2048);

  // Fine wood grain noise
  ctx.fillStyle = 'rgba(20, 10, 5, 0.08)';
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 2048;
    const h = 20 + Math.random() * 80;
    ctx.fillRect(x, y, 1.5, h);
  }

  // Draw 2 large carved panel sections (Upper ornate panel, Lower rosette panel)
  function drawCarvedPanel(x, y, w, h, isRosette) {
    // Outer shadow & bevel
    ctx.fillStyle = 'rgba(10, 5, 2, 0.65)';
    ctx.fillRect(x, y, w, h);

    // Recessed bevel
    ctx.fillStyle = 'rgba(95, 62, 36, 0.8)';
    ctx.fillRect(x + 12, y + 12, w - 24, h - 24);

    ctx.fillStyle = '#341f11';
    ctx.fillRect(x + 24, y + 24, w - 48, h - 48);

    // Inner relief frame
    ctx.strokeStyle = '#855932';
    ctx.lineWidth = 6;
    ctx.strokeRect(x + 36, y + 36, w - 72, h - 72);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)'; // Subtle gold leaf touch
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 44, y + 44, w - 88, h - 88);

    const cx = x + w / 2;
    const cy = y + h / 2;

    if (isRosette) {
      // Carved rosette medallion
      for (let r = 100; r > 10; r -= 15) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = r % 30 === 0 ? 'rgba(120, 80, 45, 0.5)' : 'rgba(30, 15, 8, 0.5)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.stroke();
      }
      // Rosette petals
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(a);
        ctx.beginPath();
        ctx.ellipse(0, 45, 12, 35, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(140, 95, 55, 0.4)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(20, 10, 5, 0.6)';
        ctx.stroke();
        ctx.restore();
      }
    } else {
      // Ornate baroque scrollwork in upper panel
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = 'rgba(160, 110, 65, 0.6)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(0, -60, 70, 0, Math.PI);
      ctx.arc(0, 60, 70, Math.PI, 0);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Upper panel
  drawCarvedPanel(80, 120, 864, 980, false);
  // Lower rosette panel
  drawCarvedPanel(80, 1200, 864, 720, true);

  // Brass Keyhole and Doorknocker plate
  const knockerY = 1120;
  ctx.fillStyle = '#b8860b';
  ctx.beginPath();
  ctx.arc(150, knockerY, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Brass handle ring
  ctx.beginPath();
  ctx.arc(150, knockerY + 45, 26, 0, Math.PI * 2);
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 8;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createStoneArchTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Warm White / Limestone background
  ctx.fillStyle = '#ede5d4';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle natural limestone texture and mottling
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const s = 1 + Math.random() * 4;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(175, 160, 140, 0.12)';
    ctx.fillRect(x, y, s, s);
  }

  // Carved masonry block grooves
  ctx.strokeStyle = 'rgba(140, 125, 105, 0.35)';
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

  // Clear / dark glass interior
  ctx.fillStyle = 'rgba(25, 20, 25, 0.85)';
  ctx.fillRect(0, 0, 1024, 512);

  // Semicircular radiating sunburst spokes
  const cx = 512;
  const cy = 512;
  const r = 480;

  // Outer arch rim
  ctx.strokeStyle = '#4a2f1b';
  ctx.lineWidth = 24;
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, 0);
  ctx.stroke();

  // Ornate fan spokes
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 8;
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

  // Warm sunbeams through the glass
  const radialGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 450);
  radialGrad.addColorStop(0, 'rgba(254, 243, 199, 0.6)');
  radialGrad.addColorStop(0.7, 'rgba(245, 208, 198, 0.25)');
  radialGrad.addColorStop(1, 'rgba(98, 32, 47, 0.05)');
  ctx.fillStyle = radialGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 12, Math.PI, 0);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createVelvetWallTexture(baseColor = '#A37C76', dotColor = '#E6D8C1') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base velvet background
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  // Soft fabric velvet noise
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Vintage Cream (#E6D8C1) Polka Dot Wallpaper Pattern
  const dotSpacing = 64;
  const dotRadius = 5.5;

  for (let y = 0; y <= 512; y += dotSpacing) {
    const rowIdx = Math.floor(y / dotSpacing);
    const offsetX = rowIdx % 2 === 0 ? 0 : dotSpacing / 2;

    for (let x = -dotSpacing / 2; x <= 512 + dotSpacing / 2; x += dotSpacing) {
      const cx = x + offsetX;
      const cy = y;

      // Soft ambient velvet drop shadow for 3D depth
      ctx.beginPath();
      ctx.arc(cx, cy + 0.8, dotRadius + 0.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(60, 35, 30, 0.18)';
      ctx.fill();

      // Vintage Cream Polka Dot
      ctx.beginPath();
      ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      // Delicate subtle cream inner highlight
      ctx.beginPath();
      ctx.arc(cx - 1, cy - 1, dotRadius * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2.5);
  return texture;
}

export function createHerringboneFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base pastel pink almost white
  ctx.fillStyle = '#fdf6f5';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle marble / whitewashed wood noise
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 6;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Delicate pastel pink herringbone parquet layout
  const plankW = 48;
  const plankH = 180;

  ctx.lineWidth = 1;
  for (let y = -200; y < 1200; y += 90) {
    for (let x = -200; x < 1200; x += 180) {
      // Diagonal plank 1 (soft blush pink almost white)
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      const tone = 0.96 + Math.random() * 0.08;
      const r = Math.min(255, Math.floor(253 * tone));
      const g = Math.min(255, Math.floor(242 * tone));
      const b = Math.min(255, Math.floor(240 * tone));
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, 0, plankW, plankH);
      ctx.strokeStyle = 'rgba(225, 195, 190, 0.45)';
      ctx.strokeRect(0, 0, plankW, plankH);
      ctx.restore();

      // Diagonal plank 2 (delicate pastel rose ivory)
      ctx.save();
      ctx.translate(x + 90, y);
      ctx.rotate(-Math.PI / 4);
      const tone2 = 0.95 + Math.random() * 0.08;
      const r2 = Math.min(255, Math.floor(251 * tone2));
      const g2 = Math.min(255, Math.floor(238 * tone2));
      const b2 = Math.min(255, Math.floor(236 * tone2));
      ctx.fillStyle = `rgb(${r2}, ${g2}, ${b2})`;
      ctx.fillRect(0, 0, plankW, plankH);
      ctx.strokeStyle = 'rgba(225, 195, 190, 0.45)';
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

export function createGoldFiligreeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Gilded base
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#f9e08a');
  grad.addColorStop(0.3, '#d4af37');
  grad.addColorStop(0.7, '#aa820a');
  grad.addColorStop(1, '#614805');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Baroque acanthus filigree scroll pattern
  ctx.strokeStyle = '#fff1b8';
  ctx.lineWidth = 4;
  for (let y = 0; y < 512; y += 64) {
    for (let x = 0; x < 512; x += 64) {
      ctx.beginPath();
      ctx.arc(x + 32, y + 32, 24, 0, Math.PI * 1.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x + 32, y + 32, 12, Math.PI * 0.5, Math.PI * 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createDelftPorcelainTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Pure glossy porcelain white
  ctx.fillStyle = '#f8fbfd';
  ctx.fillRect(0, 0, 512, 512);

  // Cobalt blue Chinoiserie floral patterns
  ctx.fillStyle = '#103778';
  ctx.strokeStyle = '#103778';
  ctx.lineWidth = 3;

  for (let y = 40; y < 512; y += 80) {
    for (let x = 40; x < 512; x += 80) {
      // Central 4-petal flower
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(a) * 16, y + Math.sin(a) * 16, 8, 14, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#0a2350';
      ctx.fill();
      ctx.fillStyle = '#103778';

      // Vines
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

  // Background warm white plate
  ctx.fillStyle = '#fbf7e8';
  ctx.fillRect(0, 0, 512, 140);

  // Gilded gold border
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 506, 134);

  // Dark Oak text
  ctx.fillStyle = '#3D2B1F';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Title
  ctx.font = 'bold 30px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.fillText(title, 256, 52);

  // Subtitle / Date
  if (date) {
    ctx.font = 'italic 20px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#5c4333';
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

  // Brass gold gradient background
  const grad = ctx.createLinearGradient(0, 0, 512, 100);
  grad.addColorStop(0, '#f9e08a');
  grad.addColorStop(0.5, '#d4af37');
  grad.addColorStop(1, '#aa820a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 100);

  // Dark Oak inner border
  ctx.strokeStyle = '#3D2B1F';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 504, 92);

  // Dark Oak engraved text
  ctx.fillStyle = '#3D2B1F';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 32px "Cinzel", Georgia, serif';
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

  // Dark translucent background plate
  ctx.fillStyle = 'rgba(25, 18, 15, 0.85)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, 292, 72, 16);
  } else {
    ctx.rect(4, 4, 292, 72);
  }
  ctx.fill();

  // Dainty gold filigree border
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, 292, 72, 16);
  } else {
    ctx.strokeRect(4, 4, 292, 72);
  }
  ctx.stroke();

  // Name Text in Warm Ivory
  ctx.fillStyle = '#fbf7e8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 32px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.fillText(name, 150, 40);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}



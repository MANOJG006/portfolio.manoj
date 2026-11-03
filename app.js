/**
 * MANOJ G — IMMERSIVE 3D ENGINEERING & SOFTWARE DEVELOPER PORTFOLIO
 * High-performance Three.js WebGL scenes, 3D project showcases, 
 * circuit traces, 3D card tilt, QR codes, and touch interactions.
 * Built with pure JavaScript (MERN Stack ecosystem, Zero external framework lock-in).
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initNavigation();
  initInteractiveProjects();
  initResumeModal();
  initTouchAnimation();
  initQRCodes();
  initScrollAnimations();
  init3DCardTilt();
  initBackgroundTechCanvas();
  initThreeDepthScene();
  initCursorGlow();
  initBackToTop();
  initHero3DProcessor();
  initProject3DCar();
  initProject3DVoting();
  initProject3DCampus();
  initProject3DRegen();
  initSkills3DHub();
  initProtocolOscilloscope();
});

/* ==========================================================================
   1. TOUCH & CLICK INTERACTIVE ANIMATION (CIRCUIT CROSSHAIR & RIPPLE)
   ========================================================================== */
function initTouchAnimation() {
  const createTouchPulse = (x, y) => {
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    const circuit = document.createElement('div');
    circuit.className = 'ece-circuit-ripple';
    circuit.style.left = `${x}px`;
    circuit.style.top = `${y}px`;
    document.body.appendChild(circuit);

    const sparkle = document.createElement('div');
    sparkle.className = 'touch-sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => {
      ripple.remove();
      circuit.remove();
      sparkle.remove();
    }, 700);
  };

  window.addEventListener('pointerdown', (e) => {
    // Avoid double ripples on form inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    createTouchPulse(e.clientX, e.clientY);
  }, { passive: true });
}

/* ==========================================================================
   2. HERO TYPING EFFECT (4 CORE ROLES)
   ========================================================================== */
function initTypingEffect() {
  const element = document.getElementById('typing-text');
  if (!element) return;

  const roles = [
    'Software Developer',
    'Full-Stack Developer',
    'Electronics & Communication Engineering Student',
    'Embedded Systems and IoT Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1900; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350; // Pause before new text
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. BACKGROUND ENGINEERING CANVAS (BLUEPRINT & OSCILLOSCOPE)
   ========================================================================== */
function initBackgroundTechCanvas() {
  const canvas = document.getElementById('bg-tech-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  let time = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Subtle Blueprint Dot Matrix & Grid
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.4)';
    ctx.lineWidth = 1;
    const gridSize = 48;

    ctx.beginPath();
    for (let x = 0; x < width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // 2. Oscilloscope Signal Trace 1: Sine Wave (Telemetry Telecommunication)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(2, 132, 199, 0.22)';
    ctx.lineWidth = 2;
    const waveY1 = height * 0.32;
    for (let x = 0; x < width; x += 6) {
      const y = waveY1 + Math.sin(x * 0.008 + time * 1.8) * 28 + Math.cos(x * 0.003 - time * 0.8) * 12;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 3. Oscilloscope Signal Trace 2: PWM Square Wave (Motor Control / Timer)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(5, 150, 105, 0.18)';
    ctx.lineWidth = 1.8;
    const waveY2 = height * 0.72;
    const period = 70;
    for (let x = 0; x < width; x += 4) {
      const phase = (x + time * 65) % period;
      const y = waveY2 + (phase < period * 0.5 ? -18 : 18);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    time += 0.016;
    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. 3D HERO MICROPROCESSOR SCENE (REALISTIC 3D ENGINEERING ASSEMBLY)
   ========================================================================== */
function initHero3DProcessor() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0.35, 6.4);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } catch (err) {
    console.warn('WebGL init skipped:', err);
    return;
  }

  // Studio Lighting Setup for High-Fidelity Metallic Sheen
  const ambLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambLight);

  // Key directional light (Electric Blue)
  const keyLight = new THREE.DirectionalLight(0x0284c7, 2.2);
  keyLight.position.set(6, 9, 7);
  scene.add(keyLight);

  // Rim light (Warm Gold for metallic pin highlights)
  const rimLight = new THREE.DirectionalLight(0xf59e0b, 1.4);
  rimLight.position.set(-6, -4, -5);
  scene.add(rimLight);

  // Soft fill light (Violet Accent)
  const fillLight = new THREE.DirectionalLight(0x7c3aed, 1.1);
  fillLight.position.set(0, -6, 4);
  scene.add(fillLight);

  // Dynamic cyan core activity point light
  const coreLight = new THREE.PointLight(0x00f0ff, 2.4, 12);
  coreLight.position.set(0, 0.8, 0);
  scene.add(coreLight);

  // Master 3D Group centered in canvas
  const processorGroup = new THREE.Group();
  processorGroup.position.set(0, 0, 0);
  scene.add(processorGroup);

  // --- PROCEDURAL TEXTURES FOR MAXIMUM REALISM ---
  // 1. Laser-Etched Metallic Heat Spreader Texture
  function createLaserEtchedLidTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');

    // Brushed metal substrate gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    bgGrad.addColorStop(0, '#1e293b');
    bgGrad.addColorStop(0.3, '#334155');
    bgGrad.addColorStop(0.5, '#475569');
    bgGrad.addColorStop(0.7, '#334155');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Micro-grain brushed lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1024; i += 3) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    // Outer Bevel Rim
    ctx.strokeStyle = 'rgba(2, 132, 199, 0.7)';
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, 944, 944);

    // Pin 1 Index Notch Dot (Gold)
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(95, 95, 22, 0, Math.PI * 2);
    ctx.fill();

    // Laser Markings: Brand & Product
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 54px "JetBrains Mono", Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ESPRESSIF', 512, 230);

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 82px "JetBrains Mono", Consolas, monospace';
    ctx.fillText('ESP32-S3', 512, 330);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 36px "JetBrains Mono", Consolas, monospace';
    ctx.fillText('240MHz DUAL-CORE XTENSA LX7', 512, 400);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '30px "JetBrains Mono", Consolas, monospace';
    ctx.fillText('512KB SRAM // 8MB PSRAM // AI ACCEL', 512, 460);
    ctx.fillText('WI-FI 802.11 b/g/n + BLUETOOTH 5.0', 512, 510);

    // Schematic Architecture Diagram in center
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.lineWidth = 4;
    ctx.strokeRect(260, 580, 220, 160);
    ctx.strokeRect(544, 580, 220, 160);

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
    ctx.fillText('CORE 0', 370, 670);
    ctx.fillText('CORE 1', 654, 670);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.lineWidth = 3;
    ctx.strokeRect(230, 780, 564, 80);
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 26px "JetBrains Mono", monospace';
    ctx.fillText('HIGH-SPEED SYSTEM BUS / DMA / CRYPTO', 512, 830);

    // Regulatory certification badges
    ctx.fillStyle = '#64748b';
    ctx.font = '22px "JetBrains Mono", monospace';
    ctx.fillText('FCC ID: 2AC7Z-ESPS3 // CE // RoHS COMPLIANT', 512, 930);

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    return tex;
  }

  // 2. High-Density PCB Circuit Trace Texture
  function createPcbSubstrateTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');

    // Deep matte dark PCB substrate
    ctx.fillStyle = '#060d17';
    ctx.fillRect(0, 0, 1024, 1024);

    // Micro grid mesh
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, x); ctx.lineTo(1024, x); ctx.stroke();
    }

    // Gold & Cyan bus traces
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    const traces = [
      [[140, 50], [140, 240], [300, 240], [300, 330]],
      [[260, 50], [260, 200], [420, 200], [420, 330]],
      [[512, 50], [512, 330]],
      [[764, 50], [764, 200], [604, 200], [604, 330]],
      [[884, 50], [884, 240], [724, 240], [724, 330]],
      // Bottom traces
      [[140, 974], [140, 784], [300, 784], [300, 694]],
      [[512, 974], [512, 694]],
      [[884, 974], [884, 784], [724, 784], [724, 694]],
      // Left & right traces
      [[50, 140], [240, 140], [240, 300], [330, 300]],
      [[50, 512], [330, 512]],
      [[50, 884], [240, 884], [240, 724], [330, 724]],
      [[974, 140], [784, 140], [784, 300], [694, 300]],
      [[974, 512], [694, 512]],
      [[974, 884], [784, 884], [784, 724], [694, 724]]
    ];

    traces.forEach(pts => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.stroke();

      // Cyan Via pads
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(pts[0][0], pts[0][1], 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // Gold plated corner mounting holes
    const corners = [[75, 75], [949, 75], [75, 949], [949, 949]];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fill();
    });

    // Test Point text
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText('3V3', 180, 80);
    ctx.fillText('GND', 840, 80);
    ctx.fillText('TXD', 180, 955);
    ctx.fillText('RXD', 840, 955);

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    return tex;
  }

  // 3. Crisp High-DPI Billboard Sprite Generator for Tech Elements
  function createTechBillboard(label, colorHex) {
    const c = document.createElement('canvas');
    c.width = 300;
    c.height = 96;
    const ctx = c.getContext('2d');

    // Rounded pill card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(8, 8, 284, 80, 24);
    ctx.fill();
    ctx.stroke();

    // Glowing status bead
    ctx.fillStyle = colorHex;
    ctx.shadowColor = colorHex;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(44, 48, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Text Label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px "JetBrains Mono", Consolas, monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 76, 48);

    const tex = new THREE.CanvasTexture(c);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(1.05, 0.34, 1);
    return sprite;
  }

  // --- 1. MOTHERBOARD PCB BASE ---
  const pcbGeo = new THREE.BoxGeometry(4.3, 0.12, 4.3);
  const pcbMat = new THREE.MeshStandardMaterial({
    map: createPcbSubstrateTexture(),
    metalness: 0.35,
    roughness: 0.65
  });
  const pcbBoard = new THREE.Mesh(pcbGeo, pcbMat);
  pcbBoard.position.y = -0.15;
  processorGroup.add(pcbBoard);

  // --- 2. CERAMIC CHIP BODY (MATTE GRAPHITE RESIN) ---
  const bodyGeo = new THREE.BoxGeometry(3.0, 0.24, 3.0);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    metalness: 0.85,
    roughness: 0.35
  });
  const chipBody = new THREE.Mesh(bodyGeo, bodyMat);
  chipBody.position.y = 0.03;
  processorGroup.add(chipBody);

  // --- 3. METALLIC HEAT SPREADER / RF SHIELD WITH LASER ENGRAVING ---
  const lidGeo = new THREE.BoxGeometry(2.55, 0.16, 2.55);
  const lidMat = new THREE.MeshStandardMaterial({
    map: createLaserEtchedLidTexture(),
    metalness: 0.95,
    roughness: 0.18
  });
  const chipLid = new THREE.Mesh(lidGeo, lidMat);
  chipLid.position.y = 0.22;
  processorGroup.add(chipLid);

  // --- 4. EXPOSED DUAL SILICON CORES (GLOWING MICRO-ARCHITECTURE) ---
  const dieGeo = new THREE.BoxGeometry(0.72, 0.05, 0.62);
  const dieMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.55,
    roughness: 0.2,
    metalness: 0.9
  });
  const die0 = new THREE.Mesh(dieGeo, dieMat);
  die0.position.set(-0.48, 0.32, 0.32);
  processorGroup.add(die0);

  const die1 = new THREE.Mesh(dieGeo, dieMat.clone());
  die1.position.set(0.48, 0.32, 0.32);
  processorGroup.add(die1);

  // Optical Glass Cover over Cores
  const glassGeo = new THREE.BoxGeometry(1.9, 0.02, 0.8);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.45,
    roughness: 0.05,
    transmission: 0.9,
    reflectivity: 0.9
  });
  const glassCover = new THREE.Mesh(glassGeo, glassMat);
  glassCover.position.set(0, 0.35, 0.32);
  processorGroup.add(glassCover);

  // --- 5. 36 METALLIC GULL-WING PINS (9 ON EACH SIDE) ---
  const pinGeo = new THREE.BoxGeometry(0.08, 0.06, 0.42);
  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.96,
    roughness: 0.14
  });

  const numPins = 9;
  const pinSpread = 2.4;
  for (let i = 0; i < numPins; i++) {
    const offset = -pinSpread / 2 + (i / (numPins - 1)) * pinSpread;

    // Front & Back
    const pf = new THREE.Mesh(pinGeo, pinMat);
    pf.position.set(offset, 0.03, 1.7);
    processorGroup.add(pf);

    const pb = new THREE.Mesh(pinGeo, pinMat);
    pb.position.set(offset, 0.03, -1.7);
    processorGroup.add(pb);

    // Left & Right
    const pl = new THREE.Mesh(pinGeo, pinMat);
    pl.rotation.y = Math.PI / 2;
    pl.position.set(-1.7, 0.03, offset);
    processorGroup.add(pl);

    const pr = new THREE.Mesh(pinGeo, pinMat);
    pr.rotation.y = Math.PI / 2;
    pr.position.set(1.7, 0.03, offset);
    processorGroup.add(pr);
  }

  // --- 6. SURFACE MOUNT SMD COMPONENTS (0603 CAPACITORS & RESISTORS) ---
  const capGeo = new THREE.BoxGeometry(0.18, 0.08, 0.1);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.3 }); // Ceramic tan
  const resGeo = new THREE.BoxGeometry(0.18, 0.07, 0.1);
  const resMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 }); // Black resin

  const smdPositions = [
    [-1.75, 0.04, 1.1], [-1.75, 0.04, 0.7], [-1.75, 0.04, -0.7], [-1.75, 0.04, -1.1],
    [1.75, 0.04, 1.1], [1.75, 0.04, 0.7], [1.75, 0.04, -0.7], [1.75, 0.04, -1.1]
  ];

  smdPositions.forEach((pos, idx) => {
    const smd = new THREE.Mesh(idx % 2 === 0 ? capGeo : resGeo, idx % 2 === 0 ? capMat : resMat);
    smd.position.set(...pos);
    processorGroup.add(smd);
  });

  // SMD Power LED (Steady Green)
  const pwrLed = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.07, 0.1),
    new THREE.MeshBasicMaterial({ color: 0x10b981 })
  );
  pwrLed.position.set(-1.8, 0.05, 1.8);
  processorGroup.add(pwrLed);

  // SMD RX/TX Data LED (Pulsing Cyan)
  const dataLed = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.07, 0.1),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff })
  );
  dataLed.position.set(1.8, 0.05, 1.8);
  processorGroup.add(dataLed);

  // --- 7. ANIMATED CIRCUIT BUS PULSES (TRAVELING ELECTRONS) ---
  const pulseCount = 28;
  const pulseGeo = new THREE.BufferGeometry();
  const pulsePositions = new Float32Array(pulseCount * 3);
  const pulseTracks = [];

  for (let i = 0; i < pulseCount; i++) {
    const side = i % 4;
    const progress = Math.random();
    pulseTracks.push({ side, progress, speed: 0.35 + Math.random() * 0.45 });
  }
  pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));

  const pulseMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.14,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });
  const pulseParticles = new THREE.Points(pulseGeo, pulseMat);
  processorGroup.add(pulseParticles);

  // --- 8. 7 3D TECH SATELLITES WITH ORBIT RINGS & BILLBOARD LABELS ---
  const techList = [
    { name: 'Java', color: '#ef4444', colorHex: 0xef4444, radius: 2.7, inclination: 0.22, speed: 0.5 },
    { name: 'React', color: '#0284c7', colorHex: 0x0284c7, radius: 3.1, inclination: -0.35, speed: 0.42 },
    { name: 'JS', color: '#eab308', colorHex: 0xeab308, radius: 2.5, inclination: 0.45, speed: 0.6 },
    { name: 'Python', color: '#10b981', colorHex: 0x10b981, radius: 3.4, inclination: -0.2, speed: 0.36 },
    { name: 'ESP32', color: '#7c3aed', colorHex: 0x7c3aed, radius: 2.8, inclination: 0.55, speed: 0.48 },
    { name: 'AI', color: '#ec4899', colorHex: 0xec4899, radius: 3.2, inclination: -0.5, speed: 0.44 },
    { name: 'IoT', color: '#059669', colorHex: 0x059669, radius: 3.6, inclination: 0.15, speed: 0.32 }
  ];

  const satelliteNodes = [];

  techList.forEach((tech, i) => {
    const satGroup = new THREE.Group();

    // Orbital Path Ring in 3D perspective
    const orbitRingGeo = new THREE.TorusGeometry(tech.radius, 0.012, 16, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: tech.colorHex,
      transparent: true,
      opacity: 0.22
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2 + tech.inclination;
    processorGroup.add(orbitRing);

    // Multi-faceted 3D Crystal Core (Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(0.18, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: tech.colorHex,
      emissive: tech.colorHex,
      emissiveIntensity: 0.65,
      metalness: 0.85,
      roughness: 0.2
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    satGroup.add(crystal);

    // Outer Gyro Gimbal Ring
    const gimbalGeo = new THREE.TorusGeometry(0.24, 0.016, 12, 24);
    const gimbalMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1
    });
    const gimbal = new THREE.Mesh(gimbalGeo, gimbalMat);
    satGroup.add(gimbal);

    // Floating High-DPI Billboard Label
    const billboard = createTechBillboard(tech.name, tech.color);
    billboard.position.y = 0.38;
    satGroup.add(billboard);

    satGroup.userData = {
      radius: tech.radius,
      inclination: tech.inclination,
      speed: tech.speed,
      angle: (i / techList.length) * Math.PI * 2,
      crystal,
      gimbal
    };

    processorGroup.add(satGroup);
    satelliteNodes.push(satGroup);
  });

  // --- 9. FLOATING 3D AMBIENT DATA PARTICLES (120 MICRO SPARKS) ---
  const sparkCount = 120;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkCoords = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount * 3; i += 3) {
    sparkCoords[i] = (Math.random() - 0.5) * 8;
    sparkCoords[i + 1] = (Math.random() - 0.5) * 6;
    sparkCoords[i + 2] = (Math.random() - 0.5) * 7;
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkCoords, 3));
  const sparkMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.065,
    transparent: true,
    opacity: 0.55
  });
  const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
  scene.add(sparkPoints);

  // --- 10. REALISTIC 360-DEGREE INTERACTIVE DRAG WITH INERTIA & PARALLAX ---
  let isDragging = false;
  let prevPointerX = 0, prevPointerY = 0;
  let velX = 0, velY = 0;
  let rotX = 0.38, rotY = -0.55;
  let autoRotate = true;

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    autoRotate = false;
    prevPointerX = e.clientX;
    prevPointerY = e.clientY;
    velX = 0;
    velY = 0;
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
  });

  canvas.addEventListener('pointermove', (e) => {
    if (isDragging) {
      const dx = e.clientX - prevPointerX;
      const dy = e.clientY - prevPointerY;
      velX = dx * 0.007;
      velY = dy * 0.007;
      rotY += velX;
      rotX += velY;
      // Clamp pitch to prevent inverted upside-down view
      rotX = Math.max(-1.25, Math.min(1.25, rotX));
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    }
  });

  const onPointerEnd = (e) => {
    if (isDragging) {
      isDragging = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  };
  canvas.addEventListener('pointerup', onPointerEnd);
  canvas.addEventListener('pointercancel', onPointerEnd);

  // Smooth Reset function
  window.resetHeroProcessor = function() {
    rotX = 0.38;
    rotY = -0.55;
    velX = 0;
    velY = 0;
    autoRotate = true;
  };

  // Subtle Mouse Parallax Hover
  let mouseNormX = 0, mouseNormY = 0;
  window.addEventListener('pointermove', (e) => {
    mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  // Responsive Canvas Resize
  function handleResize() {
    if (!canvas.parentElement) return;
    const w = canvas.parentElement.clientWidth || canvas.clientWidth;
    const h = canvas.parentElement.clientHeight || canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);

    // Adjust scale on smaller devices
    if (window.innerWidth < 768) {
      processorGroup.scale.set(0.75, 0.75, 0.75);
      camera.position.z = 7.2;
    } else if (window.innerWidth < 1024) {
      processorGroup.scale.set(0.85, 0.85, 0.85);
      camera.position.z = 6.8;
    } else {
      processorGroup.scale.set(1.0, 1.0, 1.0);
      camera.position.z = 6.4;
    }
  }
  window.addEventListener('resize', handleResize, { passive: true });
  handleResize();

  // Throttled Animation Loop via IntersectionObserver
  let isVisible = true;
  const obs = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.05 });
  obs.observe(canvas);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = clock.getElapsedTime();

    // 1. Drag Momentum & Physics Rotation
    if (!isDragging) {
      rotY += velX;
      rotX += velY;
      velX *= 0.93; // Smooth friction damping
      velY *= 0.93;

      if (Math.abs(velX) < 0.0004 && Math.abs(velY) < 0.0004) {
        autoRotate = true;
      }
      if (autoRotate) {
        // Continuous gentle floating orbit
        rotY += 0.0035;
        const targetHoverX = 0.38 + Math.sin(time * 0.9) * 0.08 + mouseNormY * 0.08;
        rotX = THREE.MathUtils.lerp(rotX, targetHoverX, 0.04);
      }
    }
    processorGroup.rotation.x = rotX;
    processorGroup.rotation.y = rotY;
    processorGroup.position.y = Math.sin(time * 1.5) * 0.06;

    // 2. Dual Silicon Die Computational Shimmer
    const shimmer = 0.55 + Math.sin(time * 5.0) * 0.25;
    dieMat.emissiveIntensity = shimmer;
    coreLight.intensity = 2.0 + Math.sin(time * 4.0) * 0.6;

    // 3. Activity LED Data Bursts
    dataLed.material.color.setHex((Math.sin(time * 14) > 0.3) ? 0x00f0ff : 0x0284c7);

    // 4. Update Circuit Trace Electron Pulses
    const pPos = pulseGeo.attributes.position.array;
    pulseTracks.forEach((t, i) => {
      t.progress += t.speed * 0.016;
      if (t.progress > 1.0) t.progress = 0;

      // Map progress along PCB edges into chip pins
      const d = 1.95 - t.progress * 0.55;
      const idx = i * 3;
      if (t.side === 0) { // Top
        pPos[idx] = (Math.sin(i * 1.7) * 1.2);
        pPos[idx + 1] = 0.04;
        pPos[idx + 2] = -d;
      } else if (t.side === 1) { // Bottom
        pPos[idx] = (Math.cos(i * 1.3) * 1.2);
        pPos[idx + 1] = 0.04;
        pPos[idx + 2] = d;
      } else if (t.side === 2) { // Left
        pPos[idx] = -d;
        pPos[idx + 1] = 0.04;
        pPos[idx + 2] = (Math.sin(i * 1.5) * 1.2);
      } else { // Right
        pPos[idx] = d;
        pPos[idx + 1] = 0.04;
        pPos[idx + 2] = (Math.cos(i * 1.9) * 1.2);
      }
    });
    pulseGeo.attributes.position.needsUpdate = true;

    // 5. Update Orbiting Satellites
    satelliteNodes.forEach((node) => {
      const u = node.userData;
      u.angle += u.speed * 0.015;

      const px = Math.cos(u.angle) * u.radius;
      const pz = Math.sin(u.angle) * u.radius;
      const py = Math.sin(u.angle + u.inclination) * (u.radius * 0.35);

      node.position.set(px, py, pz);

      // Self spin crystal & gimbal
      u.crystal.rotation.x += 0.03;
      u.crystal.rotation.y += 0.04;
      u.gimbal.rotation.z += 0.02;
    });

    // 6. Drift Background Micro Sparks
    sparkPoints.rotation.y = time * 0.03;

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   5. REUSABLE 3D CANVAS INTERACTIVE DRAG-TO-ORBIT HELPER
   ========================================================================== */
function make3DCanvasInteractive(canvas, targetGroup, defaultRotX = 0, defaultRotY = 0, minRotX = -1.2, maxRotX = 1.2) {
  let isDragging = false;
  let prevX = 0, prevY = 0;
  let velX = 0, velY = 0;
  let rotX = defaultRotX;
  let rotY = defaultRotY;

  canvas.style.cursor = 'grab';

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    canvas.style.cursor = 'grabbing';
    prevX = e.clientX;
    prevY = e.clientY;
    velX = 0;
    velY = 0;
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
  });

  canvas.addEventListener('pointermove', (e) => {
    if (isDragging) {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      velX = dx * 0.008;
      velY = dy * 0.008;
      rotY += velX;
      rotX += velY;
      rotX = Math.max(minRotX, Math.min(maxRotX, rotX));
      prevX = e.clientX;
      prevY = e.clientY;
    }
  });

  const onEnd = (e) => {
    if (isDragging) {
      isDragging = false;
      canvas.style.cursor = 'grab';
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  };
  canvas.addEventListener('pointerup', onEnd);
  canvas.addEventListener('pointercancel', onEnd);

  return {
    update: (time, autoRotateSpeed = 0) => {
      if (!isDragging) {
        rotY += velX + autoRotateSpeed;
        rotX += velY;
        velX *= 0.92;
        velY *= 0.92;
      }
      targetGroup.rotation.x = rotX;
      targetGroup.rotation.y = rotY;
    }
  };
}

/* ==========================================================================
   6. PROJECT 1: 3D PATH DETECTION CAR (THREE.JS ROBOTIC CAR)
   ========================================================================== */
let carState = {
  distance: 38.4,
  servoAngle: 0,
  sweepSpeed: 1.6,
  avoiding: false,
  obstaclePos: 4.5
};

window.spawnCarObstacle = function() {
  carState.obstaclePos = 2.2 + Math.random() * 0.8;
  carState.distance = (carState.obstaclePos * 12).toFixed(1);
  const hudDist = document.getElementById('car-hud-distance');
  if (hudDist) hudDist.textContent = `${carState.distance} cm`;
};

window.toggleServoSpeed = function() {
  carState.sweepSpeed = carState.sweepSpeed >= 3.2 ? 1.0 : carState.sweepSpeed + 0.8;
};

window.resetCarPath = function() {
  carState.obstaclePos = 6.0;
  carState.avoiding = false;
  carState.distance = 42.0;
  const statusEl = document.getElementById('car-hud-status');
  if (statusEl) {
    statusEl.className = 'hud-item status-ok';
    statusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> PATH CLEAR';
  }
};

function initProject3DCar() {
  const canvas = document.getElementById('canvas-path-car');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f5f9);

  const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 3.2, 5.2);
  camera.lookAt(0, 0.2, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } catch (err) {
    return;
  }

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const light = new THREE.DirectionalLight(0x0284c7, 1.4);
  light.position.set(3, 5, 4);
  scene.add(light);

  // Road & Car Root Group (Enables 360-degree interactive drag orbit)
  const carWorld = new THREE.Group();
  scene.add(carWorld);

  const carControls = make3DCanvasInteractive(canvas, carWorld, 0, 0, -0.6, 0.8);

  // Digital Perspective Grid Road
  const gridHelper = new THREE.GridHelper(24, 24, 0x0284c7, 0xcbd5e1);
  gridHelper.position.y = -0.01;
  carWorld.add(gridHelper);

  // Robotic Car Assembly
  const carGroup = new THREE.Group();
  carWorld.add(carGroup);

  // Chassis Lower Deck (Blue Acrylic Plate)
  const chassisGeo = new THREE.BoxGeometry(1.4, 0.12, 2.2);
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3 });
  const chassis = new THREE.Mesh(chassisGeo, chassisMat);
  chassis.position.y = 0.45;
  carGroup.add(chassis);

  // Upper Acrylic Deck with Standoffs
  const upperGeo = new THREE.BoxGeometry(1.3, 0.08, 1.8);
  const upperMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85 });
  const upperDeck = new THREE.Mesh(upperGeo, upperMat);
  upperDeck.position.set(0, 0.8, -0.1);
  carGroup.add(upperDeck);

  // 4 Rubber Wheels (Front wheels steer)
  const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });

  const rearWheels = [];
  const frontWheels = [];

  // Rear Wheels
  [-0.78, 0.78].forEach(x => {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(x, 0.32, -0.65);
    carGroup.add(w);
    rearWheels.push(w);
  });

  // Front Wheels with steering pivots
  const frontLeftPivot = new THREE.Group();
  frontLeftPivot.position.set(-0.78, 0.32, 0.65);
  carGroup.add(frontLeftPivot);
  const flw = new THREE.Mesh(wheelGeo, wheelMat);
  flw.rotation.z = Math.PI / 2;
  frontLeftPivot.add(flw);
  frontWheels.push(flw);

  const frontRightPivot = new THREE.Group();
  frontRightPivot.position.set(0.78, 0.32, 0.65);
  carGroup.add(frontRightPivot);
  const frw = new THREE.Mesh(wheelGeo, wheelMat);
  frw.rotation.z = Math.PI / 2;
  frontRightPivot.add(frw);
  frontWheels.push(frw);

  // Front Servo Bracket (SG90)
  const servoGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
  const servoMat = new THREE.MeshStandardMaterial({ color: 0x2563eb });
  const servoBracket = new THREE.Mesh(servoGeo, servoMat);
  servoBracket.position.set(0, 0.65, 0.85);
  carGroup.add(servoBracket);

  // Ultrasonic Sensor Assembly (Rotates with Servo)
  const sensorGroup = new THREE.Group();
  sensorGroup.position.set(0, 0.18, 0);
  servoBracket.add(sensorGroup);

  // HC-SR04 Circuit PCB
  const pcbGeo = new THREE.BoxGeometry(0.75, 0.32, 0.08);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x059669 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  sensorGroup.add(pcb);

  // Ultrasonic Dual Cylinder Eyes
  const eyeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 16);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 });

  const eye1 = new THREE.Mesh(eyeGeo, eyeMat);
  eye1.rotation.x = Math.PI / 2;
  eye1.position.set(-0.2, 0, 0.1);
  sensorGroup.add(eye1);

  const eye2 = new THREE.Mesh(eyeGeo, eyeMat);
  eye2.rotation.x = Math.PI / 2;
  eye2.position.set(0.2, 0, 0.1);
  sensorGroup.add(eye2);

  // Animated Concentric Sonar Wavefront Arcs
  const sonarArcs = [];
  for (let i = 0; i < 3; i++) {
    const arcGeo = new THREE.RingGeometry(0.2 + i * 0.45, 0.24 + i * 0.45, 32, 1, -Math.PI / 3, (Math.PI * 2) / 3);
    const arcMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6 - i * 0.18,
      side: THREE.DoubleSide
    });
    const arcMesh = new THREE.Mesh(arcGeo, arcMat);
    arcMesh.rotation.x = -Math.PI / 2;
    arcMesh.position.set(0, 0, 0.4 + i * 0.7);
    sensorGroup.add(arcMesh);
    sonarArcs.push(arcMesh);
  }

  // L298N Motor Driver Heatsink on Rear Deck
  const sinkGeo = new THREE.BoxGeometry(0.55, 0.35, 0.45);
  const sinkMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
  const heatsink = new THREE.Mesh(sinkGeo, sinkMat);
  heatsink.position.set(0, 0.65, -0.55);
  carGroup.add(heatsink);

  // ESP32 Microcontroller Core
  const espGeo = new THREE.BoxGeometry(0.5, 0.1, 0.7);
  const espMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
  const espBoard = new THREE.Mesh(espGeo, espMat);
  espBoard.position.set(0, 0.92, -0.1);
  carGroup.add(espBoard);

  // Road Obstacle
  const obsGeo = new THREE.BoxGeometry(0.8, 0.6, 0.8);
  const obsMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });
  const obstacle = new THREE.Mesh(obsGeo, obsMat);
  obstacle.position.set(0, 0.3, carState.obstaclePos);
  carWorld.add(obstacle);

  // Dynamic Avoidance Path Trajectory Spline
  const pathMat = new THREE.LineBasicMaterial({ color: 0x059669, linewidth: 2 });
  const pathPoints = [
    new THREE.Vector3(0, 0.05, 0),
    new THREE.Vector3(-0.8, 0.05, 1.5),
    new THREE.Vector3(0.8, 0.05, 3.2),
    new THREE.Vector3(0, 0.05, 5.0)
  ];
  const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const trajectoryLine = new THREE.Line(pathGeo, pathMat);
  carWorld.add(trajectoryLine);

  let isVisible = false;
  const obs = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  obs.observe(canvas);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = clock.getElapsedTime();

    // Update 3D interactive controls
    carControls.update(time);

    // 1. Servo Sensor Sweep
    const sweepAngle = Math.sin(time * carState.sweepSpeed) * 0.7; // ~40 deg
    sensorGroup.rotation.y = sweepAngle;
    const degrees = Math.round((sweepAngle * 180) / Math.PI) + 90;
    const hudAngle = document.getElementById('car-hud-angle');
    if (hudAngle) hudAngle.innerHTML = `${degrees}&deg;`;

    // 2. Wheel continuous rotation
    [...rearWheels, ...frontWheels].forEach(w => {
      w.rotation.x += 0.09;
    });

    // 3. Digital Grid road moving backward
    gridHelper.position.z = (time * 1.8) % 2;

    // 4. Sonar Wavefront expansion animation
    sonarArcs.forEach((arc, i) => {
      const pulse = 1.0 + Math.sin(time * 5 + i * 1.2) * 0.25;
      arc.scale.set(pulse, pulse, pulse);
      arc.material.opacity = Math.max(0.1, 0.6 - (pulse - 1.0) * 0.8);
    });

    // 5. Obstacle Approach & Avoidance Steering
    carState.obstaclePos -= 0.025;
    if (carState.obstaclePos < -1.5) {
      carState.obstaclePos = 5.5 + Math.random() * 1.5;
    }
    obstacle.position.z = carState.obstaclePos;

    // Real-time Distance Telemetry calculation
    const calculatedDist = Math.max(12, Math.round(carState.obstaclePos * 14.5));
    const distEl = document.getElementById('car-hud-distance');
    const statusEl = document.getElementById('car-hud-status');

    if (distEl) distEl.textContent = `${calculatedDist} cm`;

    if (calculatedDist < 30) {
      // Obstacle detected! Car maneuvers around with wheel steering
      const steer = Math.sin(time * 3) * 0.65;
      carGroup.position.x = steer;
      carGroup.rotation.y = Math.cos(time * 3) * 0.15;

      // Front wheels physically steer left/right
      frontLeftPivot.rotation.y = Math.cos(time * 3) * 0.35;
      frontRightPivot.rotation.y = Math.cos(time * 3) * 0.35;

      if (statusEl) {
        statusEl.className = 'hud-item status-warn';
        statusEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> AVOIDING COLLISION';
      }
    } else {
      carGroup.position.x = 0;
      carGroup.rotation.y = 0;
      frontLeftPivot.rotation.y = 0;
      frontRightPivot.rotation.y = 0;
      if (statusEl) {
        statusEl.className = 'hud-item status-ok';
        statusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> PATH CLEAR';
      }
    }

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   7. PROJECT 2: 3D SMART VOTING TERMINAL (THREE.JS)
   ========================================================================== */
let totalVotesRecorded = 142;
let votingLedLight = null;
let votingLedMat = null;
let votingButtons = [];

window.castSimulatedVote = function(optionNum) {
  totalVotesRecorded++;
  const countEl = document.getElementById('live-vote-count');
  if (countEl) countEl.textContent = totalVotesRecorded;

  // Animate 3D button depression
  const btnIdx = Math.max(0, Math.min(3, optionNum - 1));
  if (votingButtons[btnIdx]) {
    const b = votingButtons[btnIdx];
    b.position.y = 0.36; // Pressed state
    setTimeout(() => { b.position.y = 0.42; }, 180);
  }

  // Trigger dynamic RGB LED state transitions
  if (votingLedMat && votingLedLight) {
    // Stage 1: Yellow/Amber - Encrypting
    votingLedMat.color.setHex(0xeab308);
    votingLedMat.emissive.setHex(0xeab308);
    votingLedLight.color.setHex(0xeab308);

    setTimeout(() => {
      // Stage 2: Green - Vote Confirmed
      votingLedMat.color.setHex(0x10b981);
      votingLedMat.emissive.setHex(0x10b981);
      votingLedLight.color.setHex(0x10b981);
    }, 700);

    setTimeout(() => {
      // Stage 3: Return to Ready Cyan
      votingLedMat.color.setHex(0x00f0ff);
      votingLedMat.emissive.setHex(0x00f0ff);
      votingLedLight.color.setHex(0x00f0ff);
    }, 1800);
  }

  const oledMsg = document.getElementById('oled-sim-text');
  if (oledMsg) {
    oledMsg.textContent = `VOTED: CANDIDATE ${optionNum}`;
    oledMsg.style.color = '#059669';
    setTimeout(() => {
      oledMsg.textContent = 'ENCRYPTING RECORD...';
      oledMsg.style.color = '#eab308';
    }, 700);
    setTimeout(() => {
      oledMsg.textContent = 'READY: PRESS 1-4';
      oledMsg.style.color = '#00f0ff';
    }, 1800);
  }

  // Audio feedback buzzer emulation (Web Audio API)
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2200, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    }
  } catch (e) {
    // Audio context silent fallback
  }
};

window.resetVoteCounter = function() {
  totalVotesRecorded = 140;
  const countEl = document.getElementById('live-vote-count');
  if (countEl) countEl.textContent = totalVotesRecorded;
};

function initProject3DVoting() {
  const canvas = document.getElementById('canvas-voting-system');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8fafc);

  const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 3.0, 4.2);
  camera.lookAt(0, 0, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } catch (err) {
    return;
  }

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const dirLight = new THREE.DirectionalLight(0x0284c7, 1.6);
  dirLight.position.set(3, 4, 3);
  scene.add(dirLight);

  // Voting Terminal Body
  const termGroup = new THREE.Group();
  scene.add(termGroup);

  const termControls = make3DCanvasInteractive(canvas, termGroup, 0, 0, -0.4, 0.6);

  const bodyGeo = new THREE.BoxGeometry(2.4, 0.45, 1.8);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.2;
  body.rotation.x = 0.25; // Angled console toward viewer
  termGroup.add(body);

  // Simulated OLED Screen Mesh (0.96" Display)
  const oledGeo = new THREE.BoxGeometry(1.2, 0.05, 0.7);
  const oledMat = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.35
  });
  const oledScreen = new THREE.Mesh(oledGeo, oledMat);
  oledScreen.position.set(0, 0.48, -0.3);
  oledScreen.rotation.x = 0.25;
  termGroup.add(oledScreen);

  // Multi-state RGB Status LED
  const ledGeo = new THREE.SphereGeometry(0.1, 16, 16);
  votingLedMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.9
  });
  const statusLed = new THREE.Mesh(ledGeo, votingLedMat);
  statusLed.position.set(0.85, 0.5, -0.3);
  termGroup.add(statusLed);

  // Dynamic Point Light over LED
  votingLedLight = new THREE.PointLight(0x00f0ff, 1.8, 4);
  votingLedLight.position.set(0.85, 0.6, -0.3);
  termGroup.add(votingLedLight);

  // 4 Tactile Keypad Push Buttons
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.3 });
  const keyGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16);

  votingButtons = [];
  [-0.45, -0.15, 0.15, 0.45].forEach((xPos, idx) => {
    const key = new THREE.Mesh(keyGeo, keyMat);
    key.position.set(xPos, 0.42, 0.35);
    key.rotation.x = 0.25;
    termGroup.add(key);
    votingButtons.push(key);
  });

  let isVisible = false;
  const obs = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  obs.observe(canvas);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = clock.getElapsedTime();
    termControls.update(time);

    // Pulse status LED gently
    const pulse = (Math.sin(time * 4) + 1) * 0.3 + 0.5;
    votingLedMat.emissiveIntensity = pulse;
    votingLedLight.intensity = pulse * 1.5;

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   7. PROJECT 3: 3D CAMPUSGO ISOMETRIC ENVIRONMENT (THREE.JS)
   ========================================================================== */
let campusBeacon = null;
let campusRipple = null;

window.setCampusTarget = function(destination) {
  const pill = document.getElementById('campus-status-pill');
  const btnLib = document.getElementById('btn-dest-lib');
  const btnAcad = document.getElementById('btn-dest-acad');
  const btnTrans = document.getElementById('btn-dest-trans');

  [btnLib, btnAcad, btnTrans].forEach(b => b?.classList.remove('active'));

  let targetPos = [-1.4, 1.8, -1.0]; // Default Academic

  if (destination === 'library') {
    btnLib?.classList.add('active');
    targetPos = [1.1, 1.3, -0.9];
    if (pill) pill.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Central Library &bull; Route Active (3 mins)';
  } else if (destination === 'academic') {
    btnAcad?.classList.add('active');
    targetPos = [-1.4, 1.8, -1.0];
    if (pill) pill.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> Academic Zone A &bull; Lecture Halls Active';
  } else if (destination === 'transit') {
    btnTrans?.classList.add('active');
    targetPos = [0.5, 0.9, 1.2];
    if (pill) pill.innerHTML = '<i class="fa-solid fa-bus"></i> Transit Terminal &bull; Shuttle #2 Arriving';
  }

  if (campusBeacon && campusRipple) {
    campusBeacon.position.set(...targetPos);
    campusRipple.position.set(targetPos[0], 0.03, targetPos[2]);
  }
};

function initProject3DCampus() {
  const canvas = document.getElementById('canvas-campusgo');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f5f9);

  const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(4, 4.5, 4.5);
  camera.lookAt(0, 0.4, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } catch (err) {
    return;
  }

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const light = new THREE.DirectionalLight(0x0284c7, 1.5);
  light.position.set(5, 7, 3);
  scene.add(light);

  // Campus World Group for 360-degree interactive rotation
  const campusWorld = new THREE.Group();
  scene.add(campusWorld);

  const campusControls = make3DCanvasInteractive(canvas, campusWorld, 0, 0.2, -0.5, 0.7);

  // Isometric Ground Campus Plane
  const groundGeo = new THREE.BoxGeometry(5.5, 0.15, 5.5);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.075;
  campusWorld.add(ground);

  const grid = new THREE.GridHelper(5, 10, 0x0284c7, 0xe2e8f0);
  grid.position.y = 0.01;
  campusWorld.add(grid);

  // 3D Campus Architectural Blocks
  const bldgMat1 = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });
  const bldgMat2 = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
  const bldgMat3 = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.3 });

  // Academic Block A
  const acadA = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.4, 1.2), bldgMat1);
  acadA.position.set(-1.4, 0.7, -1.0);
  campusWorld.add(acadA);

  // Central Library
  const library = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 1.4), bldgMat2);
  library.position.set(1.1, 0.45, -0.9);
  campusWorld.add(library);

  // Transit Hub
  const transit = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 1.6), bldgMat3);
  transit.position.set(0.5, 0.25, 1.2);
  campusWorld.add(transit);

  // Pulsing 3D Location Beacon Pin
  const pinGeo = new THREE.ConeGeometry(0.18, 0.4, 16);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.6 });
  campusBeacon = new THREE.Mesh(pinGeo, pinMat);
  campusBeacon.rotation.x = Math.PI; // Point down
  campusBeacon.position.set(-1.4, 1.8, -1.0);
  campusWorld.add(campusBeacon);

  // Expanding Ground Ripple Circle
  const ripGeo = new THREE.RingGeometry(0.1, 0.35, 24);
  const ripMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
  campusRipple = new THREE.Mesh(ripGeo, ripMat);
  campusRipple.rotation.x = -Math.PI / 2;
  campusRipple.position.set(-1.4, 0.03, -1.0);
  campusWorld.add(campusRipple);

  // Animated Route Spline
  const routePoints = [
    new THREE.Vector3(0.5, 0.04, 1.2),
    new THREE.Vector3(0.5, 0.04, -0.2),
    new THREE.Vector3(-1.4, 0.04, -0.2),
    new THREE.Vector3(-1.4, 0.04, -1.0)
  ];
  const routeSpline = new THREE.CatmullRomCurve3(routePoints);
  const routeGeo = new THREE.BufferGeometry().setFromPoints(routeSpline.getPoints(40));
  const routeMat = new THREE.LineDashedMaterial({ color: 0x00f0ff, dashSize: 0.15, gapSize: 0.08, linewidth: 3 });
  const routeLine = new THREE.Line(routeGeo, routeMat);
  routeLine.computeLineDistances();
  campusWorld.add(routeLine);

  // Moving Transit Pulse Dot
  const busDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff })
  );
  campusWorld.add(busDot);

  // 3D Floating Smartphone Model (CampusGo UI Preview)
  const phoneGroup = new THREE.Group();
  phoneGroup.position.set(-1.2, 1.2, 1.2);
  phoneGroup.rotation.y = Math.PI / 4;
  phoneGroup.rotation.x = -0.2;
  campusWorld.add(phoneGroup);

  const phoneBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 1.5, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 })
  );
  phoneGroup.add(phoneBody);

  const phoneScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 1.38, 0.02),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff })
  );
  phoneScreen.position.z = 0.045;
  phoneGroup.add(phoneScreen);

  let isVisible = false;
  const obs = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  obs.observe(canvas);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = clock.getElapsedTime();
    campusControls.update(time, 0.001);

    // Float phone & beacon
    phoneGroup.position.y = 1.1 + Math.sin(time * 2) * 0.08;
    campusBeacon.position.y = 1.8 + Math.sin(time * 3) * 0.12;

    // Pulse ripple ring
    const ripScale = 1.0 + (time * 1.5) % 1.5;
    campusRipple.scale.set(ripScale, ripScale, 1);
    campusRipple.material.opacity = Math.max(0, 0.8 - ripScale * 0.4);

    // Move bus along transit spline
    const progress = (time * 0.2) % 1;
    const busPos = routeSpline.getPointAt(progress);
    busDot.position.copy(busPos);

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   8. PROJECT 4: 3D REGEN TEXTILE RECYCLING LOOP (THREE.JS)
   ========================================================================== */
function initProject3DRegen() {
  const canvas = document.getElementById('canvas-regen');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8fafc);

  const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 4.5);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } catch (err) {
    return;
  }

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const light = new THREE.DirectionalLight(0x059669, 1.6);
  light.position.set(3, 4, 5);
  scene.add(light);

  const backLight = new THREE.DirectionalLight(0x0284c7, 1.2);
  backLight.position.set(-3, -2, -4);
  scene.add(backLight);

  // Regen World Group (Allows 360-degree user drag rotation)
  const regenWorld = new THREE.Group();
  scene.add(regenWorld);

  const regenControls = make3DCanvasInteractive(canvas, regenWorld, 0.2, 0, -0.8, 0.8);

  // Central Spinning Textile Spool
  const spoolGeo = new THREE.CylinderGeometry(0.45, 0.45, 1.2, 24);
  const spoolMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.6 });
  const spool = new THREE.Mesh(spoolGeo, spoolMat);
  regenWorld.add(spool);

  // Circular Closed-Loop Torus
  const torusGeo = new THREE.TorusGeometry(1.4, 0.22, 20, 64);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x059669,
    metalness: 0.5,
    roughness: 0.25
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  regenWorld.add(torus);

  // Flowing Particles along the Circular Recycling Loop
  const particleCount = 64;
  const partGeo = new THREE.SphereGeometry(0.045, 8, 8);
  const partMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const p = new THREE.Mesh(partGeo, partMat);
    regenWorld.add(p);
    particles.push({
      mesh: p,
      angle: (i / particleCount) * Math.PI * 2,
      speed: 0.02 + (i % 3) * 0.005
    });
  }

  // 3 Orbiting Process Stage Orbs (Collection, Processing, Distribution)
  const stageOrbs = [];
  const stageColors = [0x059669, 0x0284c7, 0x7c3aed];
  for (let s = 0; s < 3; s++) {
    const orb = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.18, 0),
      new THREE.MeshStandardMaterial({ color: stageColors[s], emissive: stageColors[s], emissiveIntensity: 0.6 })
    );
    regenWorld.add(orb);
    stageOrbs.push({ mesh: orb, baseAngle: (s / 3) * Math.PI * 2 });
  }

  let isVisible = false;
  const obs = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  obs.observe(canvas);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = clock.getElapsedTime();
    regenControls.update(time, 0.003);

    spool.rotation.y += 0.03;
    torus.rotation.z += 0.006;

    particles.forEach(p => {
      p.angle += p.speed;
      p.mesh.position.x = Math.cos(p.angle) * 1.4;
      p.mesh.position.y = Math.sin(p.angle) * 1.4;
      p.mesh.position.z = Math.sin(p.angle * 3 + time) * 0.25;
    });

    stageOrbs.forEach((so, idx) => {
      const a = so.baseAngle + time * 0.4;
      so.mesh.position.set(Math.cos(a) * 1.8, Math.sin(a) * 1.8, Math.sin(a * 2) * 0.3);
      so.mesh.rotation.x += 0.03;
      so.mesh.rotation.y += 0.04;
    });

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   9. SKILLS 3D HUB & CIRCUIT ACTIVATION
   ========================================================================== */
window.activateCircuit = function(category) {
  const trace = document.getElementById(`trace-${category}`);
  if (trace) trace.classList.add('active');
};

window.deactivateCircuit = function() {
  document.querySelectorAll('.circuit-trace').forEach(t => t.classList.remove('active'));
};

function initSkills3DHub() {
  const canvas = document.getElementById('skills-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 0, 3.6);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } catch (err) {
    return;
  }

  scene.add(new THREE.AmbientLight(0xffffff, 1.0));
  const dirLight = new THREE.DirectionalLight(0x0284c7, 1.8);
  dirLight.position.set(2, 3, 4);
  scene.add(dirLight);

  const goldRim = new THREE.DirectionalLight(0xf59e0b, 1.2);
  goldRim.position.set(-2, -2, -3);
  scene.add(goldRim);

  // Microchip Model
  const chipGroup = new THREE.Group();
  scene.add(chipGroup);

  const skillsControls = make3DCanvasInteractive(canvas, chipGroup, 0.45, 0);

  const chipBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.22, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.25 })
  );
  chipGroup.add(chipBody);

  const coreLabel = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.08, 1.0),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x0284c7, emissiveIntensity: 0.5, metalness: 0.9 })
  );
  coreLabel.position.y = 0.12;
  chipGroup.add(coreLabel);

  // Gold Pins on 4 sides
  const pinGeo = new THREE.BoxGeometry(0.06, 0.05, 0.24);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 });
  for (let i = 0; i < 5; i++) {
    const off = -0.5 + (i / 4) * 1.0;
    const p1 = new THREE.Mesh(pinGeo, pinMat);
    p1.position.set(off, 0, 0.82);
    chipGroup.add(p1);

    const p2 = new THREE.Mesh(pinGeo, pinMat);
    p2.position.set(off, 0, -0.82);
    chipGroup.add(p2);

    const p3 = new THREE.Mesh(pinGeo, pinMat);
    p3.rotation.y = Math.PI / 2;
    p3.position.set(0.82, 0, off);
    chipGroup.add(p3);

    const p4 = new THREE.Mesh(pinGeo, pinMat);
    p4.rotation.y = Math.PI / 2;
    p4.position.set(-0.82, 0, off);
    chipGroup.add(p4);
  }

  // Glowing Gyro Ring
  const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 });
  const gyroRing = new THREE.Mesh(ringGeo, ringMat);
  gyroRing.rotation.x = Math.PI / 2;
  chipGroup.add(gyroRing);

  let isVisible = false;
  const obs = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  obs.observe(canvas);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = clock.getElapsedTime();
    skillsControls.update(time, 0.006);
    gyroRing.rotation.z += 0.02;

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   10. ADVANCED 3D CARD TILT & SPECULAR LIGHTING
   ========================================================================== */
function init3DCardTilt() {
  const cards = document.querySelectorAll('[data-tilt="true"]');

  cards.forEach(card => {
    // Add specular glare overlay element
    if (!card.querySelector('.tilt-glare')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = -y * 10;
      const tiltY = x * 10;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
      card.style.setProperty('--glare-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${((y + 0.5) * 100).toFixed(1)}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   11. DIGITAL CONNECT & QR CODES GENERATION
   ========================================================================== */
function initQRCodes() {
  if (typeof QRCode === 'undefined') {
    setTimeout(initQRCodes, 150);
    return;
  }

  // 1. LINKEDIN QR: https://linkedin.com/in/manoj-g-33797a360
  const liTarget = document.getElementById('linkedin-qr-canvas');
  if (liTarget && !liTarget.hasChildNodes()) {
    new QRCode(liTarget, {
      text: "https://linkedin.com/in/manoj-g-33797a360",
      width: 170,
      height: 170,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // 2. LEETCODE QR: https://leetcode.com/u/MANOJGNANASEKARAN/
  const leetTarget = document.getElementById('leetcode-qr-canvas');
  if (leetTarget && !leetTarget.hasChildNodes()) {
    new QRCode(leetTarget, {
      text: "https://leetcode.com/u/MANOJGNANASEKARAN/",
      width: 170,
      height: 170,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // 3. GITHUB QR: https://github.com/MANOJG006
  const ghTarget = document.getElementById('github-qr-canvas');
  if (ghTarget && !ghTarget.hasChildNodes()) {
    new QRCode(ghTarget, {
      text: "https://github.com/MANOJG006",
      width: 170,
      height: 170,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // 4. DUOLINGO QR: https://www.duolingo.com/profile/ManojGnana
  const duoImg = document.getElementById('duolingo-qr-img');
  const duoCanvas = document.getElementById('duolingo-qr-canvas');

  if (duoImg && duoCanvas) {
    const testImg = new Image();
    testImg.onload = function() {
      duoImg.style.display = 'block';
      duoCanvas.style.display = 'none';
    };
    testImg.onerror = function() {
      duoImg.style.display = 'none';
      duoCanvas.style.display = 'block';
      if (!duoCanvas.hasChildNodes()) {
        new QRCode(duoCanvas, {
          text: "https://www.duolingo.com/profile/ManojGnana",
          width: 170,
          height: 170,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      }
    };
    testImg.src = 'assets/duolingo-qr.png';
  }
}

window.downloadQR = function(boxId, filename) {
  const box = document.getElementById(boxId);
  if (!box) return;

  const canvas = box.querySelector('canvas');
  const img = box.querySelector('img');

  let dataUrl = '';
  if (canvas) {
    dataUrl = canvas.toDataURL('image/png');
  } else if (img && img.src && !img.src.endsWith('.svg')) {
    dataUrl = img.src;
  }

  if (dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename || 'QRCode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

/* ==========================================================================
   12. NAVIGATION, FILTERS & MODALS
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   INTERACTIVE 5-PROJECT EXPANSION CONTROLLER
   ========================================================================== */
let activeProjectId = 1;

window.openProjectLink = function(url) {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

window.toggleProject = function(projectId) {
  const isMobile = window.innerWidth <= 992;
  activeProjectId = projectId;
  updateProjectUI(projectId, isMobile);
};

function updateProjectUI(selectedId, isMobile) {
  for (let i = 1; i <= 5; i++) {
    const btn = document.getElementById(`project-btn-${i}`);
    const card = document.getElementById(`project-card-${i}`);
    const drawer = document.getElementById(`mobile-drawer-${i}`);

    if (btn) {
      if (selectedId === i) {
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }
    }

    if (drawer) {
      if (selectedId === i && isMobile && card) {
        drawer.innerHTML = card.innerHTML;
        drawer.classList.add('active');
      } else {
        drawer.innerHTML = '';
        drawer.classList.remove('active');
      }
    }
  }

  // Desktop Pane Management
  const desktopPanels = document.querySelectorAll('.projects-display-pane .project-expanded-panel');

  if (!isMobile && selectedId) {
    desktopPanels.forEach(p => {
      if (parseInt(p.getAttribute('data-project'), 10) === selectedId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }
}

function initInteractiveProjects() {
  const isMobile = window.innerWidth <= 992;
  updateProjectUI(activeProjectId, isMobile);

  window.addEventListener('resize', () => {
    if (activeProjectId !== null) {
      const isMobile = window.innerWidth <= 992;
      updateProjectUI(activeProjectId, isMobile);
    }
  }, { passive: true });
}

window.filterCertifications = function() {
  const query = document.getElementById('cert-search')?.value.toLowerCase().trim() || '';
  const cards = document.querySelectorAll('.cert-card');

  cards.forEach(card => {
    const text = card.getAttribute('data-cert') + ' ' + card.innerText.toLowerCase();
    if (text.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
};

function initResumeModal() {
  const openBtn = document.getElementById('open-resume-btn');
  const closeBtn = document.getElementById('close-resume-btn');
  const modal = document.getElementById('resume-modal');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(
    '.section-header, .projects-showcase-container, .project-item, .skill-category-card, .cert-card, .qr-card, .timeline-item, .edu-card, .stat-card, .contact-info-card, .contact-form-card, .oscilloscope-card, .esp32-silicon-card, .mern-pipeline-banner'
  );

  if (!elementsToAnimate.length) return;

  if (!('IntersectionObserver' in window)) {
    elementsToAnimate.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const grids = document.querySelectorAll('.projects-list, .certs-grid, .qr-grid, .skills-grid, .edu-grid, .skills-grid-4col');
  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, index) => {
      const delayNum = (index % 6) + 1;
      child.classList.add(`reveal-delay-${delayNum}`);
    });
  });

  document.body.classList.add('js-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px 40px 0px'
  });

  elementsToAnimate.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

/* ==========================================================================
   13. CONTACT FORM & UTILITIES
   ========================================================================== */
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const emailSubject = encodeURIComponent(`Portfolio Inquiry from ${name}: ${subject}`);
  const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Manoj G Portfolio`);
  const mailtoUrl = `mailto:manojkovarthini@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  const feedback = document.getElementById('form-feedback');
  feedback.className = 'form-feedback feedback-success';
  feedback.innerHTML = `<i class="fa-solid fa-envelope-circle-check"></i> Opening your email application to send to <strong>manojkovarthini@gmail.com</strong>... If your email client did not launch automatically, <a href="${mailtoUrl}" target="_blank" class="gold-link" style="text-decoration: underline; font-weight: 700; color: #8B6D2B;">click here to compose</a>.`;

  window.location.href = mailtoUrl;
};

window.copyToClipboard = function(text, buttonElem) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = buttonElem.innerHTML;
    buttonElem.innerHTML = '<i class="fa-solid fa-check" style="color: #059669;"></i> Copied!';
    setTimeout(() => {
      buttonElem.innerHTML = originalHtml;
    }, 2000);
  }).catch(() => {
    alert(`Copied: ${text}`);
  });
};

/* ==========================================================================
   14. ECE PROTOCOL OSCILLOSCOPE (UART, I2C, SPI, CAN)
   ========================================================================== */
let currentScopeProtocol = 'uart';

const protocolMeta = {
  uart: {
    name: 'PROTOCOL: UART (8-N-1)',
    baud: 'RATE: 115,200 Baud',
    desc: '<strong>UART Asynchronous Framing:</strong> Line idles HIGH (3.3V) &bull; Start Bit (0) &bull; 8 Data Bits LSB-first (0x4D = "M" = 01001101) &bull; Stop Bit (1) &bull; No shared clock line needed.'
  },
  i2c: {
    name: 'PROTOCOL: I²C Fast-Mode (400kHz)',
    baud: 'BUS SPEED: 400 kHz (SCL / SDA)',
    desc: '<strong>I²C Bus Protocol:</strong> Open-drain bus with pull-up resistors. Trace 1: SCL Clock (9 pulses). Trace 2: SDA Data showing START condition (SDA falls while SCL is HIGH), 7-bit slave address 0x3C (SSD1306 OLED), W=0, and ACK bit.'
  },
  spi: {
    name: 'PROTOCOL: SPI Full-Duplex (Mode 0)',
    baud: 'BUS SPEED: 10 MHz (SCK / MOSI)',
    desc: '<strong>SPI Synchronous Bus:</strong> 4-wire high-speed serial bus. Trace 1: CS# active LOW. Trace 2: SCK 10MHz clock burst. Trace 3: MOSI Master-Out bitstream (0x55 alternating clock sync).'
  },
  can: {
    name: 'PROTOCOL: CAN Bus 2.0B (Automotive)',
    baud: 'RATE: 500 kbps (CAN_H & CAN_L)',
    desc: '<strong>CAN Differential Signaling:</strong> High noise immunity for automotive electronics. Recessive state: 2.5V (ΔV=0V). Dominant state: CAN_H=3.5V, CAN_L=1.5V (ΔV=2.0V).'
  }
};

window.switchProtocol = function(proto) {
  if (!protocolMeta[proto]) return;
  currentScopeProtocol = proto;

  // Update button active state
  document.querySelectorAll('.scope-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick')?.includes(`'${proto}'`)) {
      btn.classList.add('active');
    }
  });

  // Update text meta
  const meta = protocolMeta[proto];
  const nameEl = document.getElementById('scope-protocol-name');
  const baudEl = document.getElementById('scope-baud-rate');
  const descEl = document.getElementById('scope-timing-desc');

  if (nameEl) nameEl.textContent = meta.name;
  if (baudEl) baudEl.textContent = meta.baud;
  if (descEl) descEl.innerHTML = meta.desc;
};

function initProtocolOscilloscope() {
  const canvas = document.getElementById('scope-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resizeScope() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = (rect.width || 600) * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);
  }

  resizeScope();
  window.addEventListener('resize', resizeScope, { passive: true });

  let scanX = 0;

  function drawGrid(w, h) {
    ctx.fillStyle = '#050a14';
    ctx.fillRect(0, 0, w, h);

    // Minor divisions
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;
    const cols = 10;
    const rows = 6;
    const dx = w / cols;
    const dy = h / rows;

    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * dx, 0);
      ctx.lineTo(c * dx, h);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * dy);
      ctx.lineTo(w, r * dy);
      ctx.stroke();
    }

    // Center graticule axes
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.22)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawUART(w, h, time) {
    const bits = [1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1];
    const labels = ['IDLE', 'IDLE', 'START', 'D0 (1)', 'D1 (0)', 'D2 (1)', 'D3 (1)', 'D4 (0)', 'D5 (0)', 'D6 (1)', 'D7 (0)', 'STOP', 'IDLE'];
    const highY = 60;
    const lowY = 145;
    const bitWidth = (w - 40) / bits.length;

    // Voltage label references
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText('3.3V (HIGH)', 10, highY - 8);
    ctx.fillText('0.0V (LOW)', 10, lowY + 16);

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 9;
    ctx.beginPath();

    let curX = 35;
    let prevY = bits[0] ? highY : lowY;
    ctx.moveTo(curX, prevY);

    for (let i = 0; i < bits.length; i++) {
      const bitY = bits[i] ? highY : lowY;
      ctx.lineTo(curX, bitY);
      ctx.lineTo(curX + bitWidth, bitY);

      // Bit labels
      ctx.shadowBlur = 0;
      ctx.fillStyle = bits[i] ? '#38bdf8' : '#94a3b8';
      ctx.fillText(labels[i], curX + 2, bitY === highY ? highY - 10 : lowY + 18);
      ctx.shadowBlur = 9;

      curX += bitWidth;
      prevY = bitY;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function drawI2C(w, h, time) {
    // SCL: 9 clock pulses
    const sclHigh = 35;
    const sclLow = 80;
    const sdaHigh = 115;
    const sdaLow = 160;

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('CH1: SCL (Serial Clock 400kHz)', 10, sclHigh - 8);
    ctx.fillStyle = '#00f0ff';
    ctx.fillText('CH2: SDA (Data: START + Addr 0x3C + W + ACK)', 10, sdaHigh - 8);

    const step = (w - 40) / 18;

    // Draw SCL
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 7;
    ctx.beginPath();
    let x = 35;
    ctx.moveTo(x, sclHigh);
    for (let i = 0; i < 9; i++) {
      ctx.lineTo(x + step * 0.5, sclHigh);
      ctx.lineTo(x + step * 0.5, sclLow);
      ctx.lineTo(x + step, sclLow);
      ctx.lineTo(x + step, sclHigh);
      x += step;
    }
    ctx.stroke();

    // Draw SDA (Start condition, 0x3C address 0-1-1-1-1-0-0, W=0, ACK=0)
    const sdaBits = [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0];
    const sdaLabels = ['IDLE', 'START', 'A6(0)', 'A5(1)', 'A4(1)', 'A3(1)', 'A2(1)', 'A1(0)', 'A0(0)', 'W(0)', 'ACK(0)'];
    const sdaStep = (w - 40) / sdaBits.length;

    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.beginPath();
    let sx = 35;
    ctx.moveTo(sx, sdaBits[0] ? sdaHigh : sdaLow);
    for (let i = 0; i < sdaBits.length; i++) {
      const targetY = sdaBits[i] ? sdaHigh : sdaLow;
      ctx.lineTo(sx, targetY);
      ctx.lineTo(sx + sdaStep, targetY);

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(sdaLabels[i], sx + 2, sdaLow + 16);
      ctx.shadowBlur = 7;

      sx += sdaStep;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function drawSPI(w, h, time) {
    // 3 Channels: CS#, SCK, MOSI
    const csHigh = 22;
    const csLow = 45;
    const sckHigh = 70;
    const sckLow = 95;
    const mosiHigh = 125;
    const mosiLow = 155;

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#c084fc';
    ctx.fillText('CH1: CS# (Active Low)', 10, csHigh - 4);
    ctx.fillStyle = '#10b981';
    ctx.fillText('CH2: SCK (10MHz Burst)', 10, sckHigh - 6);
    ctx.fillStyle = '#00f0ff';
    ctx.fillText('CH3: MOSI (Master-Out: 0x55)', 10, mosiHigh - 6);

    // CS
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(25, csHigh);
    ctx.lineTo(70, csHigh);
    ctx.lineTo(70, csLow);
    ctx.lineTo(w - 70, csLow);
    ctx.lineTo(w - 70, csHigh);
    ctx.lineTo(w - 20, csHigh);
    ctx.stroke();

    // SCK (burst between 70 and w-70)
    ctx.strokeStyle = '#10b981';
    ctx.shadowColor = '#10b981';
    ctx.beginPath();
    ctx.moveTo(25, sckLow);
    ctx.lineTo(70, sckLow);
    const sckBurstW = w - 140;
    const sckCycles = 8;
    const sckStep = sckBurstW / (sckCycles * 2);
    let kx = 70;
    for (let i = 0; i < sckCycles; i++) {
      ctx.lineTo(kx, sckHigh);
      kx += sckStep;
      ctx.lineTo(kx, sckHigh);
      ctx.lineTo(kx, sckLow);
      kx += sckStep;
      ctx.lineTo(kx, sckLow);
    }
    ctx.lineTo(w - 20, sckLow);
    ctx.stroke();

    // MOSI: alternating 0x55 (01010101)
    const mosiBits = [0, 0, 1, 0, 1, 0, 1, 0, 1, 0];
    const mosiStep = (w - 60) / mosiBits.length;
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.beginPath();
    let mx = 30;
    ctx.moveTo(mx, mosiBits[0] ? mosiHigh : mosiLow);
    for (let i = 0; i < mosiBits.length; i++) {
      const my = mosiBits[i] ? mosiHigh : mosiLow;
      ctx.lineTo(mx, my);
      ctx.lineTo(mx + mosiStep, my);
      mx += mosiStep;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function drawCAN(w, h, time) {
    const v35 = 60;   // CAN_H Dominant
    const v25 = 100;  // Recessive baseline
    const v15 = 140;  // CAN_L Dominant

    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText('3.5V [Dominant CAN_H]', 10, v35 - 8);
    ctx.fillText('2.5V [Recessive State]', 10, v25 - 6);
    ctx.fillText('1.5V [Dominant CAN_L]', 10, v15 + 16);

    const states = ['R', 'D', 'D', 'R', 'D', 'R', 'D', 'D', 'R'];
    const step = (w - 40) / states.length;

    // CAN_H
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 7;
    ctx.beginPath();
    let x = 35;
    ctx.moveTo(x, states[0] === 'D' ? v35 : v25);
    for (let i = 0; i < states.length; i++) {
      const y = states[i] === 'D' ? v35 : v25;
      ctx.lineTo(x, y);
      ctx.lineTo(x + step, y);
      x += step;
    }
    ctx.stroke();

    // CAN_L
    ctx.strokeStyle = '#fb923c';
    ctx.shadowColor = '#fb923c';
    ctx.beginPath();
    let lx = 35;
    ctx.moveTo(lx, states[0] === 'D' ? v15 : v25);
    for (let i = 0; i < states.length; i++) {
      const ly = states[i] === 'D' ? v15 : v25;
      ctx.lineTo(lx, ly);
      ctx.lineTo(lx + step, ly);
      lx += step;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Diff label
    ctx.fillStyle = '#10b981';
    ctx.fillText('ΔV = 2.0V (Dominant Bit "0")  |  ΔV = 0.0V (Recessive Bit "1")', w / 2 - 140, h - 12);
  }

  function render() {
    requestAnimationFrame(render);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 600;
    const h = 200;

    drawGrid(w, h);

    const now = performance.now() * 0.003;
    scanX = (scanX + 2.5) % w;

    if (currentScopeProtocol === 'uart') {
      drawUART(w, h, now);
    } else if (currentScopeProtocol === 'i2c') {
      drawI2C(w, h, now);
    } else if (currentScopeProtocol === 'spi') {
      drawSPI(w, h, now);
    } else if (currentScopeProtocol === 'can') {
      drawCAN(w, h, now);
    }

    // Scanning vertical trigger beam line
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(scanX, 0);
    ctx.lineTo(scanX, h);
    ctx.stroke();

    // Trigger cursor tag
    ctx.fillStyle = '#00f0ff';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('TRIG ⮟', scanX - 14, 14);
  }

  render();
}

/* ==========================================================================
   15. 3D TOPOGRAPHIC SIGNAL WAVE & QUANTUM TERRAIN LATTICE ENGINE
       (Exclusive Software & ECE Mathematical Waveform Background)
   ========================================================================== */
function initThreeDepthScene() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.THREE) return;

  const canvas = document.getElementById('gl');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  // Soft atmospheric perspective fog in luxury off-white
  scene.fog = new THREE.FogExp2(0xf8fafc, 0.012);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 15, 26);
  camera.rotation.x = -0.48;

  // 1. Undulating Topographic Terrain Geometry
  const GRID_W = 85;
  const GRID_D = 70;
  const SEG_X = 64;
  const SEG_Y = 48;
  const planeGeo = new THREE.PlaneGeometry(GRID_W, GRID_D, SEG_X, SEG_Y);
  planeGeo.rotateX(-Math.PI / 2);

  const posAttr = planeGeo.attributes.position;
  const vertexCount = posAttr.count;
  const originalCoords = new Float32Array(vertexCount * 2);

  for (let i = 0; i < vertexCount; i++) {
    originalCoords[i * 2] = posAttr.getX(i);
    originalCoords[i * 2 + 1] = posAttr.getZ(i);
  }

  // Champagne Gold Wireframe Terrain Material
  const terrainWireMat = new THREE.MeshBasicMaterial({
    color: 0xC6A15B,
    wireframe: true,
    transparent: true,
    opacity: 0.38
  });
  const terrainMesh = new THREE.Mesh(planeGeo, terrainWireMat);
  terrainMesh.position.set(0, -3.5, -6);
  scene.add(terrainMesh);

  // Sparkling Data Nodes at Lattice Vertices
  const nodePointsMat = new THREE.PointsMaterial({
    color: 0xB58934,
    size: 0.16,
    transparent: true,
    opacity: 0.72
  });
  const nodePoints = new THREE.Points(planeGeo, nodePointsMat);
  nodePoints.position.set(0, -3.5, -6);
  scene.add(nodePoints);

  // 2. Harmonic Signal Carrier Wave Ribbons (Flowing Transverse Waves)
  const ribbonCount = 3;
  const ribbons = [];
  const ribbonColors = [0xC6A15B, 0x2563EB, 0xD4AF37];

  for (let r = 0; r < ribbonCount; r++) {
    const ribbonPoints = [];
    const pts = 90;
    for (let p = 0; p < pts; p++) {
      ribbonPoints.push(new THREE.Vector3((p / pts - 0.5) * 80, 0, (r - 1) * 12 - 4));
    }
    const ribbonGeo = new THREE.BufferGeometry().setFromPoints(ribbonPoints);
    const ribbonMat = new THREE.LineBasicMaterial({
      color: ribbonColors[r],
      transparent: true,
      opacity: 0.65,
      linewidth: 2
    });
    const line = new THREE.Line(ribbonGeo, ribbonMat);
    scene.add(line);
    ribbons.push({ line, geo: ribbonGeo, pts: ribbonPoints, offset: r * 1.5 });
  }

  // 3. Ambient Atmospheric Constellation Particles
  const starCount = 380;
  const starArray = new Float32Array(starCount * 3);
  for (let s = 0; s < starCount; s++) {
    starArray[s * 3] = (Math.random() - 0.5) * 75;
    starArray[s * 3 + 1] = 2 + Math.random() * 22;
    starArray[s * 3 + 2] = (Math.random() - 0.5) * 70 - 10;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starArray, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xC6A15B,
    size: 0.14,
    transparent: true,
    opacity: 0.6
  });
  const starfield = new THREE.Points(starGeo, starMat);
  scene.add(starfield);

  // Handle Resize
  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  handleResize();
  window.addEventListener('resize', handleResize, { passive: true });

  // Mouse Parallax Track
  let mouseX = 0, mouseY = 0;
  window.addEventListener('pointermove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  }, { passive: true });

  let time = 0;

  function animate() {
    if (!document.hidden) {
      time += 0.015;

      const scrollMax = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrollProgress = window.scrollY / scrollMax;

      // Scroll physics: smoothly adjust camera perspective and glide along the terrain
      const targetCamZ = 26 - scrollProgress * 18;
      const targetCamY = 15 - scrollProgress * 6;
      const targetRotX = -0.48 + scrollProgress * 0.15;

      camera.position.z += (targetCamZ - camera.position.z) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.x += (mouseX * 7.5 - camera.position.x) * 0.05;
      camera.rotation.x += (targetRotX - camera.rotation.x) * 0.05;
      camera.rotation.y += (mouseX * 0.08 - camera.rotation.y) * 0.05;

      // Dynamic Mathematical Undulation of the Terrain Lattice
      const waveSpeed = 1.2 + scrollProgress * 0.8;
      const amplitude = 2.4 + scrollProgress * 0.6;

      for (let i = 0; i < vertexCount; i++) {
        const x = originalCoords[i * 2];
        const z = originalCoords[i * 2 + 1];

        // Multi-frequency harmonic wave formula
        const y = Math.sin(x * 0.14 + time * waveSpeed) * Math.cos(z * 0.12 + time * 0.8) * amplitude
                + Math.sin((x + z) * 0.07 + time * 0.6) * 1.1;

        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;

      // Animate Harmonic Signal Carrier Ribbons
      ribbons.forEach((ribbon) => {
        const pos = ribbon.geo.attributes.position;
        const count = ribbon.pts.length;
        for (let p = 0; p < count; p++) {
          const pt = ribbon.pts[p];
          const ry = Math.sin(pt.x * 0.16 + time * 2.2 + ribbon.offset) * 2.0
                   + Math.cos(pt.x * 0.08 + time * 1.1) * 1.2;
          pos.setY(p, ry - 1.5);
        }
        pos.needsUpdate = true;
      });

      // Subtle ambient stars rotation
      starfield.rotation.y += 0.0004;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   16. CURSOR GLOW & BACK-TO-TOP BUTTON (JEEVAN REFERENCE)
   ========================================================================== */
function initCursorGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const glow = document.getElementById('glow');
  if (!glow) return;

  window.addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

function initBackToTop() {
  const topBtn = document.getElementById('top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * MANOJ G — IMMERSIVE 3D ENGINEERING & SOFTWARE DEVELOPER PORTFOLIO
 * High-performance Three.js WebGL scenes, 3D project showcases, 
 * circuit traces, 3D card tilt, QR codes, and touch interactions.
 * Built with pure JavaScript (MERN Stack ecosystem, Zero external framework lock-in).
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initNavigation();
  initProjectFilters();
  initResumeModal();
  initTouchAnimation();
  initQRCodes();
  initScrollAnimations();
  init3DCardTilt();
  initBackgroundTechCanvas();
  initHero3DProcessor();
  initProject3DCar();
  initProject3DVoting();
  initProject3DCampus();
  initProject3DRegen();
  initSkills3DHub();
});

/* ==========================================================================
   1. TOUCH & CLICK INTERACTIVE ANIMATION
   ========================================================================== */
function initTouchAnimation() {
  const createTouchPulse = (x, y) => {
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    const sparkle = document.createElement('div');
    sparkle.className = 'touch-sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => {
      ripple.remove();
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
   4. 3D HERO MICROPROCESSOR SCENE (THREE.JS)
   ========================================================================== */
function initHero3DProcessor() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 9);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } catch (err) {
    console.warn('WebGL init skipped:', err);
    return;
  }

  // Lighting
  const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambLight);

  const dirLight = new THREE.DirectionalLight(0x0284c7, 1.8);
  dirLight.position.set(5, 8, 7);
  scene.add(dirLight);

  const bluePoint = new THREE.PointLight(0x00f0ff, 2.2, 20);
  bluePoint.position.set(-4, -2, 4);
  scene.add(bluePoint);

  // Group containing the microchip & tech elements
  const processorGroup = new THREE.Group();
  processorGroup.position.set(2.4, 0.2, 0); // Position on the right side of hero
  scene.add(processorGroup);

  // 1. Silicon Chip Die (Main Body)
  const chipGeo = new THREE.BoxGeometry(2.8, 0.35, 2.8);
  const chipMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.85,
    roughness: 0.25
  });
  const chipMesh = new THREE.Mesh(chipGeo, chipMat);
  processorGroup.add(chipMesh);

  // 2. Heat Spreader Metallic Core
  const coreGeo = new THREE.BoxGeometry(2.1, 0.1, 2.1);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.95,
    roughness: 0.15
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.position.y = 0.2;
  processorGroup.add(coreMesh);

  // 3. Glowing Core Etch Ring
  const ringGeo = new THREE.TorusGeometry(0.7, 0.035, 16, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.y = 0.26;
  processorGroup.add(ringMesh);

  // 4. IC Metallic Pins on 4 Sides
  const pinGeo = new THREE.BoxGeometry(0.08, 0.08, 0.35);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });

  const numPinsPerSide = 7;
  const pinSpacing = 0.32;
  for (let i = 0; i < numPinsPerSide; i++) {
    const offset = (i - (numPinsPerSide - 1) / 2) * pinSpacing;
    // Front & Back
    const p1 = new THREE.Mesh(pinGeo, pinMat);
    p1.position.set(offset, 0, 1.55);
    processorGroup.add(p1);

    const p2 = new THREE.Mesh(pinGeo, pinMat);
    p2.position.set(offset, 0, -1.55);
    processorGroup.add(p2);

    // Left & Right
    const p3 = new THREE.Mesh(pinGeo, pinMat);
    p3.rotation.y = Math.PI / 2;
    p3.position.set(1.55, 0, offset);
    processorGroup.add(p3);

    const p4 = new THREE.Mesh(pinGeo, pinMat);
    p4.rotation.y = Math.PI / 2;
    p4.position.set(-1.55, 0, offset);
    processorGroup.add(p4);
  }

  // 5. Floating Technology Badges (7 Nodes)
  const techNames = ['Java', 'React', 'JS', 'Python', 'ESP32', 'AI', 'IoT'];
  const techColors = [0xdc2626, 0x0284c7, 0xeab308, 0x16a34a, 0x7c3aed, 0xec4899, 0x059669];
  const techNodes = [];

  techNames.forEach((name, i) => {
    const angle = (i / techNames.length) * Math.PI * 2;
    const radius = 2.4 + (i % 2) * 0.4;
    const nodeGroup = new THREE.Group();

    // Geometric polyhedral node carrier
    const polyGeo = new THREE.OctahedronGeometry(0.22);
    const polyMat = new THREE.MeshStandardMaterial({
      color: techColors[i],
      wireframe: true,
      emissive: techColors[i],
      emissiveIntensity: 0.4
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    nodeGroup.add(polyMesh);

    nodeGroup.userData = {
      baseAngle: angle,
      radius: radius,
      speed: 0.4 + (i % 3) * 0.1,
      yOffset: (i % 2 === 0 ? 0.3 : -0.3)
    };

    processorGroup.add(nodeGroup);
    techNodes.push(nodeGroup);
  });

  // Mouse Parallax Follow
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0.35, targetRotY = -0.45;

  window.addEventListener('pointermove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotX = 0.35 + mouseY * 0.25;
    targetRotY = -0.45 + mouseX * 0.35;
  }, { passive: true });

  // Responsive resize
  function onResize() {
    if (!canvas.parentElement) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);

    // Reposition processor based on screen width
    if (window.innerWidth < 1024) {
      processorGroup.position.set(0, 0.4, 0);
      processorGroup.scale.set(0.78, 0.78, 0.78);
    } else {
      processorGroup.position.set(2.4, 0.2, 0);
      processorGroup.scale.set(1, 1, 1);
    }
  }
  window.addEventListener('resize', onResize, { passive: true });
  onResize();

  // Animation Loop with Visibility Throttling
  let isVisible = true;
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(canvas);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Smooth tilt to target
    processorGroup.rotation.x += (targetRotX - processorGroup.rotation.x) * 0.06;
    processorGroup.rotation.y += (targetRotY - processorGroup.rotation.y) * 0.06;
    processorGroup.position.y += Math.sin(elapsedTime * 1.4) * 0.002;

    // Orbit floating tech nodes
    techNodes.forEach((node) => {
      const u = node.userData;
      const currentAngle = u.baseAngle + elapsedTime * u.speed * 0.4;
      node.position.x = Math.cos(currentAngle) * u.radius;
      node.position.z = Math.sin(currentAngle) * u.radius;
      node.position.y = u.yOffset + Math.sin(elapsedTime * 2 + u.baseAngle) * 0.15;
      node.rotation.x += 0.02;
      node.rotation.y += 0.03;
    });

    ringMesh.rotation.z += 0.015;

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   5. PROJECT 1: 3D PATH DETECTION CAR (THREE.JS ROBOTIC CAR)
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

  // Digital Perspective Grid Road
  const gridHelper = new THREE.GridHelper(24, 24, 0x0284c7, 0xcbd5e1);
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  // Robotic Car Assembly
  const carGroup = new THREE.Group();
  scene.add(carGroup);

  // Chassis Lower Deck (Blue Acrylic Plate)
  const chassisGeo = new THREE.BoxGeometry(1.4, 0.12, 2.2);
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3 });
  const chassis = new THREE.Mesh(chassisGeo, chassisMat);
  chassis.position.y = 0.45;
  carGroup.add(chassis);

  // 4 Rubber Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
  const wheels = [];

  const wheelPositions = [
    [-0.78, 0.32, 0.65],
    [0.78, 0.32, 0.65],
    [-0.78, 0.32, -0.65],
    [0.78, 0.32, -0.65]
  ];

  wheelPositions.forEach(pos => {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(...pos);
    carGroup.add(w);
    wheels.push(w);
  });

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

  // Animated Ultrasonic Radar Detection Cone
  const coneGeo = new THREE.ConeGeometry(0.8, 1.8, 16, 1, true);
  const coneMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide
  });
  const radarCone = new THREE.Mesh(coneGeo, coneMat);
  radarCone.rotation.x = -Math.PI / 2;
  radarCone.position.set(0, 0, 1.05);
  sensorGroup.add(radarCone);

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
  espBoard.position.set(0, 0.55, 0.1);
  carGroup.add(espBoard);

  // Road Obstacle
  const obsGeo = new THREE.BoxGeometry(0.8, 0.6, 0.8);
  const obsMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });
  const obstacle = new THREE.Mesh(obsGeo, obsMat);
  obstacle.position.set(0, 0.3, carState.obstaclePos);
  scene.add(obstacle);

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
  scene.add(trajectoryLine);

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

    // 1. Servo Sensor Sweep
    const sweepAngle = Math.sin(time * carState.sweepSpeed) * 0.7; // ~40 deg
    sensorGroup.rotation.y = sweepAngle;
    const degrees = Math.round((sweepAngle * 180) / Math.PI) + 90;
    const hudAngle = document.getElementById('car-hud-angle');
    if (hudAngle) hudAngle.innerHTML = `${degrees}&deg;`;

    // 2. Wheel continuous rotation
    wheels.forEach(w => {
      w.rotation.x += 0.08;
    });

    // 3. Digital Grid road moving backward
    gridHelper.position.z = (time * 1.8) % 2;

    // 4. Ultrasonic Radar Pulse expansion
    const pulse = 1.0 + Math.sin(time * 6) * 0.2;
    radarCone.scale.set(pulse, 1, pulse);

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
      // Obstacle detected! Car maneuvers around
      carGroup.position.x = Math.sin(time * 3) * 0.65;
      carGroup.rotation.y = Math.cos(time * 3) * 0.15;
      if (statusEl) {
        statusEl.className = 'hud-item status-warn';
        statusEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> AVOIDING COLLISION';
      }
    } else {
      carGroup.position.x = 0;
      carGroup.rotation.y = 0;
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
   6. PROJECT 2: 3D SMART VOTING TERMINAL (THREE.JS)
   ========================================================================== */
let totalVotesRecorded = 142;

window.castSimulatedVote = function(optionNum) {
  totalVotesRecorded++;
  const countEl = document.getElementById('live-vote-count');
  if (countEl) countEl.textContent = totalVotesRecorded;

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
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.9
  });
  const statusLed = new THREE.Mesh(ledGeo, ledMat);
  statusLed.position.set(0.85, 0.5, -0.3);
  termGroup.add(statusLed);

  // 4 Tactile Keypad Push Buttons
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4 });
  const keyGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16);

  [-0.45, -0.15, 0.15, 0.45].forEach((xPos, idx) => {
    const key = new THREE.Mesh(keyGeo, keyMat);
    key.position.set(xPos, 0.42, 0.35);
    key.rotation.x = 0.25;
    termGroup.add(key);
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
    termGroup.rotation.y = Math.sin(time * 0.8) * 0.08;

    // Pulse status LED
    const pulse = (Math.sin(time * 4) + 1) * 0.4 + 0.3;
    ledMat.emissiveIntensity = pulse;

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   7. PROJECT 3: 3D CAMPUSGO ISOMETRIC ENVIRONMENT (THREE.JS)
   ========================================================================== */
window.setCampusTarget = function(destination) {
  const pill = document.getElementById('campus-status-pill');
  const btnLib = document.getElementById('btn-dest-lib');
  const btnAcad = document.getElementById('btn-dest-acad');
  const btnTrans = document.getElementById('btn-dest-trans');

  [btnLib, btnAcad, btnTrans].forEach(b => b?.classList.remove('active'));

  if (destination === 'library') {
    btnLib?.classList.add('active');
    if (pill) pill.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Central Library &bull; Route Active (3 mins)';
  } else if (destination === 'academic') {
    btnAcad?.classList.add('active');
    if (pill) pill.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> Academic Zone A &bull; Lecture Halls Active';
  } else if (destination === 'transit') {
    btnTrans?.classList.add('active');
    if (pill) pill.innerHTML = '<i class="fa-solid fa-bus"></i> Transit Terminal &bull; Shuttle #2 Arriving';
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

  // Isometric Ground Campus Plane
  const groundGeo = new THREE.BoxGeometry(5.5, 0.15, 5.5);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.075;
  scene.add(ground);

  const grid = new THREE.GridHelper(5, 10, 0x0284c7, 0xe2e8f0);
  grid.position.y = 0.01;
  scene.add(grid);

  // 3D Campus Architectural Blocks
  const bldgMat1 = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });
  const bldgMat2 = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
  const bldgMat3 = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.3 });

  // Academic Block A
  const acadA = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.4, 1.2), bldgMat1);
  acadA.position.set(-1.4, 0.7, -1.0);
  scene.add(acadA);

  // Central Library
  const library = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 1.4), bldgMat2);
  library.position.set(1.1, 0.45, -0.9);
  scene.add(library);

  // Transit Hub
  const transit = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 1.6), bldgMat3);
  transit.position.set(0.5, 0.25, 1.2);
  scene.add(transit);

  // 3D Floating Smartphone Model (CampusGo UI Preview)
  const phoneGroup = new THREE.Group();
  phoneGroup.position.set(-1.2, 1.2, 1.2);
  phoneGroup.rotation.y = Math.PI / 4;
  phoneGroup.rotation.x = -0.2;
  scene.add(phoneGroup);

  const phoneBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 1.5, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 })
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
    scene.rotation.y = time * 0.1;
    phoneGroup.position.y = 1.1 + Math.sin(time * 2) * 0.08;

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
  const light = new THREE.DirectionalLight(0x059669, 1.5);
  light.position.set(3, 4, 5);
  scene.add(light);

  // Circular Closed-Loop Torus
  const torusGeo = new THREE.TorusGeometry(1.3, 0.28, 20, 64);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x059669,
    metalness: 0.5,
    roughness: 0.3
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  scene.add(torus);

  // Flowing Particles along the Circular Recycling Loop
  const particleCount = 48;
  const partGeo = new THREE.SphereGeometry(0.045, 8, 8);
  const partMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const p = new THREE.Mesh(partGeo, partMat);
    scene.add(p);
    particles.push({
      mesh: p,
      angle: (i / particleCount) * Math.PI * 2
    });
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
    torus.rotation.x = time * 0.5;
    torus.rotation.y = time * 0.4;

    particles.forEach(p => {
      p.angle += 0.02;
      p.mesh.position.x = Math.cos(p.angle) * 1.3;
      p.mesh.position.y = Math.sin(p.angle) * 1.3;
      p.mesh.position.z = Math.sin(p.angle * 2 + time) * 0.2;
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
  const dirLight = new THREE.DirectionalLight(0x0284c7, 1.6);
  dirLight.position.set(2, 3, 4);
  scene.add(dirLight);

  // Microchip Model
  const chipGroup = new THREE.Group();
  scene.add(chipGroup);

  const chipBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.22, 1.4),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 })
  );
  chipGroup.add(chipBody);

  const coreLabel = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.08, 0.9),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x0284c7, emissiveIntensity: 0.4 })
  );
  coreLabel.position.y = 0.12;
  chipGroup.add(coreLabel);

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
    chipGroup.rotation.x = 0.45 + Math.sin(time * 1.5) * 0.1;
    chipGroup.rotation.y = time * 0.8;

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

  // 1. GITHUB QR: https://github.com/MANOJG006
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

  // 2. LINKEDIN QR: https://linkedin.com/in/manoj-g-33797a360
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

  // 3. DUOLINGO QR
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

  // 4. MY PORTFOLIO QR
  if (window.PORTFOLIO_PRODUCTION_URL && window.PORTFOLIO_PRODUCTION_URL.startsWith('https://')) {
    const portBox = document.getElementById('portfolio-qr-box');
    if (portBox) {
      portBox.innerHTML = '<div id="portfolio-qr-canvas" class="qr-generated-target"></div>';
      new QRCode(document.getElementById('portfolio-qr-canvas'), {
        text: window.PORTFOLIO_PRODUCTION_URL,
        width: 170,
        height: 170,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      const badge = document.querySelector('.qr-status-badge.pending');
      if (badge) {
        badge.className = 'qr-status-badge live';
        badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Live Production';
      }
    }
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

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
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
    '.section-header, .project-card, .skill-category-card, .cert-card, .qr-card, .timeline-item, .edu-card, .stat-card, .contact-info-card, .contact-form-card'
  );

  if (!elementsToAnimate.length) return;

  if (!('IntersectionObserver' in window)) {
    elementsToAnimate.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const grids = document.querySelectorAll('.projects-grid, .certs-grid, .qr-grid, .skills-grid, .edu-grid, .skills-grid-4col');
  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, index) => {
      const delayNum = (index % 6) + 1;
      child.classList.add(`reveal-delay-${delayNum}`);
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -25px 0px'
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
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');
  const name = document.getElementById('contact-name').value;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

  setTimeout(() => {
    feedback.className = 'form-feedback feedback-success';
    feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your message has been received. I will get back to you promptly.`;
    document.getElementById('contact-form').reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
  }, 800);
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

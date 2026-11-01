import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeTelescopeProps {
  /** Scroll progress through work section (0.00 to 1.00) */
  scrollProgress: number;
  /** Opacity of the telescope canvas */
  opacity?: number;
}

/**
 * True 3D WebGL Standing Astronomical Refractor Telescope.
 * Faithfully styled after the user's reference illustration:
 * - Satin Lavender / Lilac pearlescent optical tube barrel.
 * - Deep Cosmic Violet anodized alloy dew shield, tube bands, finderscope brackets, mount, and tripod legs.
 * - Polished Stainless Chrome focuser drawtube, fine-focus knobs, and extension joints.
 * - Finderscope mounted parallel along the top of the tube.
 * - 90° star diagonal with ocular eyepiece facing directly towards the viewer.
 * - Counterweight / fine-motion control rod with round knob angled down-right.
 * - Genuine 3D rotation in place as the user scrolls, then dollying camera smoothly
 *   into the ocular lens without clipping or glitches.
 */
export default function ThreeTelescope({
  scrollProgress,
  opacity = 1,
}: ThreeTelescopeProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const telescopeGroupRef = useRef<THREE.Group | null>(null);
  const ocularLensRef = useRef<THREE.Mesh | null>(null);
  const reticleGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number>(0);

  // Store target scroll values for smooth lerping
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Camera setup with ultra-low near-plane (0.002) to prevent near-clipping flicker
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.002, 100);
    const startCamPos = new THREE.Vector3(0, 0.35, 7.8);
    const startLookAt = new THREE.Vector3(0, 0.15, 0);
    camera.position.copy(startCamPos);
    camera.lookAt(startLookAt);
    cameraRef.current = camera;

    // 3. WebGL Renderer with Alpha & Antialiasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio & Cosmic Lighting (Vibrant violet/lavender specular highlights)
    // Warm key light from top-right (illuminates lavender barrel curvature)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Deep cosmic violet rim light from behind (defines sleek silhouette of dark violet legs & dew shield)
    const rimLight = new THREE.DirectionalLight(0xa855f7, 3.2);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Subtle sky cyan fill light
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    fillLight.position.set(-4, 1, 3);
    scene.add(fillLight);

    // Soft warm under-light (highlights tripod spreader struts & mount base)
    const bounceLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    bounceLight.position.set(0, -4, 2);
    scene.add(bounceLight);

    // Ambient night sky light (keeps deep violet parts richly saturated, not black)
    const ambientLight = new THREE.AmbientLight(0x2e1065, 1.8);
    scene.add(ambientLight);

    // =========================================================================
    // 5. MATERIALS PALETTE (Faithful to Reference Illustration + 3D Realistic)
    // =========================================================================

    // 1. Pale Lavender / Lilac Pearlescent Lacquer (Main Tube & Finder Tube)
    const tubeBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xc4b2e8,
      metalness: 0.28,
      roughness: 0.32,
      clearcoat: 0.45,
      clearcoatRoughness: 0.2,
      reflectivity: 0.6,
    });

    // 2. Deep Cosmic Violet Anodized Metal (Dew Shield, Bands, Mount, Tripod, Finderscope Rings)
    const violetAccentMat = new THREE.MeshStandardMaterial({
      color: 0x36185c,
      metalness: 0.58,
      roughness: 0.26,
    });

    // 3. Dark Obsidian Violet (Bezel Rings, Outlines, Eyecup Rim)
    const darkVioletMat = new THREE.MeshStandardMaterial({
      color: 0x1f0b38,
      metalness: 0.45,
      roughness: 0.45,
    });

    // 4. Polished Stainless Steel & Chrome (Focuser Drawtube, Knobs, Shaft, Joints)
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.12,
    });

    // 5. Multi-Coated Optical Glass (Objective & Eyepiece Lenses with Celestial Reflection)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      metalness: 0.08,
      roughness: 0.04,
      transmission: 0.88,
      transparent: true,
      opacity: 0.92,
      ior: 1.54,
    });

    // 6. Glowing Golden Starlight Core Material
    const starMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
    });

    // =========================================================================
    // 6. 3D TELESCOPE HIERARCHY (Slightly smaller, sleek, refined)
    // =========================================================================
    const telescopeRoot = new THREE.Group();
    telescopeRoot.scale.setScalar(0.72);
    scene.add(telescopeRoot);
    telescopeGroupRef.current = telescopeRoot;

    // --- A. TRIPOD ASSEMBLY (Deep Violet Metallic Legs matching illustration) ---
    const tripodGroup = new THREE.Group();
    telescopeRoot.add(tripodGroup);

    // Deep violet central crown hub
    const crownGeo = new THREE.CylinderGeometry(0.36, 0.42, 0.22, 24);
    const crown = new THREE.Mesh(crownGeo, violetAccentMat);
    crown.position.set(0, -0.15, 0);
    tripodGroup.add(crown);

    // Crown accent trim ring
    const crownRingGeo = new THREE.CylinderGeometry(0.43, 0.43, 0.04, 24);
    const crownRing = new THREE.Mesh(crownRingGeo, darkVioletMat);
    crownRing.position.set(0, -0.12, 0);
    tripodGroup.add(crownRing);

    // 3 Sleek Metallic Deep Violet Tripod Legs at 120° angles
    const legAngleY = (Math.PI * 2) / 3;

    for (let i = 0; i < 3; i++) {
      const angle = i * legAngleY + Math.PI / 6;
      const legHolder = new THREE.Group();
      legHolder.position.set(0, -0.2, 0);
      legHolder.rotation.y = angle;

      // Upper leg section (Deep Violet)
      const upperLegGeo = new THREE.CylinderGeometry(0.065, 0.055, 1.8, 16);
      const upperLeg = new THREE.Mesh(upperLegGeo, violetAccentMat);
      upperLeg.position.set(0, -0.9, 0.38);
      upperLeg.rotation.x = 0.42;
      legHolder.add(upperLeg);

      // Chrome extension lock collar
      const collarGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.16, 16);
      const collar = new THREE.Mesh(collarGeo, chromeMat);
      collar.position.set(0, -1.75, 0.74);
      collar.rotation.x = 0.42;
      legHolder.add(collar);

      // Lower leg section (Deep Violet)
      const lowerLegGeo = new THREE.CylinderGeometry(0.05, 0.04, 1.5, 16);
      const lowerLeg = new THREE.Mesh(lowerLegGeo, violetAccentMat);
      lowerLeg.position.set(0, -2.45, 1.05);
      lowerLeg.rotation.x = 0.42;
      legHolder.add(lowerLeg);

      // Chrome spiked / rubber tapered foot
      const footGeo = new THREE.ConeGeometry(0.045, 0.22, 16);
      const foot = new THREE.Mesh(footGeo, chromeMat);
      foot.position.set(0, -3.22, 1.38);
      foot.rotation.x = Math.PI;
      legHolder.add(foot);

      // Spreader strut connecting leg to center hub
      const strutGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.82, 12);
      const strut = new THREE.Mesh(strutGeo, violetAccentMat);
      strut.position.set(0, -1.35, 0.36);
      strut.rotation.x = -0.55;
      legHolder.add(strut);

      tripodGroup.add(legHolder);
    }

    // Center Spreader Hub
    const spreaderHubGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
    const spreaderHub = new THREE.Mesh(spreaderHubGeo, darkVioletMat);
    spreaderHub.position.set(0, -1.45, 0);
    tripodGroup.add(spreaderHub);

    // Center Chrome Tension Rod
    const centerRodGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.35, 16);
    const centerRod = new THREE.Mesh(centerRodGeo, chromeMat);
    centerRod.position.set(0, -0.82, 0);
    tripodGroup.add(centerRod);

    // Ground Contact Shadow Disc
    const shadowGeo = new THREE.CircleGeometry(2.4, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.55,
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.position.set(0, -2.85, 0);
    groundShadow.rotation.x = -Math.PI / 2;
    tripodGroup.add(groundShadow);

    // --- B. MOUNT ASSEMBLY (Deep Violet Alt-Az / Equatorial Head) ---
    const mountHead = new THREE.Group();
    mountHead.position.set(0, 0, 0);
    telescopeRoot.add(mountHead);

    // Base Azimuth plate
    const baseCollarGeo = new THREE.CylinderGeometry(0.3, 0.34, 0.14, 24);
    const baseCollar = new THREE.Mesh(baseCollarGeo, violetAccentMat);
    baseCollar.position.set(0, 0.02, 0);
    mountHead.add(baseCollar);

    // Altitude pivot block
    const wedgeGeo = new THREE.BoxGeometry(0.34, 0.38, 0.3);
    const wedge = new THREE.Mesh(wedgeGeo, violetAccentMat);
    wedge.position.set(0, 0.24, 0);
    mountHead.add(wedge);

    // Gimbal cylinder axis
    const axisGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.44, 20);
    const axisMesh = new THREE.Mesh(axisGeo, darkVioletMat);
    axisMesh.position.set(0, 0.46, 0);
    axisMesh.rotation.z = Math.PI / 6;
    mountHead.add(axisMesh);

    // Counterweight / Fine-Motion Control Rod (Points diagonally down-right as in illustration!)
    const cwShaftGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.5, 16);
    const cwShaft = new THREE.Mesh(cwShaftGeo, chromeMat);
    cwShaft.position.set(0.55, -0.15, 0.1);
    cwShaft.rotation.z = -Math.PI / 3;
    mountHead.add(cwShaft);

    // Round Violet Counterweight / Knob at the end of the rod
    const cwWeightGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.22, 24);
    const cwWeight = new THREE.Mesh(cwWeightGeo, violetAccentMat);
    cwWeight.position.set(0.7, -0.24, 0.1);
    cwWeight.rotation.z = -Math.PI / 3;
    mountHead.add(cwWeight);

    // Dark trim collar on knob
    const cwCapGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.05, 24);
    const cwCap = new THREE.Mesh(cwCapGeo, darkVioletMat);
    cwCap.position.set(0.78, -0.29, 0.1);
    cwCap.rotation.z = -Math.PI / 3;
    mountHead.add(cwCap);

    // --- C. OPTICAL TUBE ASSEMBLY (OTA) ---
    // Mounted in tube rings at top of the mount, angled up-right at ~32° elevation
    const tubeAssembly = new THREE.Group();
    tubeAssembly.position.set(0, 0.65, 0);
    tubeAssembly.rotation.z = -Math.PI * 0.175; // Angled up towards upper right
    mountHead.add(tubeAssembly);

    // Dual Deep-Violet Mounting Clamping Rings
    const ringGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.14, 32);
    const ring1 = new THREE.Mesh(ringGeo, violetAccentMat);
    ring1.position.set(-0.35, 0, 0);
    ring1.rotation.z = Math.PI / 2;
    tubeAssembly.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, violetAccentMat);
    ring2.position.set(0.45, 0, 0);
    ring2.rotation.z = Math.PI / 2;
    tubeAssembly.add(ring2);

    // Ring Dark Accent Chamfers
    const ringBezelGeo = new THREE.CylinderGeometry(0.435, 0.435, 0.03, 32);
    const rb1 = new THREE.Mesh(ringBezelGeo, darkVioletMat);
    rb1.position.set(-0.35, 0, 0);
    rb1.rotation.z = Math.PI / 2;
    tubeAssembly.add(rb1);

    const rb2 = new THREE.Mesh(ringBezelGeo, darkVioletMat);
    rb2.position.set(0.45, 0, 0);
    rb2.rotation.z = Math.PI / 2;
    tubeAssembly.add(rb2);

    // Main Cylindrical Refractor Tube (LAVENDER / LILAC SILK FINISH)
    const mainTubeGeo = new THREE.CylinderGeometry(0.36, 0.38, 3.4, 36);
    const mainTube = new THREE.Mesh(mainTubeGeo, tubeBodyMat);
    mainTube.rotation.z = Math.PI / 2;
    tubeAssembly.add(mainTube);

    // Center Violet Accent Band on Tube
    const centerBandGeo = new THREE.CylinderGeometry(0.385, 0.385, 0.08, 32);
    const centerBand = new THREE.Mesh(centerBandGeo, violetAccentMat);
    centerBand.position.set(0.05, 0, 0);
    centerBand.rotation.z = Math.PI / 2;
    tubeAssembly.add(centerBand);

    // FRONT OBJECTIVE DEW SHIELD (Wider Aperture, DEEP ROYAL VIOLET)
    const dewShieldGeo = new THREE.CylinderGeometry(0.46, 0.44, 0.95, 36);
    const dewShield = new THREE.Mesh(dewShieldGeo, violetAccentMat);
    dewShield.position.set(1.92, 0, 0);
    dewShield.rotation.z = Math.PI / 2;
    tubeAssembly.add(dewShield);

    // Dew Shield Front Bezel Collar (Dark Violet outline rim)
    const frontBezelGeo = new THREE.CylinderGeometry(0.475, 0.475, 0.09, 36);
    const frontBezel = new THREE.Mesh(frontBezelGeo, darkVioletMat);
    frontBezel.position.set(2.40, 0, 0);
    frontBezel.rotation.z = Math.PI / 2;
    tubeAssembly.add(frontBezel);

    // Multi-Coated Optical Glass Objective Lens with Celestial Reflections
    const frontLensGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.02, 36);
    const frontLens = new THREE.Mesh(frontLensGeo, glassMat);
    frontLens.position.set(2.32, 0, 0);
    frontLens.rotation.z = Math.PI / 2;
    tubeAssembly.add(frontLens);

    // --- FINDERSCOPE ON TOP (PARALLEL TO MAIN TUBE, MATCHING ILLUSTRATION) ---
    const finderGroup = new THREE.Group();
    finderGroup.position.set(0.55, 0.58, 0.15);
    tubeAssembly.add(finderGroup);

    // Dual Violet Finder Bracket Rings
    const stalkGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.28, 12);
    const stalk1 = new THREE.Mesh(stalkGeo, darkVioletMat);
    stalk1.position.set(-0.25, -0.14, 0);
    finderGroup.add(stalk1);

    const stalk2 = new THREE.Mesh(stalkGeo, darkVioletMat);
    stalk2.position.set(0.35, -0.14, 0);
    finderGroup.add(stalk2);

    const fRingGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.06, 20);
    const fRing1 = new THREE.Mesh(fRingGeo, violetAccentMat);
    fRing1.position.set(-0.25, 0, 0);
    fRing1.rotation.z = Math.PI / 2;
    finderGroup.add(fRing1);

    const fRing2 = new THREE.Mesh(fRingGeo, violetAccentMat);
    fRing2.position.set(0.35, 0, 0);
    fRing2.rotation.z = Math.PI / 2;
    finderGroup.add(fRing2);

    // Finderscope Lavender Tube
    const finderTubeGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.15, 24);
    const finderTube = new THREE.Mesh(finderTubeGeo, tubeBodyMat);
    finderTube.rotation.z = Math.PI / 2;
    finderGroup.add(finderTube);

    // Finderscope Front Objective Bell (Deep Violet)
    const finderFrontGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.18, 24);
    const finderFront = new THREE.Mesh(finderFrontGeo, violetAccentMat);
    finderFront.position.set(0.64, 0, 0);
    finderFront.rotation.z = Math.PI / 2;
    finderGroup.add(finderFront);

    // Finderscope Rear Eyepiece Collar (Deep Violet)
    const finderRearGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.15, 24);
    const finderRear = new THREE.Mesh(finderRearGeo, darkVioletMat);
    finderRear.position.set(-0.64, 0, 0);
    finderRear.rotation.z = Math.PI / 2;
    finderGroup.add(finderRear);

    // --- REAR FOCUSER ASSEMBLY ---
    // Chrome Focuser Drawtube emerging from rear of main tube
    const focuserGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.65, 28);
    const focuser = new THREE.Mesh(focuserGeo, chromeMat);
    focuser.position.set(-1.82, 0, 0);
    focuser.rotation.z = Math.PI / 2;
    tubeAssembly.add(focuser);

    // Dual Violet Fine-Focus Knobs
    const focusWheelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.06, 24);
    const focusWheelL = new THREE.Mesh(focusWheelGeo, violetAccentMat);
    focusWheelL.position.set(-1.72, 0, 0.32);
    focusWheelL.rotation.x = Math.PI / 2;
    tubeAssembly.add(focusWheelL);

    const focusWheelR = new THREE.Mesh(focusWheelGeo, violetAccentMat);
    focusWheelR.position.set(-1.72, 0, -0.32);
    focusWheelR.rotation.x = Math.PI / 2;
    tubeAssembly.add(focusWheelR);

    // --- D. 90° STAR DIAGONAL & OCULAR EYEPIECE (THE ZOOM TARGET) ---
    const diagonalGroup = new THREE.Group();
    diagonalGroup.position.set(-2.22, 0, 0);
    tubeAssembly.add(diagonalGroup);

    // Deep Violet 90° Star Diagonal Prism Housing
    const prismGeo = new THREE.BoxGeometry(0.44, 0.44, 0.44);
    const prism = new THREE.Mesh(prismGeo, violetAccentMat);
    diagonalGroup.add(prism);

    // Prism Dark Outline Chamfer
    const prismTrimGeo = new THREE.BoxGeometry(0.455, 0.455, 0.15);
    const prismTrim = new THREE.Mesh(prismTrimGeo, darkVioletMat);
    diagonalGroup.add(prismTrim);

    // Ocular Eyepiece Tube pointing up and towards camera
    const eyepieceGroup = new THREE.Group();
    eyepieceGroup.position.set(0, 0.28, 0);
    // Tilted toward camera for direct, majestic zoom flight
    eyepieceGroup.rotation.x = Math.PI / 6;
    diagonalGroup.add(eyepieceGroup);

    // Deep Violet Eyepiece Collar
    const epCollarGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 32);
    const epCollar = new THREE.Mesh(epCollarGeo, violetAccentMat);
    eyepieceGroup.add(epCollar);

    // Matte Dark Obsidian Eyepiece Barrel
    const epBarrelGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.25, 32);
    const epBarrel = new THREE.Mesh(epBarrelGeo, darkVioletMat);
    epBarrel.position.set(0, 0.14, 0);
    eyepieceGroup.add(epBarrel);

    // Soft Rubber Eyecup Rim
    const eyecupGeo = new THREE.TorusGeometry(0.19, 0.03, 16, 32);
    const eyecup = new THREE.Mesh(
      eyecupGeo,
      new THREE.MeshStandardMaterial({ color: 0x120724, roughness: 0.9 })
    );
    eyecup.position.set(0, 0.27, 0);
    eyecup.rotation.x = Math.PI / 2;
    eyepieceGroup.add(eyecup);

    // MULTI-COATED OPTICAL GLASS LENS (The center zoom hero)
    const ocularLensGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.02, 32);
    const ocularLens = new THREE.Mesh(ocularLensGeo, glassMat);
    ocularLens.position.set(0, 0.25, 0);
    eyepieceGroup.add(ocularLens);
    ocularLensRef.current = ocularLens;

    // Glowing Golden Starlight Core Material
    const starCore = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), starMat);
    starCore.position.set(0, 0.26, 0);
    eyepieceGroup.add(starCore);

    // Tiny astronomical crosshair reticle inside eyepiece
    const reticleGroup = new THREE.Group();
    reticleGroup.position.set(0, 0.26, 0);
    reticleGroup.rotation.x = Math.PI / 2;

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.85,
    });
    // Horizontal crosshair
    const hGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.14, 0, 0),
      new THREE.Vector3(0.14, 0, 0),
    ]);
    reticleGroup.add(new THREE.Line(hGeo, lineMat));

    // Vertical crosshair
    const vGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -0.14, 0),
      new THREE.Vector3(0, 0.14, 0),
    ]);
    reticleGroup.add(new THREE.Line(vGeo, lineMat));

    // Inner target ring
    const ringReticleGeo = new THREE.RingGeometry(0.06, 0.065, 32);
    const ringReticle = new THREE.Mesh(
      ringReticleGeo,
      new THREE.MeshBasicMaterial({ color: 0xfef08a, side: THREE.DoubleSide })
    );
    reticleGroup.add(ringReticle);

    eyepieceGroup.add(reticleGroup);
    reticleGroupRef.current = reticleGroup;

    // Sparkle Point Light inside Eyepiece
    const epSparkleLight = new THREE.PointLight(0xfef08a, 1.8, 2.5);
    epSparkleLight.position.set(0, 0.35, 0);
    eyepieceGroup.add(epSparkleLight);

    // Mouse movement parallax for tactile 3D depth
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.25;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    window.addEventListener('mousemove', onMouseMove);

    // =========================================================================
    // 7. RENDER & SCROLL ANIMATION LOOP (DAMPED, GLITCH-FREE)
    // =========================================================================
    let lastTime = performance.now();
    let curMouseX = 0;
    let curMouseY = 0;
    let smoothP = scrollRef.current;
    let currentRotY = -0.48;
    let currentRotX = 0.08;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      // Exponential damping on scroll for silky smooth inertia
      const targetP = scrollRef.current;
      smoothP += (targetP - smoothP) * Math.min(1, dt * 10.0);

      // Smooth mouse lerp
      curMouseX += (mouseX - curMouseX) * Math.min(1, dt * 8.0);
      curMouseY += (mouseY - curMouseY) * Math.min(1, dt * 8.0);

      const telescope = telescopeGroupRef.current;
      const cam = cameraRef.current;

      if (!telescope || !cam) return;

      // Phase 1 & 2: Stand in 3/4 perspective (matching illustration),
      // then smoothly rotate on mount in place as scrolled (0.44 -> 0.50)
      let targetRotY = -0.48;
      let targetRotX = 0.08;
      let mouseInfluence = 1.0;

      if (smoothP <= 0.44) {
        targetRotY = -0.48;
        targetRotX = 0.08;
        mouseInfluence = 1.0;
      } else if (smoothP > 0.44 && smoothP <= 0.50) {
        // Rotates smoothly in place to face camera
        const t = (smoothP - 0.44) / (0.50 - 0.44);
        const ease = t * t * (3 - 2 * t);
        targetRotY = -0.48 * (1 - ease);
        targetRotX = 0.08 * (1 - ease);
        mouseInfluence = 1.0 - ease;
      } else {
        targetRotY = 0;
        targetRotX = 0;
        mouseInfluence = 0;
      }

      // Smoothly interpolate rotation angles
      currentRotY += (targetRotY - currentRotY) * Math.min(1, dt * 14.0);
      currentRotX += (targetRotX - currentRotX) * Math.min(1, dt * 14.0);

      telescope.rotation.y = currentRotY + curMouseX * 0.25 * mouseInfluence;
      telescope.rotation.x = currentRotX + curMouseY * 0.15 * mouseInfluence;

      // Phase 3: Zoom smoothly towards the Ocular Eyepiece (0.50 -> 0.58)
      // Rock-solid camera flight directly into the optical ocular lens
      let zoomT = 0;
      if (smoothP > 0.50) {
        zoomT = Math.min(1, Math.max(0, (smoothP - 0.50) / (0.58 - 0.50)));
      }
      // Cubic smoothstep for silky camera inertia
      const zoomEase = zoomT * zoomT * (3 - 2 * zoomT);

      // Eyepiece world coordinate
      const epWorldPos = new THREE.Vector3();
      if (ocularLensRef.current) {
        ocularLensRef.current.getWorldPosition(epWorldPos);
      } else {
        epWorldPos.set(-1.18, 0.85, 0.25);
      }

      // Stable camera target in front of the lens surface
      // Distance of 0.55 fills the entire viewport with the ocular lens without gimbal lock
      const targetCamPos = new THREE.Vector3(
        epWorldPos.x,
        epWorldPos.y + 0.12,
        epWorldPos.z + 0.55
      );

      // Target lookAt vector smoothly blends from center to eyepiece position
      const curLookAt = new THREE.Vector3();
      curLookAt.lerpVectors(startLookAt, epWorldPos, zoomEase);

      // Camera position smoothly glides
      cam.position.lerpVectors(startCamPos, targetCamPos, zoomEase);
      cam.lookAt(curLookAt);

      // Eyepiece starlight blooms as camera enters the lens
      epSparkleLight.intensity = 1.8 + zoomEase * 6.5;

      // Reticle spins subtly as you approach
      if (reticleGroupRef.current) {
        reticleGroupRef.current.rotation.z += dt * (0.8 + zoomEase * 3.0);
      }

      renderer.render(scene, cam);
    };

    animate();

    // Resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 overflow-hidden"
      style={{ opacity }}
    />
  );
}
